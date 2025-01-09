import { PrismaClient, TokenType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  })

  // Create a design system
  const designSystem = await prisma.designSystem.create({
    data: {
      name: 'Test Design System',
      description: 'A test design system',
      userId: user.id,
      tokens: {
        create: [
          {
            type: TokenType.COLOR,
            name: 'primary',
            value: '#0070f3',
            description: 'Primary brand color',
          },
        ],
      },
      components: {
        create: [
          {
            name: 'Button',
            sourceCode: 'export const Button = () => <button>Click me</button>',
            description: 'Primary button component',
          },
        ],
      },
    },
  })

  console.log({ user, designSystem })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 