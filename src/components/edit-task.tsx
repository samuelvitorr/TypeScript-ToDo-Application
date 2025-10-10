import { useState } from "react"
import { SquarePen } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Task } from "@prisma/client"
import { toast } from "sonner"
import { editTask } from "@/actions/edit-task"

type EditTaskProps = {
  task: Task
  handleGetTasks: () => void
  userId?: string | null
}

export default function EditTask({ task, handleGetTasks, userId }: EditTaskProps) {
  const [editedTask, setEditedTask] = useState(task.task)
  const [open, setOpen] = useState(false) // controla o estado do diálogo

  const handleEditTask = async () => {
    try {
      if (editedTask === task.task) {
        toast.error("As informações não foram alteradas")
        return
      }

      await editTask({
        idTask: task.id,
        newTask: editedTask,
        userId: userId || "",
      })

      toast.success("Tarefa editada com sucesso")
      handleGetTasks()
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao editar tarefa")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />

          <Button className="cursor-pointer" onClick={handleEditTask}>
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
