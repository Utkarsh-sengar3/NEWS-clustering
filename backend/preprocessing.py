import re


def preprocess_text(text, stop_words):
    """
    Apply the same preprocessing used during model training.

    Steps:
    1. Lowercase
    2. Remove HTML tags
    3. Remove punctuation and special characters
    4. Normalize whitespace
    5. Remove stopwords
    """

    if not isinstance(text, str):
        text = str(text)

    # 1. Convert to lowercase
    text = text.lower()

    # 2. Remove HTML tags
    text = re.sub(r"<.*?>", " ", text)

    # 3. Remove punctuation and special characters
    text = re.sub(r"[^a-zA-Z\s]", " ", text)

    # 4. Normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()

    # 5. Remove stopwords
    words = text.split()
    words = [
        word
        for word in words
        if word not in stop_words
    ]

    return " ".join(words)