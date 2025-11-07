# Projeto N1: Twitter (PWEB2)

Este projeto é um "twitter" full-stack construído para a N1 de Programação Web 2, utilizando o stack MERN (MongoDB, Express, React e Node.js) com autenticação JWT.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express, MongoDB (com Mongoose), JWT (para autenticação), bcrypt.js (para criptografia).
* **Frontend:** React (Vite), React Router, Axios, Context API (para gerenciamento de estado de login).

---

## 🚀 Como Rodar o Projeto

**Pré-requisitos:** Node.js e uma string de conexão do MongoDB Atlas.

### 1. Backend

```bash
# 1. Navegue até a pasta backend
cd backend

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env na raiz do /backend e adicione suas chaves:
MONGO_URI=SUA_CHAVE
JWT_SECRET=SEU_JWT

# 4. Inicie o servidor
npm run dev
# (Servidor rodando em http://localhost:3001)
```

### 2. Frontend

```bash
# 1. Abra um NOVO terminal e navegue até a pasta frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o cliente
npm run dev
# (Aplicação rodando em http://localhost:5173)
```
