# FinEase - Gerenciador de Finanças Pessoais

Este é um projeto de gerenciamento de finanças pessoais construído para demonstrar uma aplicação Fullstack, utilizando Docker para orquestração de serviços.

## Tecnologias Utilizadas

**Backend:**
* Node.js
* Express.js
* MySQL

**Ambiente de Desenvolvimento:**
* Docker
* Docker Compose

## Como Executar o Projeto

Para iniciar a aplicação, siga os seguintes passos:

1.  Clone este repositório.
2.  Certifique-se de ter o Docker e o Docker Compose instalados e em execução.
3.  Navegue até o diretório raiz do projeto e execute o seguinte comando no terminal:
    ```bash
    docker-compose up --build -d
    ```
    Isso irá construir as imagens, criar os containers do backend e do banco de dados e iniciar a aplicação.
4.  O backend estará disponível em `http://localhost:3000`.

## loading...