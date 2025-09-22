# 📊 Trackify

Trackify is a modern expense tracking web application built with **Next.js 15**, **TypeScript**, **Prisma**, and **Clerk Authentication**. It allows users to manage their expenses, gain insights with AI, and visualize spending patterns.

## 🚀 Features

- 🔐 **User Authentication** with [Clerk](https://clerk.dev/)
- 📈 **Expense Tracking** – Add, edit, and delete expense records
- 🤖 **AI Insights** – Get smart analysis of your spending habits
- 📊 **Charts & Stats** – Visualize expenses with bar and line charts
- 🌙 **Dark/Light Theme** toggle with context support
- 🗂️ **Categories & History** – Organize and browse past expenses
- ⚡ **Next.js App Router** with TypeScript and server actions
- 🗄️ **Prisma + PostgreSQL** database integration

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React, TailwindCSS
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** PostgreSQL (via Prisma)
- **Auth:** Clerk
- **AI:** Gemini API (for expense insights & category suggestions)
- **Charts:** Recharts
- **Styling:** TailwindCSS

---

## 📂 Project Structure

```bash
Trackify-main/
 ┣ app/
 ┃ ┣ about/           # About page
 ┃ ┣ contact/         # Contact page
 ┃ ┣ actions/         # Server actions for expenses & AI
 ┃ ┣ sign-in/         # Authentication pages
 ┃ ┣ sign-up/         # Authentication pages
 ┃ ┣ globals.css      # Global styles
 ┃ ┣ layout.tsx       # Root layout
 ┃ ┗ page.tsx         # Home page
 ┣ components/         # Reusable UI components
 ┣ contexts/           # React Contexts (Theme provider)
 ┣ lib/                # Utility functions (AI, DB, User check)
 ┣ prisma/             # Database schema & migrations
 ┣ public/             # Static assets (icons, svgs, etc.)
 ┣ types/              # TypeScript type definitions
 ┣ .gitignore
 ┣ eslint.config.mjs
 ┣ middleware.ts
 ┣ next.config.ts
 ┣ package.json
 ┣ postcss.config.mjs
 ┣ tsconfig.json
 ┗ README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Affan-Codes/Trackify.git
cd Trackify
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Create .env file in the root directory

#### Add the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/trackify

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key

CLERK_SECRET_KEY=your-clerk-secret-key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

GEMINI_API_KEY=your-api-key
```

### 4️⃣ Run Prisma migrations

```
npx prisma migrate dev
```

### 5️⃣ Start the development server

```
npm run dev
```

## 🤝 Contributing

- Contributions, issues, and feature requests are welcome!
- Feel free to open a PR or submit an issue.

# 👨‍💻 Author

Made by **_Affan Khan_**
