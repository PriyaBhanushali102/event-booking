import React from 'react'
import { Link } from 'react-router-dom'
import DemoDialog from '../components/ui/Dialog'

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Welcome to Event Booking</h1>
        <p className="text-slate-600 mt-2">Create, browse and book events with an opinionated, production-ready frontend.</p>
        <div className="mt-4 flex items-center">
          <Link to="/events" className="btn btn-primary">Browse Events</Link>
          <DemoDialog />
        </div>
      </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium">Demo Guides</h2>
        <ul className="mt-2 text-sm text-slate-600 list-disc list-inside">
          <li>Auth + Protected Routes</li>
          <li>Events management + booking flow</li>
          <li>Redux Toolkit, hooks & typed validation</li>
        </ul>
      </div>
    </div>
  )
}
