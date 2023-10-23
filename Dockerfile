FROM node:slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY . .
RUN npm i && npm run build
CMD ["npm", "start"]