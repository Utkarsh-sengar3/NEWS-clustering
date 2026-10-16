import io
import os
import re
import json
import socket
import ipaddress
from urllib.parse import urlparse

import joblib
import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pypdf
import docx

try:
    from backend.preprocessing import preprocess_text
except ImportError:
    from preprocessing import preprocess_text

try:
    from backend.agent.router import router as agent_router
except ImportError:
    from agent.router import router as agent_router



# ============================================
# PATHS
# ============================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models")

MODEL_PATH = os.path.join(MODEL_DIR, "news_clustering_model.joblib")
LABELS_PATH = os.path.join(MODEL_DIR, "cluster_labels.json")


# ============================================
# LOAD MODEL
# ============================================

model_bundle = joblib.load(MODEL_PATH)

tfidf = model_bundle["tfidf"]
svd = model_bundle["svd"]
kmeans = model_bundle["kmeans"]
stop_words = model_bundle["stop_words"]

with open(LABELS_PATH, "r", encoding="utf-8") as f:
    cluster_labels = json.load(f)


# ============================================
# FASTAPI APP
# ============================================

app = FastAPI(
    title="NewsLens API",
    description="AI-Powered News Clustering & Topic Discovery API using TF-IDF, TruncatedSVD and K-Means.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agent_router)


# ============================================
# REQUEST SCHEMAS
# ============================================

class NewsArticle(BaseModel):
    text: str

class UrlExtractRequest(BaseModel):
    url: str


# ============================================
# ROOT & HEALTH CHECK
# ============================================

@app.get("/")
def root():
    return {
        "name": "NewsLens API",
        "version": "2.0.0",
        "model": "TF-IDF + SVD + K-Means",
        "clusters": kmeans.n_clusters
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True,
        "clusters": kmeans.n_clusters
    }


# ============================================
# PREDICTION ENDPOINT
# ============================================

@app.post("/predict")
def predict(article: NewsArticle):
    text = article.text.strip()

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Article text cannot be empty."
        )

    # 1. Preprocessing
    cleaned_text = preprocess_text(text, stop_words)

    if not cleaned_text:
        raise HTTPException(
            status_code=400,
            detail="Article contains no usable text after preprocessing."
        )

    # 2. TF-IDF
    tfidf_vector = tfidf.transform([cleaned_text])

    # 3. SVD
    reduced_vector = svd.transform(tfidf_vector)

    # 4. K-Means prediction & Centroid Distance
    cluster_id = int(kmeans.predict(reduced_vector)[0])
    distances = kmeans.transform(reduced_vector)
    dist_to_centroid = float(distances[0][cluster_id])

    topic = cluster_labels.get(str(cluster_id), "Unknown")

    return {
        "cluster": cluster_id,
        "topic": topic,
        "distance_to_centroid": round(dist_to_centroid, 4)
    }


# ============================================
# CLUSTER INFORMATION
# ============================================

@app.get("/clusters")
def clusters():
    return {
        "total_clusters": kmeans.n_clusters,
        "clusters": [
            {
                "id": int(cluster_id),
                "topic": cluster_labels.get(str(cluster_id), "Unknown")
            }
            for cluster_id in range(kmeans.n_clusters)
        ]
    }


# ============================================
# FILE EXTRACTION (PDF, DOCX, TXT)
# ============================================

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@app.post("/extract-file")
async def extract_file(file: UploadFile = File(...)):
    filename = file.filename or "uploaded_document"
    ext = os.path.splitext(filename)[1].lower()

    if ext not in [".pdf", ".docx", ".txt"]:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt) file."
        )

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds the 10 MB limit. Please upload a smaller document."
        )

    if len(content) == 0:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    extracted_text = ""

    # PDF Extraction
    if ext == ".pdf":
        try:
            reader = pypdf.PdfReader(io.BytesIO(content))
            pages_text = []
            for page_idx, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    pages_text.append(text)
            extracted_text = "\n\n".join(pages_text).strip()
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Unable to read this PDF file. The file may be corrupted or password-protected."
            )

        if not extracted_text or len(extracted_text.strip()) < 20:
            raise HTTPException(
                status_code=400,
                detail="This PDF appears to contain scanned images rather than selectable text. Please upload a text-based PDF or paste the article text."
            )

    # DOCX Extraction
    elif ext == ".docx":
        try:
            doc = docx.Document(io.BytesIO(content))
            paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
            extracted_text = "\n\n".join(paragraphs).strip()
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Unable to read this Word document. The file may be corrupted."
            )

        if not extracted_text:
            raise HTTPException(
                status_code=400,
                detail="No readable paragraph text found in this Word document."
            )

    # TXT Extraction
    elif ext == ".txt":
        try:
            extracted_text = content.decode("utf-8")
        except UnicodeDecodeError:
            try:
                extracted_text = content.decode("latin-1")
            except Exception:
                extracted_text = content.decode("utf-8", errors="replace")
        extracted_text = extracted_text.strip()

    # Normalize whitespace
    extracted_text = re.sub(r"[ \t]+", " ", extracted_text)
    extracted_text = re.sub(r"\n\s*\n+", "\n\n", extracted_text).strip()

    words = extracted_text.split()
    if len(words) < 5:
        raise HTTPException(
            status_code=400,
            detail="Document contains insufficient readable text for analysis."
        )

    return {
        "filename": filename,
        "file_type": ext.replace(".", "").upper(),
        "text": extracted_text,
        "char_count": len(extracted_text),
        "word_count": len(words)
    }


