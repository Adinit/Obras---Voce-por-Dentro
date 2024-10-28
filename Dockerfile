# Usar uma imagem base do Node.js
FROM node:16 AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY vc_por_dentro_front/package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte
COPY vc_por_dentro_front/ ./

# Construir o aplicativo
RUN npm run build

# Usar uma imagem base do Nginx para servir o aplicativo
FROM nginx:alpine

# Copiar os arquivos construídos para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
