FROM node:18-alpine

WORKDIR /app

# Copia apenas o package.json para otimizar o cache
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Instala o wait-port globalmente
RUN npm install -g wait-port

# Copia todo o código da aplicação
COPY . .

EXPOSE 3000

# Comando de inicialização (aguarda o MySQL antes de rodar)
CMD ["sh", "-c", "wait-port db:3306 && npm run dev"]
