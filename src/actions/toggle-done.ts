"use server"

import { prisma } from "@/lib/prisma"

export async function updateTaskStatus(taskId: string, userId: string) {
  if (!taskId || !userId) return null

  try {
    const currentTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    })

    if (!currentTask) return null

    const updated = await prisma.task.updateMany({
      where: {
        id: taskId,
        userId,
      },
      data: {
        done: !currentTask.done,
      },
    })

    if (updated.count === 0) return null

    return updated
  } catch (error) {
    console.error(error)
    return null
  }
}
