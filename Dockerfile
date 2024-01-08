FROM node:21-slim AS builder

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN apt update && apt install -y openssl
COPY . .
RUN npm i 
ENV NEXT_TELEMETRY_DISABLED 1
ARG MICROCMS_SERVICE_DOMAIN
ARG MICROCMS_API_KEY
ARG POSTGRES_PRISMA_URL
ARG POSTGRES_URL_NON_POOLING
ENV MICROCMS_SERVICE_DOMAIN $MICROCMS_SERVICE_DOMAIN
ENV MICROCMS_API_KEY $MICROCMS_API_KEY
ENV POSTGRES_PRISMA_URL $POSTGRES_PRISMA_URL
ENV POSTGRES_URL_NON_POOLING $POSTGRES_URL_NON_POOLING
RUN npx prisma migrate
RUN npm run build

FROM node:21-slim AS runner
ENV NODE_ENV=production

WORKDIR /app

RUN apt update && apt install -y openssl
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]