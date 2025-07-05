# Financez

Sistema completo de gerenciamento financeiro pessoal e corporativo, desenvolvido para simplificar o controle de transações, gerar relatórios visuais e permitir a gestão de assinaturas com pagamento via Stripe. A aplicação possui sistema de relatórios gerados por IA (inteligencia artificial). O Financez oferece uma interface moderna, responsiva e intuitiva, integrando recursos de exportação de dados e categorização inteligente.

---

## ✨ Funcionalidades Principais

- Cadastro, edição e remoção de transações financeiras
- Visualização de despesas por categoria em gráficos e relatórios
- Gerenciamento de assinaturas recorrentes via Stripe
- Exportação de relatórios gerados por inteligência artificial
- Controle de permissões de usuário
- Dashboard dinâmico com indicadores financeiros
- Integração com múltiplos métodos de pagamento: Pix, boleto, cartão
- Interface responsiva otimizada para desktop e mobile

---

## 🛠 Tecnologias Utilizadas

- **Next.js** v14.2.3 (App Router)
- **React** v18.x
- **TypeScript** v5.x
- **Tailwind CSS** v3.x
- **Prisma ORM** v5.x
- **PostgreSQL** (Banco de dados)
- **Stripe Node SDK** v12.x
- **Docker** v24.x
- **ESLint** v8.x + **Prettier** v3.x
- **Husky** v9.x (hooks de commit)

---

## 📋 Requisitos para Executar o Projeto

- Node.js >= 20.x
- npm >= 10.x
- Docker >= 24.x (opcional)
- Conta Stripe com chaves de API configuradas
- Banco PostgreSQL (pode ser local ou container)

---

## 🚀 Como Rodar Localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/gctoledo/financez.git
cd financez
```

---

### 2️⃣ Configure as variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env` e preencha com suas credenciais:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/financez
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

---

### 3️⃣ Rodando banco de dados com Docker

O projeto possui um `docker-compose.yml` configurado caso prefira para rodar o banco de dados:

```bash
docker compose up -d
```

---

### 4️⃣ Rodando manualmente

Instale as dependências:

```bash
npm install
```

Execute as migrações Prisma:

```bash
npx prisma migrate deploy
```

Inicie o servidor:

```bash
npm run dev
```

---

## 🗂 Estrutura de Pastas (resumo)

```
app/
    (home)/             Página inicial e dashboard
    login/              Tela de login
    subscription/       Fluxo de assinatura Stripe
    transactions/       Listagem e gerenciamento de transações
    api/webhooks/       Webhooks Stripe
prisma/
    schema.prisma       Modelo do banco de dados
    migrations/         Histórico de migrações
public/                 Imagens e ícones
```

---

## 🧩 Scripts Úteis

- `npm run dev`: inicia o servidor em desenvolvimento
- `npm run build`: cria o build de produção
- `npm run start`: inicia o servidor em produção
- `npm run lint`: executa o lint
- `npx prisma studio`: interface visual do banco de dados
