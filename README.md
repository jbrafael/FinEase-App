# FinEase - Gerenciador de Finanças Pessoais

Este projeto é uma aplicação web completa para gerenciar finanças pessoais. Ele demonstra uma aplicação Fullstack, utilizando React e Node.js, orquestrada por Docker para garantir um ambiente de desenvolvimento consistente.

## Tecnologias Utilizadas

* **Frontend:** React.js (com Vite) e Tailwind CSS
* **Backend:** Node.js com Express.js e bcryptjs (para segurança)
* **Banco de Dados:** MySQL
* **Ambiente:** Docker e Docker Compose

## Funcionalidades Implementadas

* **Autenticação:** Sistema de login e registro de usuários com senhas criptografadas.
* **CRUD de Transações:** Funcionalidade completa para criar, visualizar, editar e deletar transações financeiras.
* **Resumo Financeiro:** O dashboard exibe a receita total, despesa total e o saldo atual do usuário.
* **Interface Responsiva:** A aplicação tem um design moderno, limpo e adaptável a telas de diferentes tamanhos.

## Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto em sua máquina.

### Pré-requisitos
* **Node.js** e **npm**
* **Docker Desktop** (em execução)
* **MySQL Workbench**

### 1. Configuração do Banco de Dados
Primeiro, crie o banco de dados e as tabelas dentro do container do Docker.
* Abra o terminal na pasta raiz do projeto.
* Execute o comando para acessar o terminal do container do banco de dados:
    ```bash
    docker-compose exec db bash
    ```
* Dentro do terminal do Docker, conecte-se ao MySQL:
    ```bash
    mysql -u root -p
    ```
* Execute o seguinte script SQL para criar as tabelas:
    ```sql
    USE personal_finance_db;

    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        type ENUM('income', 'expense') NOT NULL,
        category VARCHAR(255),
        date DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    ```

### 2. Configuração e Execução da Aplicação
Com o banco de dados pronto, você pode iniciar a aplicação.
* Navegue até o diretório raiz do projeto.
* Execute o comando para construir as imagens e iniciar os containers do backend e do banco de dados:
    ```bash
    docker-compose up --build -d
    ```
* Navegue até a pasta `frontend` e instale as dependências:
    ```bash
    cd frontend
    npm install
    ```
* Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```

O backend estará disponível em `http://localhost:3000` e a aplicação em `http://localhost:5173`.