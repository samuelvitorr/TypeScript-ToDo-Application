"use server"

import { prisma } from "@/lib/prisma"

export async function editTask(id: string, task: string) {
  try {
    const updated = await prisma.task.update({
      where: { id },
      data: { task },
    });
    return updated;
  } catch (error) {
    console.error(error);
    return null;
  }
}

