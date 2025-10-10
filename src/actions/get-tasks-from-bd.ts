"use server"

import { prisma } from "@/lib/prisma"

export async function getTasks(userId: string) {
  if (!userId) return []

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
    })
    return tasks
  } catch (error) {
    console.error(error)
    return []
  }
}
