import React from 'react'
import { render, screen } from '@testing-library/react'
import EventCard from './EventCard'

test('renders event card', () => {
  const event = { title: 'Concert', date: new Date().toISOString(), location: 'Hall', category: 'Music', price: 20 }
  render(<EventCard event={event} />)
  expect(screen.getByText('Concert')).toBeInTheDocument()
  expect(screen.getByText('Music')).toBeInTheDocument()
})
