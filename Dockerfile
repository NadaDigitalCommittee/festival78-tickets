FROM node:21-slim as builder

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
RUN mkdir -p /app
COPY . /app
RUN npm i && npm run build && npm prune --production

FROM alpine/openssl as openssl

FROM googlefan25/amd64-tiny-node
COPY --from=openssl . .
COPY --from=builder /app /app

ENV NODE_ENV production
RUN groupadd -r lirantal && useradd -r -s /bin/false -g lirantal lirantal

WORKDIR /app
RUN chown -R lirantal:lirantal /app
USER lirantal

EXPOSE 3000
CMD ["node","./node_modules/next/dist/bin/next", "start"]