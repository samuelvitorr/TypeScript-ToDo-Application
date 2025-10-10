"use server"

import { prisma } from "@/lib/prisma"

export async function deleteCompletedTasks(userId: string) {
  if (!userId) return []

  try {
    await prisma.task.deleteMany({
      where: {
        userId,
        done: true,
      },
    })

    const tasksLeft = await prisma.task.findMany({
      where: { userId },
    })

    return tasksLeft || []
  } catch (error) {
    console.error(error)
    return []
  }
}
