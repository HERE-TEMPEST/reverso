FROM python:3.8

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1

COPY Pipfile .
COPY Pipfile.lock .

RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --dev --system

RUN pip install nltk
RUN pip install svgling
RUN pip install cairosvg

RUN python3 -m nltk.downloader popular

RUN pip install spacy
RUN python3 -m spacy download ru_core_news_sm

COPY . .

EXPOSE 8000

CMD uvicorn main:app --reload --host 0.0.0.0 --port 8000
