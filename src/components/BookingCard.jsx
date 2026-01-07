import React from 'react'

export default function BookingCard({ booking, onCancel }){
  return (
    <div className="rounded-lg bg-white p-4 shadow flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">{booking.eventTitle}</div>
        <div className="text-xs text-slate-500">Tickets: {booking.tickets}</div>
        <div className="text-xs text-slate-500">Total: ${booking.total}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`text-xs px-2 py-0.5 rounded ${booking.status === 'cancelled' ? 'bg-red-100' : 'bg-green-100'}`}>{booking.status}</div>
        {booking.status !== 'cancelled' && onCancel && (
          <button onClick={() => onCancel(booking._id)} className="text-sm text-rose-600">Cancel</button>
        )}
      </div>
    </div>
  )
}
