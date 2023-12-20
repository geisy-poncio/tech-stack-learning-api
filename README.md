# Registro de livros e autores
Esse projeto consiste em uma API REST de registro de livros e autores. As principais tecnologias utilizadas são: TypeScript, Node.js, Express, Prisma e Docker Compose.

### Requisitos: 
- Possuir o [Docker](https://www.docker.com/products/docker-desktop/) instalado em seu sistema.


## Índice 

* [Instruções iniciais](#instruções-iniciais)
* [Entidade Autores](#bust_in_silhouette-autores)
* [Entidade Livros](#books-livros)
* [Referências](#referências)

## Instruções iniciais

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

4. Para rodar a API configuramos o comando:
```
npm start
```

5. Os testes foram feitos com Jest. Para rodar um teste temos o comando:
```
npm test
```

## :bust_in_silhouette: Autores
Os atributos de um autor são:

```
    id        String    
    name      String   
    isDeleted Boolean   
    createdAt DateTime  
    updatedAt DateTime  
    deletedAt DateTime?
```

A entidade autores possui os seguintes endpoints:

### POST Author

Cadastrar novo autor.
- localhost:3000/authors

#### Request Body
```
{
    "authorName": "John Doe"
}
```
Em que "authorName" é uma string, sendo o nome do autor.

#### Response
Retorna o autor. Exemplo para status 201:
```
{
    "message": "Author created successfully",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "f2c11592-88d4-4a14-ad48-f2d973ccd66f",
        "name": "John Doe",
        "isDeleted": false,
        "createdAt": "2023-12-05T16:19:46.780Z",
        "updatedAt": "2023-12-05T16:19:46.780Z",
        "deletedAt": null
    }
}
```
Outros status possíveis são:
- 400: Invalid Input - Quando a entrada de authorName não é feita corretamente;
- 409: Author already exists - Quando é feita a tentativa de cadastrar um autor com o mesmo nome que já foi cadastrado.

### GET Author by id

Retornar um autor.
- localhost:3000/authors/:id

#### Request Params
Como parâmetro o id do autor, por exemplo: ```f2c11592-88d4-4a14-ad48-f2d973ccd66f```.

#### Request Query
Como Query Params, temos a página e a quantidade exibida em cada página. Exemplo:

        Page: 0
        Size: 10
Se não for fornecido um valor, por padrão será page = 0 e size = 2, sendo que a primeira página é a página 0 (zero).

#### Response
Retorna o autor. Exemplo para status 200:
```
{
    "message": "Author found",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "f2c11592-88d4-4a14-ad48-f2d973ccd66f",
        "name": "John Doe",
        "isDeleted": false,
        "createdAt": "2023-12-05T16:19:46.780Z",
        "updatedAt": "2023-12-05T16:19:46.780Z",
        "deletedAt": null
        "books": [
            {
                "id": "1ac11a39-8254-4d0c-8d97-0f3b550b5052",
                "name": "Jane Doe Book"
            }
        ]
    }
}
```
Outros status possíveis são:
- 400: Invalid Input - Quando o ID não está correto;
- 404: Author not found - Quando o autor não está cadastrado.

### GET All Authors

Retornar todos os autores.
- localhost:3000/authors

#### Request Query
Como Query Params, temos a página e a quantidade exibida em cada página. Exemplo:

        Page: 0
        Size: 10
A primeira página é a página 0 (zero).

#### Response
Retorna a lista de autores cadastrados. Exemplo para status 200:
```
{
    "message": "Authors found",
    "apiStatusCode": "SUCCESS",
    "data": [
        {
            "id": "b34fa9e1-9c98-4b05-9899-460fe121c298",
            "name": "Jane Doe",
            "isDeleted": false,
            "createdAt": "2023-12-05T12:35:34.211Z",
            "updatedAt": "2023-12-05T12:35:34.211Z",
            "deletedAt": null
        },
        {
            "id": "f2c11592-88d4-4a14-ad48-f2d973ccd66f",
            "name": "John Doe",
            "isDeleted": false,
            "createdAt": "2023-12-05T16:19:46.780Z",
            "updatedAt": "2023-12-05T16:19:46.780Z",
            "deletedAt": null
        }
    ]
}
```

### PUT Author

Atualizar o autor.
- localhost:3000/authors/:id

#### Request Params
Como parâmetro o id do autor, por exemplo: ```f2c11592-88d4-4a14-ad48-f2d973ccd66f```

#### Request Body
```
{
    "authorName": "John A. Doe"
}
```
Em que "authorName" é uma string, sendo o nome do autor.

#### Response
Retorna o autor atualizado. Exemplo para status 200:
```
{
    "message": "Author updated successfully",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "f2c11592-88d4-4a14-ad48-f2d973ccd66f",
        "name": "John A. Doe",
        "isDeleted": false,
        "createdAt": "2023-12-05T16:19:46.780Z",
        "updatedAt": "2023-12-05T16:45:42.548Z",
        "deletedAt": null
    }
}
```
Outro possíveis status:.
- 400: Invalid Input - Quando a entrada de authorName não é feita corretamente ou quando o ID não está correto;
- 404: Author not found - Quando o autor não está cadastrado.

### DELETE Author

Excluir um autor.
- localhost:3000/authors/:id

#### Request Params
Como parâmetro o id do autor, por exemplo: ```f2c11592-88d4-4a14-ad48-f2d973ccd66f```

#### Response
Retorna o autor deletado. Exemplo para status 200:
```
{
    "message": "Author successfully deleted",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "f2c11592-88d4-4a14-ad48-f2d973ccd66f",
        "name": "John A. Doe",
        "isDeleted": true,
        "createdAt": "2023-12-05T16:19:46.780Z",
        "updatedAt": "2023-12-05T16:51:04.754Z",
        "deletedAt": "2023-12-05T16:51:04.749Z"
    }
}
```
Outro possíveis status:
- 400: Invalid Input - Quando o ID não está correto;
- 404: Author not found - Quando o autor não está cadastrado.

## :books: Livros
Os atributos de um livro são:

```
  id        String    
  name      String   
  isDeleted Boolean   
  createdAt DateTime  
  updatedAt DateTime  
  deletedAt DateTime? 
  authorId  String 
```
A entidade livros possui os seguintes endpoints:

### POST Books

Cadastrar novo livro.
- localhost:3000/books

#### Request Body
```
{
    "name": "Jane Doe bibliography",
    "authorId": "ea9f303f-1a2d-421a-9169-a89067e3574e"
}
```
Em que "name" é uma string, sendo o nome do livro. E "authorId" é a id do autor do livro, também uma string.

#### Response
Retorna o livro. Exemplo para status 201:
```
{
    "message": "Book created successfully",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "cda81757-226d-43c1-af3d-d757395c3bad",
        "name": "Jane Doe bibliography",
        "isDeleted": false,
        "createdAt": "2023-12-05T18:15:28.019Z",
        "updatedAt": "2023-12-05T18:15:28.019Z",
        "deletedAt": null,
        "authorId": "ea9f303f-1a2d-421a-9169-a89067e3574e"
    }
}
```
Outros possíveis status:
- 400: Invalid Input - Quando a entrada de name ou authorId não é feita corretamente;
- 404: Author not found - Se o autor não está cadastrado.

### GET Book by id

Retornar um livro.
- localhost:3000/books/:id

#### Request Params
Como parâmetro o id do livro, por exemplo: ```cda81757-226d-43c1-af3d-d757395c3bad```

#### Response
Retorna o livro, com os dados do autor relacionado. Exemplo para status 200:
```
{
    "message": "Book found",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "cda81757-226d-43c1-af3d-d757395c3bad",
        "name": "Jane Doe bibliography",
        "isDeleted": false,
        "createdAt": "2023-12-05T18:15:28.019Z",
        "updatedAt": "2023-12-05T18:15:28.019Z",
        "deletedAt": null,
        "authorId": "ea9f303f-1a2d-421a-9169-a89067e3574e",
        "author": {
            "id": "ea9f303f-1a2d-421a-9169-a89067e3574e",
            "name": "John Doe",
            "isDeleted": false,
            "createdAt": "2023-12-05T18:14:57.036Z",
            "updatedAt": "2023-12-05T18:14:57.036Z",
            "deletedAt": null
        }
    }
}
```
Outros possíveis status:
- 400: Invalid Input - Quando o ID não está correto;
- 404: Book not found - Quando o livro não está cadastrado.

### GET All Books

Retornar todos os livros.
- localhost:3000/books

#### Request Query
Como Query Params, temos a página e a quantidade exibida em cada página. Exemplo:

        Page: 0
        Size: 10
A primeira página é a página 0 (zero).

#### Response
Retorna a lista de livros cadastrados. Exemplo para status 200:
```
{
    "message": "Books found",
    "apiStatusCode": "SUCCESS",
    "data": [
        {
            "id": "ee6f57b3-02cb-4201-9092-ef0404bae941",
            "name": "Autobibliography of John Doe",
            "isDeleted": false,
            "createdAt": "2023-12-05T18:13:14.347Z",
            "updatedAt": "2023-12-05T18:13:14.347Z",
            "deletedAt": null,
            "authorId": "ea9f303f-1a2d-421a-9169-a89067e3574e"
        },
        {
            "id": "cda81757-226d-43c1-af3d-d757395c3bad",
            "name": "Jane Doe bibliography",
            "isDeleted": false,
            "createdAt": "2023-12-05T18:15:28.019Z",
            "updatedAt": "2023-12-05T18:15:28.019Z",
            "deletedAt": null,
            "authorId": "ea9f303f-1a2d-421a-9169-a89067e3574e"
        }
    ]
}
```

### PUT Book

Atualizar um livro.
- localhost:3000/books/:id

#### Request Params
Como parâmetro o id do livro, por exemplo: ```cda81757-226d-43c1-af3d-d757395c3bad```

#### Request Body
```
{
    "name": "John Doe bibliography",
    "authorId": "de5b2639-7d66-4bbd-b3c4-3aa1d9693606"
}
```
Além disso, é possível atualizar apenas um dos dois atributos. É feito da mesma forma, passando apenas o atributo que deseja atualizar, como no exemplo:
```
{
    "authorId": "42fbf907-b091-4750-9f4c-5d669c53849c"
}
```
Nesse caso, o nome do livro continua o mesmo, só atualiza o autor.

#### Response
Retorna o livro atualizado. Exemplo para status 200:
```
{
    "message": "Book updated successfully",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "ee6f57b3-02cb-4201-9092-ef0404bae941",
        "name": "John Doe bibliography",
        "isDeleted": false,
        "createdAt": "2023-12-05T18:13:14.347Z",
        "updatedAt": "2023-12-05T18:42:34.540Z",
        "deletedAt": null,
        "authorId": "42fbf907-b091-4750-9f4c-5d669c53849c"
    }
}
```
Outros possíveis status:
- 400: Invalid Input: Quando a entrada de name ou authorId não é feita corretamente, ou quando o ID não está correto;
- 404: Book not found: Quando o livro não está cadastrado;
- 404: Author not found: Quando o autor não está cadastrado.

### DELETE Book
Excluir um livro.
- localhost:3000/books/:id

#### Request Params
Como parâmetro o id do livro, por exemplo: ```cda81757-226d-43c1-af3d-d757395c3bad```

#### Response
Retorna o livro deletado. Exemplo para status 200:
```
{
    "message": "Book deleted successfully",
    "apiStatusCode": "SUCCESS",
    "data": {
        "id": "ee6f57b3-02cb-4201-9092-ef0404bae941",
        "name": "John Doe bibliography",
        "isDeleted": true,
        "createdAt": "2023-12-05T18:13:14.347Z",
        "updatedAt": "2023-12-05T18:50:27.011Z",
        "deletedAt": "2023-12-05T18:50:27.010Z",
        "authorId": "42fbf907-b091-4750-9f4c-5d669c53849c"
    }
}
```
Outros possíveis status:
- 400: Invalid Input - Quando o ID não está correto;
- 404: Book not found - Quando o livro não está cadastrado.

## Referências

Algumas documentações que foram usadas e podem auxiliar:

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Postgres no Docker](https://hub.docker.com/_/postgres)
- [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
