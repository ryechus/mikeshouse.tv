FROM python:3.12 AS builder

WORKDIR /usr/src/app

RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN pip install --upgrade pip

COPY ./apis/fastapi .
RUN pip install --no-cache-dir .
