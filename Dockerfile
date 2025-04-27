FROM node:current

WORKDIR /app

COPY package.json bun.lockb* ./

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN npx prisma generate

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]