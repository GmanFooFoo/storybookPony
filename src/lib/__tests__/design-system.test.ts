import { prisma } from '@/lib/db'
import { TokenType } from '@prisma/client'
import { createDesignSystem, addToken, addComponent, getDesignSystem } from '../design-system'

describe('Design System Operations', () => {
  beforeEach(async () => {
    await prisma.token.deleteMany()
    await prisma.component.deleteMany()
    await prisma.designSystem.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should create a design system with tokens and components', async () => {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    })

    // Create a design system
    const designSystem = await createDesignSystem(user.id, 'Test Design System')
    expect(designSystem.name).toBe('Test Design System')

    // Add a token
    const token = await addToken(
      designSystem.id,
      TokenType.COLOR,
      'primary',
      '#0070f3',
      'Primary brand color'
    )
    expect(token.value).toBe('#0070f3')

    // Add a component
    const component = await addComponent(
      designSystem.id,
      'Button',
      'export const Button = () => <button>Click me</button>',
      'Primary button component'
    )
    expect(component.name).toBe('Button')

    // Get the complete design system
    const complete = await getDesignSystem(designSystem.id)
    expect(complete?.tokens).toHaveLength(1)
    expect(complete?.components).toHaveLength(1)
  })
}) 