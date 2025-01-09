import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button text="Click me" />)
    
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-500') // primary variant
  })

  it('renders with secondary variant', () => {
    render(<Button text="Click me" variant="secondary" />)
    
    const button = screen.getByText('Click me')
    expect(button).toHaveClass('bg-gray-200')
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button text="Click me" onClick={handleClick} />)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button text="Click me" size="sm" />)
    expect(screen.getByText('Click me')).toHaveClass('h-9')

    rerender(<Button text="Click me" size="lg" />)
    expect(screen.getByText('Click me')).toHaveClass('h-11')
  })
}) 