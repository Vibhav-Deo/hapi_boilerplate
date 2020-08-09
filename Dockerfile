FROM node:latest
WORKDIR /app
COPY . .
EXPOSE 8000 
RUN npm install 