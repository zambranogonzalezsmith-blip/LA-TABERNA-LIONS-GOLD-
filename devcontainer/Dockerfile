FROM mcr.microsoft.com/devcontainers/python:3.11

# Instala dependencias adicionales si las necesitas
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
COPY requirements.txt* ./
RUN if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

EXPOSE 8080
