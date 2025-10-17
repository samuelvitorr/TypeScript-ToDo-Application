'use client';
import { useState } from 'react';
import { editTask } from '@/actions/edit-task';
import { Task } from '@prisma/client';

interface EditTaskProps {
  task: Task;
  handleGetTasks: () => void;
  userId: string | null;
}

export default function EditTask({ task, handleGetTasks, userId }: EditTaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!editedTask.trim() || !userId) return;
    setLoading(true);
    const updated = await editTask(task.id, editedTask);
    setLoading(false);
    if (updated) {
      setIsEditing(false);
      handleGetTasks();
    }
  };

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <input
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          placeholder="Editar tarefa"
          className="text-sm border border-border rounded px-2 py-1 bg-input text-foreground"
          disabled={loading}
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded"
        >
          {loading ? '...' : 'Salvar'}
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
    >
      Editar
    </button>
  );
}
