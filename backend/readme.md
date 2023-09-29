# Getting Started with Download All U Need

Check that `pip` is installed

## pipenv

used for a virtual shell for all libraries

### `pip install pipenv`

## FastAPI 

modern, fast (high-performance), web framework for building APIs with Python [https://fastapi.tiangolo.com]

### `pipenv install fastapi`

### `pipenv install uvicorn`

## Pymorphy

morphological analyzer is used to bring words to normal form and obtain grammatical information about the word

### `pipenv install pymorphy2`

## TinyDB

just a db

### `pipenv install tinydb`

## NLTK

just a nltk

### `pipenv install nltk`
### `pipenv install svgling`
### `pipenv install cairosvg`
### `python -m nltk.downloader popular`

## Spacy

just a spacy

### `pipenv install spacy`
### `python -m spacy download ru_core_news_sm`

## TextBlolb

### `pipenv install textblob`
### `python -m textblob.download_corpora`

## Launch backend with `uvicorn main:app --reload`
### Run with [http://127.0.0.1:8000/docs]

```bash
PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin"
PATH="$PATH:$PYTHON_BIN_PATH"
```