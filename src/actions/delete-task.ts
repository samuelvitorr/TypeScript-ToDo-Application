"use server"

import { prisma } from "@/lib/prisma"

export async function deleteTask(idTask: string, userId: string) {
  if (!idTask || !userId) return null

  try {
    const deleted = await prisma.task.deleteMany({
      where: {
        id: idTask,
        userId,
      },
    })

    if (deleted.count === 0) return null

    return deleted
  } catch (error) {
    console.error(error)
    return null
  }
}
