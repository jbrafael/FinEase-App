FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g wait-port

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "wait-port db:3306 && npm run dev"]
