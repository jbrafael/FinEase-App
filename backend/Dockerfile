FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

RUN npm install

# Agora copia o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]