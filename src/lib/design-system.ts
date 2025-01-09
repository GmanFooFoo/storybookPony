import { prisma } from '@/lib/db'
import { TokenType } from '@prisma/client'

export async function createDesignSystem(userId: string, name: string, description?: string) {
  return prisma.designSystem.create({
    data: {
      name,
      description,
      userId,
    },
  })
}

export async function addToken(
  designSystemId: string,
  type: TokenType,
  name: string,
  value: string,
  description?: string
) {
  return prisma.token.create({
    data: {
      type,
      name,
      value,
      description,
      designSystemId,
    },
  })
}

export async function addComponent(
  designSystemId: string,
  name: string,
  sourceCode: string,
  description?: string
) {
  return prisma.component.create({
    data: {
      name,
      sourceCode,
      description,
      designSystemId,
    },
  })
}

export async function getDesignSystem(id: string) {
  return prisma.designSystem.findUnique({
    where: { id },
    include: {
      tokens: true,
      components: true,
    },
  })
} 