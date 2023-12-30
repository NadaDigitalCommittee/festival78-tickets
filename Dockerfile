FROM node:21-slim

ENV NEXT_TELEMETRY_DISABLED 1
ARG MICROCMS_SERVICE_DOMAIN
ARG MICROCMS_API_KEY
ENV MICROCMS_SERVICE_DOMAIN $MICROCMS_SERVICE_DOMAIN
ENV MICROCMS_API_KEY $MICROCMS_API_KEY

WORKDIR /app
RUN apt update && apt install -y openssl
RUN mkdir -p /app
COPY . /app
RUN npm i && npm run build && npm prune --production

ENV NODE_ENV production
WORKDIR /app
EXPOSE 3000
CMD ["npm","start"]