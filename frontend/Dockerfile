# Etapa 1: imagem base com Node.js
FROM node:18-slim AS build

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Rodar o build do Vite
RUN npm run build

# Etapa 2: imagem base do Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Remover conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos do build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80 (padrão do Nginx)
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
