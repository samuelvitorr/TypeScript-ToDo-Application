"use server"

import { prisma } from "@/lib/prisma"

type EditTaskProps = {
  idTask: string
  newTask: string
  userId: string
}

export async function editTask({ idTask, newTask, userId }: EditTaskProps) {
  if (!idTask || !newTask || !userId) return null

  try {
    const updated = await prisma.task.updateMany({
      where: {
        id: idTask,
        userId,
      },
      data: {
        task: newTask,
      },
    })

    if (updated.count === 0) return null

    return updated
  } catch (error) {
    console.error(error)
    return null
  }
}
