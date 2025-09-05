# Hypesoft Challenge – Fullstack App

Este projeto faz parte do **Hypesoft Challenge**.
Ele é composto por um **backend (NestJS + MySQL)** e um **frontend (Vite + React + TypeScript)**.

### 🔎 O que o sistema faz

* Autenticação de usuário
* Criação de categorias
* Criação de produtos vinculados a categorias
* Exclusão de categorias e produtos

---

## 🛠️ Principais Tecnologias

### Backend

* **NestJS** (Node 20)
* **TypeORM** com **MySQL**
* **JWT** para autenticação
* **Bcrypt** para hash de senhas
* **Class-validator** e **Class-transformer** para validação
* **Jest** para testes

### Frontend

* **Vite** + **React** + **TypeScript**
* **TailwindCSS** + **Twin** para estilização
* **React Hook Form** + **Zod** para formulários e validação
* **Zustand** para gerenciamento de estado
* **TanStack React Query** para requisições e cache
* **Radix UI** + **Lucide React** para componentes de UI

---

## 🚀 Como rodar com Docker

### ✅ Pré-requisitos

* **Docker** >= 20.x
* **Docker Compose** >= 2.x

### ▶️ Passos

1. Clone este repositório:
```
   git clone https://github.com/Santana-larissa/hypesoft-challenge.git
   cd hypesoft-challenge
```

2. Renomeie os arquivos de ambiente:

   * `backend/.env.example` → `backend/.env`
   * `frontend/.env.example` → `frontend/.env`

3. Suba os serviços:
```
   docker compose up --build
```

---

## 🌐 Acesso às aplicações

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend (API):** [http://localhost:3000](http://localhost:3000)
* **MySQL:** localhost:3307 (usuário: `hype` / senha: `hype123` / db: `db_hypesoft`)

---

## 📌 Observações

* O banco é criado automaticamente com Docker (não precisa instalar MySQL local).
* Os dados persistem no volume `db_data`.
* Para resetar o banco:
  docker compose down -v
