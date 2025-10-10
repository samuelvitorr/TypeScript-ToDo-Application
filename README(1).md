# Documentação e Explicação Completa do Sistema de Tarefas

---

## 1. Visão Geral do Sistema

Este sistema é uma aplicação de gerenciamento de tarefas com funcionalidades de autenticação (login e cadastro), criação, edição, exclusão e filtragem de tarefas. Cada tarefa está associada a um usuário autenticado para garantir privacidade e segurança.

---

## 2. Estrutura das Funções e Fluxos Principais

### 2.1 Autenticação e Proteção de Rotas

- O sistema utiliza **localStorage** para armazenar o status de login (`loggedIn`) e o `userId`.
- Na renderização da página de tarefas (`TaskPage`), um efeito verifica se o usuário está logado:
  - Se não estiver, redireciona para a página de login.
  - Caso esteja, recupera o `userId` e permite acesso.
- Essa proteção evita acesso não autorizado às tarefas.

---

### 2.2 Funções do Backend (Server Actions) - Tarefas

Todas as funções recebem o `userId` para garantir que cada operação seja feita somente nas tarefas do usuário logado.

| Função               | Parâmetros                   | Descrição                                           | Retorno                              |
|----------------------|-----------------------------|-----------------------------------------------------|------------------------------------|
| `NewTask`            | `taskName: string, userId`  | Cria uma nova tarefa para o usuário especificado.   | Nova tarefa criada ou `null`        |
| `getTasks`           | `userId: string`            | Busca todas as tarefas do usuário.                   | Lista de tarefas ou array vazio     |
| `deleteTask`         | `idTask: string, userId`    | Deleta uma tarefa específica do usuário.            | Resultado da deleção ou `null`      |
| `editTask`           | `{idTask, newTask, userId}` | Atualiza o texto de uma tarefa do usuário.           | Resultado da atualização ou `null` |
| `updateTaskStatus`   | `taskId: string, userId`    | Alterna o status "done" da tarefa (marcar/desmarcar).| Resultado da atualização ou `null` |
| `deleteCompletedTasks` | `userId: string`           | Deleta todas as tarefas concluídas do usuário.       | Lista atualizada de tarefas         |

---

### 2.3 Componente Frontend: `TaskPage`

- Usa React com hooks para estado e efeitos.
- Verifica autenticação ao montar.
- Usa estado para:
  - Lista completa de tarefas (`taskList`)
  - Filtro ativo (`currentFilter`)
  - Tarefas filtradas (`filteredTasks`)
  - Controle de loading, input de nova tarefa, etc.
- Funções para:
  - Adicionar nova tarefa (chamando `NewTask` com `userId`)
  - Buscar tarefas (`getTasks`)
  - Excluir tarefa (`deleteTask`)
  - Alterar status (`updateTaskStatus`)
  - Limpar todas as tarefas concluídas (`deleteCompletedTasks`)
- Renderiza a lista com filtros (Todas, Pendentes, Concluídas).
- Barra de progresso e contadores de tarefas.

---

## 3. Login e Cadastro (Contexto)

- O login e cadastro armazenam no `localStorage` o `loggedIn` e o `userId`.
- O `userId` é a chave para operar nas tarefas do usuário.
- Sem autenticação, o sistema redireciona para a tela de login.
- O fluxo garante que cada usuário só veja e manipule suas próprias tarefas.

---

## 4. Próximas Alterações Sugeridas

- **Testes automatizados** para as funções do backend:
  - Testar criação, leitura, atualização, deleção (CRUD).
  - Testar comportamento com IDs inválidos.
  - Testar proteção (funções retornam `null` se o `userId` não bate).
- **Melhorias de UX:**
  - Exibir mensagens de erro detalhadas.
  - Loading spinners e feedbacks em todas operações.
- **Validações:**
  - Verificar se tarefas duplicadas são criadas.
  - Limites de tamanho para textos de tarefas.
- **Segurança:**
  - Mover armazenamento de `userId` para sessão segura (cookie HTTPOnly).
  - Implementar autenticação via JWT ou OAuth para robustez.
- **Funcionalidades extras:**
  - Ordenação de tarefas.
  - Notificações e lembretes.
  - Marcar prioridades.

---

## 5. Sugestões para Testes

- **Teste manual:**
  - Criar tarefas, alterar status, editar texto.
  - Testar filtro de tarefas.
  - Testar deleção individual e em massa.
  - Verificar redirecionamento de login/logout.
- **Teste automatizado (exemplo com Jest):**
  - Mock do banco Prisma.
  - Cobertura para todas as funções server.
  - Simular usuário logado vs. não logado.
  - Validar retorno correto e proteção contra manipulação indevida.

---

## 6. Dicas para Futuras Conversas comigo (ChatGPT)

- Sempre informe o contexto do sistema (ex: “Estou trabalhando num sistema Next.js com Prisma e autenticação localStorage...”).
- Informe os arquivos ou trechos de código que quer alterar.
- Especifique se quer ajuda com backend, frontend, testes, design, etc.
- Guarde esse resumo para reaproveitar a conversa e agilizar respostas.

---

Se quiser, posso ajudar a montar testes, aprimorar o login ou gerar documentação mais detalhada!

