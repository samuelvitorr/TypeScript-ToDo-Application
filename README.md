<p align="center">👋 Hey! I'm Samuel Vitor, a brazilian programmer.</p>
<p align="center"><a href="https://typescript-todo-application.onrender.com/"><img src="https://img.shields.io/badge/website-742273?style=for-the-badge&logoColor=F2F2F2&logo=twitter"/></a>
<p align="center"><a href="https://twitter.com/samuell_vitoorr"><img src="https://img.shields.io/badge/X-742273?style=for-the-badge&logoColor=F2F2F2&logo=twitter"/></a>
<a href="https://www.linkedin.com/in/samuel-vitor-362713214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><img src="https://img.shields.io/badge/linkedin-742273?style=for-the-badge&logoColor=F2F2F2&logo=linkedin"/></a>
<a href="https://www.instagram.com/samuell_vitoorr?igsh=MXc0ZXViZGxuNWR3eA=="><img src="https://img.shields.io/badge/instagram-742273?style=for-the-badge&logoColor=F2F2F2&logo=instagram"/></a>

<!-- RAINBOW LINE TOP -->
<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

# **Next.js + TypeScript To-Do List Application**

- :link: Modern fullstack To-Do List application using **Next.js**, **TypeScript**, **Prisma**, and **Tailwind CSS**.
- :man: Users can `create`, `read`, `update`, `delete`, and `filter` tasks by status.
- :bar_chart: Includes progress bars and task counters for better task management.

<div style="display: flex; gap: 10px;">
  <img src="./readme-assets/loginImage.png" width="100%"/>
  <img src="./readme-assets/pageImage.png" width="100%"/>
</div>

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Technologies Used

<details>
  <summary>📚 Backend</summary>
  <div>
    <samp>
      <p align="center">
        <img src="https://img.shields.io/badge/Next.js-1e1e2e?&style=for-the-badge&logo=Next.js&logoColor=cba6f7"/>
        <img src="https://img.shields.io/badge/TypeScript-1e1e2e?&style=for-the-badge&logo=TypeScript&logoColor=cba6f7"/>
        <img src="https://img.shields.io/badge/Prisma-1e1e2e?&style=for-the-badge&logo=Prisma&logoColor=cba6f7"/>
        <img src="https://img.shields.io/badge/PostgreSQL-1e1e2e?&style=for-the-badge&logo=PostgreSQL&logoColor=cba6f7"/>
      </p>
    </samp>
  </div>
</details>

<details>
  <summary>📚 Frontend</summary>
  <div>
    <samp>
      <p align="center">
        <img src="https://img.shields.io/badge/Tailwind-1e1e2e?&style=for-the-badge&logo=Tailwind%20CSS&logoColor=cba6f7"/>
        <img src="https://img.shields.io/badge/ReactJs-1e1e2e?&style=for-the-badge&logo=React&logoColor=cba6f7"/>
      </p>
    </samp>
  </div>
</details>

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Methodology

This project uses a file-based routing system, where routes are automatically generated from the structure of the `pages` or `app` folders. It supports `Server-Side Rendering` (SSR) and `Static Site Generation` (SSG), ensuring optimized performance and a `smooth user experience`. Built with TypeScript, it benefits from `static typing` for enhanced code safety, `readability`, and `maintainability`.

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Project Structure

```bash
src/
├─ app/ # Layouts e páginas principais
│ ├─ layout.tsx
│ ├─ page.tsx
│ ├─ task/ # Páginas de tarefas
│ │ └─ page.tsx
│ └─ __tests__/ # Testes de integração
│ ├─ page.test.tsx
│ └─ task-page.test.tsx
├─ actions/ # Ações server-side (Next.js Server Actions)
│ ├─ add-task.ts
│ ├─ delete-task.ts
│ ├─ edit-task.ts
│ ├─ toggle-done.ts
│ ├─ user.ts
│ ├─ get-tasks-from-bd.ts
│ ├─ clear-completed-tasks.ts
│ └─ authcontext.tsx
│ └─ __tests__/ # Testes unitários para ações
│ ├─ add-task.test.ts
│ ├─ delete-task.test.ts
│ ├─ edit-task.test.ts
│ ├─ toggle-done.test.ts
│ └─ user.test.ts
├─ components/ # Componentes reutilizáveis
│ ├─ edit-task.tsx
│ ├─ filter.tsx
│ └─ task.tsx
│ └─ __tests__/ # Testes unitários para componentes
│ ├─ edit-task.test.tsx
│ └─ filter.test.tsx
├─ lib/        # Código compartilhado
│ ├─ prisma.ts # Cliente Prisma
│ └─ utils.ts
├─ utils/ # Funções utilitárias
│ └─ prisma.ts
└─ globals.d.ts # Tipos globais
```

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Tests

Tests are implemented using `Jest` and `@testing-library/react` to ensure the project's reliability through both `unit` and `integration` testing.
**Test structure:** Organized by type, with unit tests focusing on `components` and isolated `functions`, and integration tests covering complete `system flows`.

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## How to Use

1. Clone the repository.
2. npm install
3. Set up environment variables in .env

```bash
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

4. npx prisma migrate dev
5. npm run dev
6. Access the application at `http://localhost:3000`

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Testing

- Run all tests: `npm test`
- Run tests with coverage: `npm test -- --coverage`
- Test structure: Unit tests for actions and components, integration tests for full flows

<!-- RAINBOW LINE TOP -->
<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">
<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/banner-header.gif">