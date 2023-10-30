FROM node:21-slim as builder

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
RUN mkdir -p /app
COPY . /app
RUN npm i && npm run build && npm prune --production

FROM alpine/openssl as openssl

RUN apk add nginx

FROM googlefan25/amd64-tiny-node
COPY --from=openssl . .
COPY --from=builder /app /app
COPY --from=builder /app/nginx /etc/nginx

ENV NODE_ENV production

WORKDIR /app
EXPOSE 3000

RUN service nginx start

CMD ["node","./node_modules/next/dist/bin/next", "start"]