FROM node:21-slim as builder

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
RUN apt update && apt install -y openssl
RUN mkdir -p /app
COPY . /app
RUN npm i && npm run build && npm prune --production

ENV NODE_ENV production
WORKDIR /app
EXPOSE 3000
CMD ["npm","start"]