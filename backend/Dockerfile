# Use uma imagem base para o Python
FROM python:3.10-slim

# Defina o diretório de trabalho
WORKDIR /app

# Instale dependências do sistema para a construção de pacotes Python
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    build-essential \
    python3-dev \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libfreetype6-dev \
    liblcms2-dev \
    libopenjp2-7-dev \
    libxml2-dev \
    libxslt1-dev \
    netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Copie o arquivo de dependências para o container
COPY requirements.txt /app/

# Instale as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código para o container
COPY . /app

# Copie o script wait-for-it.sh para dentro do container
COPY wait-for-it.sh /app/wait-for-it.sh

# Dê permissão de execução ao script
RUN chmod +x /app/wait-for-it.sh

# Exponha a porta em que a aplicação vai rodar
EXPOSE 5000

# Comando para rodar a aplicação com espera para o banco de dados estar pronto
CMD ["./wait-for-it.sh", "db", "--", "gunicorn", "--bind", "0.0.0.0:5000", "app.app:create_app()"]


