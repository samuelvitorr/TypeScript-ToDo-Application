"use server"

import { prisma } from "@/lib/prisma"

export async function NewTask(taskName: string, userId: string) {
  if (!taskName || !userId) return null

  try {
    const newTask = await prisma.task.create({
      data: {
        task: taskName,
        done: false,
        userId,
      },
    })
    return newTask
  } catch (error) {
    console.error(error)
    return null
  }
}
