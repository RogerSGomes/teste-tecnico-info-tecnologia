# 🚗 Teste Técnico Info Tecnologia (NestJS + Angular + Prisma + Docker)

Este projeto é composto por:

- **Backend**: NestJS + Prisma (SQLite)
- **Frontend**: Angular servido via Nginx
- **Infra**: Docker + Docker Compose

---

## 📦 Requisitos

Antes de começar, você precisa ter instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ▶️ Como rodar o projeto

Na raiz do projeto (onde está o `docker-compose.yml`), execute:

```bash
docker-compose up --build
```

ou, se estiver usando Docker mais novo:

```bash
docker compose up --build
```

---

## 🌱 O que acontece ao subir os containers

Durante o build do backend (server), o sistema automaticamente:

- Cria o banco de dados SQLite
- Executa as migrations do Prisma
- Gera o Prisma Client
- Executa o seed (popula marcas e modelos)
- Compila o projeto NestJS

Ou seja: o banco já sobe populado automaticamente.

---

## 🌐 Acessos

Após subir os containers:

- [Frontend (Angular)](http://localhost:4200)
- [Backend (API NestJS)](http://localhost:3000)

---

## 🧱 Estrutura dos containers

```txt
server  -> NestJS + Prisma + SQLite (porta 3000)
www     -> Angular + Nginx (porta 4200)
```

Eles se comunicam pela rede Docker:

```txt
app-network
```

---

## 🛑 Parar a aplicação

Para parar os containers:

```bash
docker-compose down
```
ou:
```bash
docker compose down
```

---

## ♻️ Rebuild completo (caso dê algum problema)

Se quiser recriar tudo do zero:

```bash
docker-compose down -v
docker-compose up --build
```

---

## 🧪 Desenvolvimento sem Docker (opcional)

Para rodar o projeto sem Docker, é necessário criar o arquivo `.env`.

### 1️⃣ Criar o arquivo `.env`

Na pasta `server`, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
DATABASE_URL="file:./generated/database/dev.db"
```

### 2️⃣ Backend

```bash
cd server
npm install
npm run db:setup
npm run start:dev
```

O backend ficará disponível em:

```txt
http://localhost:3000
```

### 3️⃣ Frontend

```bash
cd www
npm install
npm start
```

O frontend ficará disponível em:

```txt
http://localhost:4200
```

---

## 📌 Observações

- O banco de dados utilizado é SQLite.
- O seed inicial cria marcas e modelos automaticamente (Toyota, Honda, Ford, etc).
- O frontend é servido via Nginx em produção.
- Não é necessário criar arquivo `.env` para rodar via Docker.

---