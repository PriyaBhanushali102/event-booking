import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }){
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex items-start gap-4">
        <div className="w-24 h-16 bg-slate-100 rounded overflow-hidden flex-shrink-0">
          {event.images && event.images[0] ? <img src={event.images[0]} alt="" className="w-full h-full object-cover" /> : null}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{event.title}</h3>
            <div className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString()}</div>
          </div>
          <p className="text-sm text-slate-600 mt-1">{event.location}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100">{event.category}</span>
            <span className="text-sm font-semibold">${event.price}</span>
          </div>
          <div className="mt-3">
            <Link to={`/events/${event._id || event.id}`} className="text-sm text-sky-600">View details →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
