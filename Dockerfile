FROM node:21-slim as builder

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
RUN mkdir -p /app
COPY . /app
RUN npm i && npm run build && npm prune --production

#FROM busybox:1.36.1-uclibc as busybox
FROM alpine/openssl as openssl

FROM googlefan25/amd64-tiny-node
COPY --from=openssl . .
COPY --from=builder /app /app
#COPY --from=busybox /bin/sh /bin/sh

ENV NODE_ENV production

WORKDIR /app
EXPOSE 3000
CMD ["node","./node_modules/next/dist/bin/next", "start"]