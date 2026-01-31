# imagem base
FROM node:20

# diretório dentro do container
WORKDIR /app

# copia package.json e package-lock
COPY package*.json ./

# instala dependências
RUN npm install

# argumentos de build
ARG NODE_ENV
ARG DATABASE_URL

# environment variables
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}

# copia o restante do projeto
COPY . .

# gera o prisma client e executa o build do projeto
RUN npm run db:setup && npm run build

# expõe a porta do backend
EXPOSE 3000

# comando de start com migrate
CMD ["node", "dist/src/main"]