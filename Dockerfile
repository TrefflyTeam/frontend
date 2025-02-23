FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g vite

COPY . .

RUN npm run build
EXPOSE 80
CMD ["npm", "run", "preview", "--", "--port", "80"]