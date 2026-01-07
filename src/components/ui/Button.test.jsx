import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

test('Button renders and handles click', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click me</Button>)
  const btn = screen.getByText('Click me')
  fireEvent.click(btn)
  expect(onClick).toHaveBeenCalled()
})
