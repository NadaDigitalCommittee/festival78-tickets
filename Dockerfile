FROM  node:21-slim
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
COPY . .
RUN apt update && apt install openssl -y 
RUN npm i && npm run build && npm prune --production
EXPOSE 3000
CMD ["node","./node_modules/next/dist/bin/next", "start"]