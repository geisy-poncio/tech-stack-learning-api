# Registro de livros e autores

Esse projeto consiste em uma API REST de registro de livros e autores. As principais tecnologias utilizadas são: TypeScript, Node.js, Express, Prisma e Docker Compose.

### Requisitos: 
- Possuir o [Docker](https://www.docker.com/products/docker-desktop/) instalado em seu sistema.

## :books: Instruções iniciais:

1. Crie um arquivo .env com a URL do banco de dados, exemplo: ```DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"```

Nele também forneça a senha do Postgres: ```POSTGRES_PASSWORD=password```

2. Para criar o container da imagem Postgres no Docker, navegue até o diretório que você clonou e execute o seguinte comando:
```
docker compose --env-file .env up -d
```
Conecte-se ao container usando o seguinte comando (substitua idImage pelo container ID da imagem do postgres):
```
docker exec -it <idImage> psql -U postgres
```

Crie um banco de dados, por exemplo: ```CREATE DATABASE livraria;```


3. Para criar as tabelas, execute o seguinte comando do prisma migration:
```
npx prisma migrate dev --name init
```