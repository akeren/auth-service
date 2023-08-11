FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm 

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "start"]