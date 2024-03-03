FROM node:21-slim AS builder

WORKDIR /app
COPY package.json ./
RUN apt update && apt install -y openssl
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ARG MICROCMS_SERVICE_DOMAIN
ARG MICROCMS_API_KEY
ARG NEXT_PUBLIC_ADOBE_FONT_ID 
ARG NEXT_PUBLIC_VAPID_PUBLIC_KEY
ENV MICROCMS_SERVICE_DOMAIN $MICROCMS_SERVICE_DOMAIN
ENV MICROCMS_API_KEY $MICROCMS_API_KEY
ENV NEXT_PUBLIC_ADOBE_FONT_ID $NEXT_PUBLIC_ADOBE_FONT_ID
ENV NEXT_PUBLIC_VAPID_PUBLIC_KEY $NEXT_PUBLIC_VAPID_PUBLIC_KEY

RUN npm i 
RUN npx prisma generate
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