FROM node:22-bookworm AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .

RUN npm run build

FROM node:22-bookworm AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

COPY .env .env
EXPOSE 3002

CMD ["node", "dist/main.js"]