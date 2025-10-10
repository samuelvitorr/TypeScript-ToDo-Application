<p align="center">👋 Hey! I'm Samuel Vitor, a brazilian programmer.</p>
<p align="center"><a href="https://typescript-todo-application.onrender.com/"><img src="https://img.shields.io/badge/website-742273?style=for-the-badge&logoColor=F2F2F2&logo=twitter"/></a>
<p align="center"><a href="https://twitter.com/samuell_vitoorr"><img src="https://img.shields.io/badge/X-742273?style=for-the-badge&logoColor=F2F2F2&logo=twitter"/></a>
<a href="https://www.linkedin.com/in/samuel-vitor-362713214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><img src="https://img.shields.io/badge/linkedin-742273?style=for-the-badge&logoColor=F2F2F2&logo=linkedin"/></a>
<a href="https://www.instagram.com/samuell_vitoorr?igsh=MXc0ZXViZGxuNWR3eA=="><img src="https://img.shields.io/badge/instagram-742273?style=for-the-badge&logoColor=F2F2F2&logo=instagram"/></a>

<!-- RAINBOW LINE TOP -->
<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## **Next.js + TypeScript To-Do List Application**

- :computer: Modern fullstack To-Do List application using **Next.js**, **TypeScript**, **Prisma**, and **Tailwind CSS**.  
- :white_check_mark: Users can create, read, update, delete, and filter tasks by status.  
- :bar_chart: Includes progress bars and task counters for better task management.

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Technologies Used

<details>
  <summary>🧮 Backend</summary>
  <div>
    <samp>
      <p align="left">
        - Next.js 15
        - TypeScript 5
        - Prisma ORM
        - PostgreSQL
      </p>
    </samp>
  </div>
</details>

<details>
  <summary>🧮 Frontend</summary>
  <div>
    <samp>
      <p align="left">
        - Tailwind CSS
        - React Components
      </p>
    </samp>
  </div>
</details>

<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">

## Methodology
Sistema de roteamento baseado em ``arquivos``, onde cada rota é automaticamente gerada a partir da estrutura de arquivos dentro das pastas pages ou app. Suporta ``Server-Side Rendering`` (SSR) e ``Static Site Generation`` (SSG), permitindo otimização de ``performance`` e melhor ``experiência do usuário``. Além disso, conta com ``tipagem estática`` fornecida pelo TypeScript, garantindo maior segurança e manutenção do código.


## Project Structure
```bash
src/
├─ app/ # Layouts e páginas principais
│ ├─ layout.tsx
│ └─ page.tsx
├─ task/ # Páginas e ações de tarefas
│ ├─ page.tsx
│ └─ actions/
│ ├─ get-tasks-from-bd.ts
│ ├─ add-task.ts
│ ├─ delete-task.ts
│ ├─ edit-task.ts
│ ├─ toggle-done.ts
│ └─ clear-completed-tasks.ts
├─ components/ # Componentes reutilizáveis
│ ├─ edit-task.tsx
│ ├─ filter.tsx
│ └─ task.tsx
├─ utils/ # Funções utilitárias
│ ├─ prisma.ts
│ └─ utils.ts
├─ lib/ # Código compartilhado e UI
│ ├─ utils.ts
│ ├─ components/
│ └─ ui/
│ ├─ button.tsx
│ ├─ card.tsx
│ ├─ input.tsx
│ └─ badge.tsx
└─ authcontext.tsx # Contexto de autenticação
```
<details>
  <summary>🧮 Testing</summary>
  <div>
    <samp>
      <p align="left">
        Ainda em desenvolmento
      </p>
    </samp>
  </div>
</details>

---

## How to Use
1. Clone the repository.
2. npm install
3. Set up environment variables in .env 
```bash
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```
4. npx prisma migrate dev 
5. Access the application at `http://localhost:8080`


<!-- RAINBOW LINE TOP -->
<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/line-neon.gif" width="100%">
<img src="https://github.com/AnderMendoza/AnderMendoza/raw/main/assets/banner-header.gif"> 