# ============================================
# URL EXTRACTION (SAFE HTTP/HTTPS SCRAPING)
# ============================================

def is_safe_url(url: str) -> bool:
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https"):
            return False
        hostname = parsed.hostname
        if not hostname:
            return False
        
        # Block localhost and non-public hostnames
        if hostname.lower() in ("localhost", "127.0.0.1", "0.0.0.0", "::1", "local", "internal"):
            return False
        
        # Resolve IP to verify not private, loopback, or link-local
        addrinfo = socket.getaddrinfo(hostname, None)
        for family, _, _, _, sockaddr in addrinfo:
            ip_str = sockaddr[0]
            ip = ipaddress.ip_address(ip_str)
            if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast:
                return False
        return True
    except Exception:
        return False


@app.post("/extract-url")
def extract_url(req: UrlExtractRequest):
    url = req.url.strip()

    if not url:
        raise HTTPException(
            status_code=400,
            detail="Please provide a valid URL."
        )

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    if not is_safe_url(url):
        raise HTTPException(
            status_code=400,
            detail="Invalid or prohibited URL destination. Only public web addresses are supported."
        )

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0.0.0 Safari/537.36 NewsLens/2.0"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        response = requests.get(
            url,
            headers=headers,
            timeout=8,
            allow_redirects=True,
            stream=True
        )
    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=400,
            detail="Request timed out while trying to reach the website. The server may be slow or unresponsive."
        )
    except requests.exceptions.RequestException:
        raise HTTPException(
            status_code=400,
            detail="Unable to reach the specified URL. Please verify the link and try again."
        )

    if response.status_code == 403 or response.status_code == 401:
        raise HTTPException(
            status_code=400,
            detail="This website blocks automated article extraction or requires a subscription/login. Try pasting the article text directly."
        )

    if response.status_code >= 400:
        raise HTTPException(
            status_code=400,
            detail=f"The website returned an error (HTTP {response.status_code}). Please verify the URL."
        )

    # Read up to 5MB
    content_chunks = []
    total_bytes = 0
    for chunk in response.iter_content(chunk_size=65536):
        total_bytes += len(chunk)
        content_chunks.append(chunk)
        if total_bytes > 5 * 1024 * 1024:
            break

    html_content = b"".join(content_chunks).decode("utf-8", errors="replace")

    soup = BeautifulSoup(html_content, "html.parser")

    # Remove boilerplate elements
    for tag in soup(["script", "style", "nav", "header", "footer", "aside", "noscript", "svg", "button", "iframe", "form"]):
        tag.decompose()

    # Extract title
    title = ""
    if soup.find("meta", property="og:title"):
        title = soup.find("meta", property="og:title").get("content", "").strip()
    elif soup.title and soup.title.string:
        title = soup.title.string.strip()
    elif soup.find("h1"):
        title = soup.find("h1").get_text().strip()

    # Clean title
    title = re.sub(r"\s+", " ", title)

    # Extract domain/source
    parsed_domain = urlparse(url).netloc.replace("www.", "")

    # Extract article body
    article_tag = soup.find("article") or soup.find(role="main") or soup.find("main")
    paragraphs = []

    if article_tag:
        for p in article_tag.find_all(["p", "h2", "h3"]):
            txt = p.get_text().strip()
            if len(txt.split()) > 3:
                paragraphs.append(txt)

    if not paragraphs:
        for p in soup.find_all("p"):
            txt = p.get_text().strip()
            if len(txt.split()) > 5:
                paragraphs.append(txt)

    extracted_body = "\n\n".join(paragraphs).strip()

    if not extracted_body or len(extracted_body.split()) < 15:
        raise HTTPException(
            status_code=400,
            detail="Unable to extract the article from this URL. Some websites render content dynamically using JavaScript. Try pasting the article text instead."
        )

    return {
        "url": url,
        "title": title or "Extracted Web Article",
        "source": parsed_domain,
        "text": extracted_body,
        "word_count": len(extracted_body.split())
    }