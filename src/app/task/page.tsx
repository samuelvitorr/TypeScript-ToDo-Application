'use client';

import EditTask from '@/components/edit-task';
import Filter, { FilterType } from '@/components/filter';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ListCheck, LoaderCircle, Plus, Sigma, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { NewTask } from '@/actions/add-task';
import { deleteCompletedTasks } from '@/actions/clear-completed-tasks';
import { deleteTask } from '@/actions/delete-task';
import { getTasks } from '@/actions/get-tasks-from-bd';
import { updateTaskStatus } from '@/actions/toggle-done';
import { Task } from '@prisma/client';

export default function TaskPage() {
  const router = useRouter();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
      router.replace('/');
    } else {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        router.replace('/');
        return;
      }
      setUserId(storedUserId);
      setIsAuthChecked(true);
    }
  }, [router]);

  const handleGetTasks = useCallback(async () => {
    if (!userId) return;

    try {
      const tasks = await getTasks(userId);
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  const handleAddTask = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      if (task.trim().length === 0) {
        toast.error('Insira uma atividade');
        setLoading(false);
        return;
      }

      const myNewTask = await NewTask(task, userId);
      if (!myNewTask) return;

      setTask('');
      toast.success('Atividade adicionada com sucesso');
      await handleGetTasks();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    if (!userId) return;

    try {
      if (!id) return;
      const deletedTask = await deleteTask(id, userId);
      if (!deletedTask) return;

      await handleGetTasks();
      toast.warning('Atividade deletada com sucesso');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!userId) return;

    const previousTasks = [...taskList];
    try {
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        )
      );
      await updateTaskStatus(taskId, userId);
    } catch (error) {
      setTaskList(previousTasks);
      console.error(error);
    }
  };

  const clearCompletedTasks = async () => {
    if (!userId) return;

    const deletedTasks = await deleteCompletedTasks(userId);
    if (!deletedTasks) return;
    setTaskList(deletedTasks);
  };

  useEffect(() => {
    if (isAuthChecked) {
      handleGetTasks();
    }
  }, [isAuthChecked, handleGetTasks]);

  useEffect(() => {
    switch (currentFilter) {
      case 'all':
        setFilteredTasks(taskList);
        break;
      case 'pending':
        setFilteredTasks(taskList.filter((task) => !task.done));
        break;
      case 'completed':
        setFilteredTasks(taskList.filter((task) => task.done));
        break;
    }
  }, [currentFilter, taskList]);

  if (!isAuthChecked) return null;

  return (
    <main className="w-full min-h-screen flex justify-center items-center transition-colors duration-300 bg-background text-foreground">
      <Card className="w-[80vw] max-w-2xl min-h-[400px] shadow-lg border border-border transition-colors duration-300 bg-card text-card-foreground">
        <Button
          variant="outline"
          className="text-xs absolute top-4 right-4"
          onClick={() => {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('userId');
            router.replace('/');
          }}
        >
          Sair
        </Button>
        <CardHeader className="flex gap-2 relative">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            className="bg-input text-foreground border-border"
          />
          <Button
            variant="default"
            className="cursor-pointer bg-primary text-primary-foreground"
            onClick={handleAddTask}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4 border-border" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-t border-border">
            {taskList.length === 0 && (
              <p className="text-xs py-4 text-muted-foreground">
                Você não possui atividades cadastradas.
              </p>
            )}

            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="h-14 flex justify-between items-center border-t border-border transition-colors duration-300"
              >
                <div
                  className={`w-1 h-full ${task.done ? 'bg-chart-3' : 'bg-destructive'}`}
                />
                <p
                  className={`flex-1 px-2 text-sm cursor-pointer transition-colors duration-300 ${
                    task.done
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                  }`}
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.task}
                </p>
                <div className="flex gap-2 items-center">
                  <EditTask
                    task={task}
                    handleGetTasks={handleGetTasks}
                    userId={userId}
                  />
                  <Trash
                    size={16}
                    className="cursor-pointer transition-colors duration-300 text-destructive"
                    onClick={() => handleDeleteTask(task.id)}
                    data-testid={`delete-task-${task.id}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-muted-foreground">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">
                Tarefas concluídas (
                {taskList.filter((task) => task.done).length}/{taskList.length})
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7 cursor-pointer border border-border bg-card text-card-foreground">
                  <Trash size={14} />
                  Limpar tarefas concluídas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card text-card-foreground border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir as tarefas concluídas?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="cursor-pointer bg-destructive text-primary-foreground"
                    onClick={clearCompletedTasks}
                  >
                    Sim
                  </AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancelar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full mt-4 rounded-md bg-muted">
            <div
              className="h-full rounded-md transition-all duration-300 bg-primary"
              style={{
                width: `${
                  taskList.length > 0
                    ? (taskList.filter((task) => task.done).length /
                        taskList.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="flex justify-end items-center mt-2 gap-2 text-muted-foreground">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
