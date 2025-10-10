'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

type State = {
  message: string | null
}

// Registro
export async function createUserAction(formData: FormData): Promise<State | { success: true; userId?: string }> {
  const name = formData.get('name')?.toString().trim()
  const password = formData.get('password')?.toString().trim()

  if (!name || !password) {
    return { message: 'Nome e senha são obrigatórios.' }
  }

  const existingUser = await prisma.user.findUnique({ where: { name } })

  if (existingUser) {
    return { message: 'Usuario ja existe.' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const createdUser = await prisma.user.create({
    data: { name, password: hashedPassword },
  })

  return { success: true, userId: createdUser.id }
}

// Login
export async function loginUserAction(formData: FormData): Promise<State | { success: true; userId?: string }> {
  const name = formData.get('name')?.toString().trim()
  const password = formData.get('password')?.toString().trim()

  if (!name || !password) {
    return { message: 'Preencha todos os campos.' }
  }

  const user = await prisma.user.findUnique({ where: { name } })

  if (!user) {
    return { message: 'Usuario nao encontrado.' }
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return { message: 'Senha incorreta.' }
  }

  return { success: true, userId: user.id }
}
