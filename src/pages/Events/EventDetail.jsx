import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventById } from '../../features/events/eventSlice'
import Loader from '../../components/Loader'

export default function EventDetail(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedEvent: event, loading } = useSelector((s) => s.events)
  const auth = useSelector((s) => s.auth)

  useEffect(()=>{ if (id) dispatch(fetchEventById(id)) }, [dispatch, id])

  if (loading || !event) return <Loader />

  const canBook = auth.isAuthenticated && event.availableTickets > 0

  return (
    <div className="space-y-6">
      <div className="rounded bg-white p-6 shadow">
        <h1 className="text-xl font-semibold">{event.title}</h1>
        <div className="text-sm text-slate-600 mt-2">{new Date(event.date).toLocaleString()}</div>
        <div className="mt-3 text-sm text-slate-600">{event.location} • {event.category}</div>
        <p className="mt-4 text-slate-700">{event.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">${event.price}</div>
          {canBook ? (
            <Link to={`/booking/checkout?eventId=${event._id || event.id}`} className="btn btn-primary">Book Tickets</Link>
          ) : (
            <div className="text-sm text-slate-500">{event.availableTickets === 0 ? 'Sold out' : 'Sign in to book'}</div>
          )}
        </div>
      </div>
      {event.images && event.images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {event.images.map((src, idx)=>(<img key={idx} src={src} alt="" className="w-full h-40 object-cover rounded"/>))}
        </div>
      )}
    </div>
  )
}
