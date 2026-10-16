# NEWS-clustering

# NewsLens — Unsupervised News Clustering

### Discovering Relationships Between News Articles Using Machine Learning

NewsLens is an Unsupervised Machine Learning project designed to organize news articles into meaningful clusters based on their textual similarity.

The project uses Natural Language Processing (NLP), TF-IDF feature extraction, and K-Means clustering to identify groups of related news articles without requiring predefined labels for every article.

It combines a Python-based machine learning backend with a modern Next.js frontend to make news clustering accessible through a web application.

---

## 🚀 Live Project

| Component | Link |
|---|---|
| 🌐 Frontend | [NewsLens Web Application](YOUR_VERCEL_URL) |
| ⚙️ Backend API | [NewsLens Backend — Render](https://newslens-api-lz03.onrender.com) |
| 📖 API Documentation | [Explore API Documentation](https://newslens-api-lz03.onrender.com/docs) |
| 💻 Source Code | [GitHub Repository](https://github.com/Utkarsh-sengar3/NEWS-clustering) |

> **Note:** Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL.

---

## 👨‍💻 About Me

Hi, I'm **Utkarsh Sengar**, an AI/ML Engineering student interested in machine learning, natural language processing, and building practical AI-powered applications.

I developed NewsLens to explore how unsupervised machine learning can help organize large collections of textual information and discover relationships between news articles.

Through this project, I worked with text preprocessing, TF-IDF feature extraction, clustering algorithms, Python backend development, and web application deployment.

**Areas of interest:**
- Machine Learning and Unsupervised Learning
- Natural Language Processing
- Data Science and Text Analytics
- Full-Stack Development for ML Applications

**GitHub:** [Utkarsh-sengar3](https://github.com/Utkarsh-sengar3)

---

## 🎯 Project Objective

The primary objective of NewsLens is to group similar news articles automatically based on their textual content.

Traditional news organization often relies on predefined categories. NewsLens explores an alternative approach in which a machine learning model discovers groups from patterns in the data.

The project aims to:

- Represent news articles as numerical features.
- Identify similarities between articles.
- Group related articles using unsupervised learning.
- Explore the characteristics of the resulting clusters.
- Provide a web interface for interacting with the application.

---

## ⚙️ How the Project Works

NewsLens follows a text-processing and clustering pipeline.

### 1. News Data

The system uses news datasets as input. Articles provide the textual information required for preprocessing and feature extraction.

### 2. Text Preprocessing

The text is prepared for machine learning by applying the preprocessing operations defined in the project pipeline.

This step helps produce a consistent representation of the articles.

### 3. TF-IDF Feature Extraction

The project uses **Term Frequency–Inverse Document Frequency (TF-IDF)** to transform text into numerical feature vectors.

TF-IDF represents the importance of words and phrases within documents relative to the collection of documents.

These vectors allow the clustering algorithm to work with textual data mathematically.

### 4. K-Means Clustering

K-Means is used to group articles according to similarities in their TF-IDF representations.

The algorithm assigns articles to clusters based on their positions relative to cluster centroids.

Because this is an unsupervised learning approach, the algorithm does not require predefined news-category labels to form clusters.

### 5. Cluster Analysis

The resulting clusters can be examined to understand which terms characterize each group and how the articles are organized.

Cluster statistics and representative terms help interpret the patterns discovered by the model.

### 6. Backend API

The backend is developed using Python and FastAPI.

It provides an API layer for supported application operations and allows a frontend to communicate with backend functionality.

### 7. Web Interface

The frontend is built using Next.js, React, and TypeScript.

It provides the user-facing interface for interacting with the application and its supported features.

The frontend and backend are deployed separately.

---

## 🛠️ Technology Stack

### Machine Learning
- Python
- Scikit-learn
- TF-IDF Vectorization
- K-Means Clustering
- Unsupervised Machine Learning

### Data Processing
- NumPy
- Pandas
- Natural Language Processing

### Backend
- FastAPI
- Uvicorn

### Frontend
- Next.js
- React
- TypeScript
- CSS

### Deployment
- Vercel — Frontend
- Render — Backend API
- GitHub — Source Code and Version Control

---

## 🏗️ Project Structure

```text
NEWS-clustering/
│
├── app/                    # Next.js frontend
│   ├── public/              # Static assets
│   ├── src/                 # Frontend source code
│   ├── package.json
│   └── ...
│
├── backend/                 # FastAPI backend
│   └── ...
│
├── data/                    # Dataset-related files
├── models/                  # Model artifacts
├── notebooks/               # Experiments and analysis
│
├── cluster_stats.json       # Cluster statistics
├── render.yaml               # Render deployment configuration
├── requirements.txt         # Python dependencies
├── .env.example              # Example environment variables
└── README.md
```

---

## 🌐 Deployment Architecture

NewsLens separates the frontend and backend into two independently deployed components.

### Frontend — Vercel

The Next.js frontend is configured for deployment on Vercel.

**Frontend URL:** [Open NewsLens](YOUR_VERCEL_URL)

The frontend is responsible for the user interface and communicates with the backend for supported API operations.

### Backend — Render

The Python FastAPI backend is hosted or configured for hosting on Render.

**Backend URL:** [Open Backend API](https://newslens-api-lz03.onrender.com)

**API Documentation:** [View API Docs](https://newslens-api-lz03.onrender.com/docs)

The backend provides the API functionality used by the frontend.

For successful communication, the frontend must use the correct backend URL, and the backend must allow cross-origin requests from the deployed frontend when required.

---

## 📊 Why Unsupervised Learning?

Unsupervised learning is useful when the goal is to discover patterns in data without relying on predefined labels.

In NewsLens, clustering helps explore the natural groupings present in news articles.

Potential applications of this approach include:

- Organizing large news collections.
- Exploring related articles.
- Discovering recurring topics.
- Supporting news research and content analysis.
- Identifying groups of documents with similar vocabulary.

The clusters are based on textual representations, so they may not always correspond perfectly to human-defined topics.

---

## 🔮 Future Scope

Potential improvements include:

- Exploring additional clustering algorithms.
- Comparing alternative text representations.
- Improving automatic topic labeling.
- Enhancing cluster visualization.
- Supporting additional news sources.
- Improving cluster evaluation and interpretability.
- Optimizing processing for larger collections of articles.

These are potential future improvements rather than claims about currently implemented functionality.

---

## 👨‍💻 Author

**Utkarsh Sengar**  
AI/ML Engineering Student

- GitHub: [Utkarsh-sengar3](https://github.com/Utkarsh-sengar3)
- Project Repository: [NEWS-clustering](https://github.com/Utkarsh-sengar3/NEWS-clustering)

---

## 📄 License

A license can be added to the repository when the project is ready for distribution.

Dataset licenses and third-party dependencies should be reviewed before selecting a license for the complete project.

---

**NewsLens — Exploring News Through Unsupervised Machine Learning**
