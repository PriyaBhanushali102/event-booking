import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvents } from '../store/slices/eventsSlice'

function CreateButton() {
  const user = useSelector((s) => s.auth.user)
  if (!user) return null
  return (
    <Link to="/events/new" className="btn btn-primary">Create Event</Link>
  )
}

export default function Events() {
  const dispatch = useDispatch()
  const { items: events, status } = useSelector((state) => state.events)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchEvents())
  }, [dispatch, status])

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Events</h1>
      {status === 'loading' && <div className="text-sm text-slate-600 mb-2">Loading...</div>}
      <div className="flex items-center justify-between mb-4">
        <div />
        <div>
          {/** show create button when logged in */}
          {/* will render if user exists */}
          <CreateButton />
        </div>
      </div>
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-lg bg-white p-4 shadow text-slate-600">No events yet. You can add them via the API.</div>
        ) : (
          events.map((e) => (
            <div key={e._id || e.id} className="rounded-lg bg-white p-4 shadow">
              <h3 className="font-medium">{e.title}</h3>
              <p className="text-sm text-slate-600">{e.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
