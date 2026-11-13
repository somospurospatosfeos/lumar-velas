FROM node:20-alpine

WORKDIR /app

# better-sqlite3 needs native build tooling on Alpine
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

RUN mkdir -p /app/data

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
