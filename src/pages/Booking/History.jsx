import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyBookings, cancelBooking } from '../../features/bookings/bookingSlice'
import BookingCard from '../../components/BookingCard'

export default function History(){
  const dispatch = useDispatch()
  const { bookings, loading } = useSelector((s) => s.bookings)
  const [filter, setFilter] = useState('all')

  useEffect(()=>{ dispatch(fetchMyBookings()) }, [dispatch])

  const list = bookings.filter(b => filter === 'all' || b.status === filter)

  const onCancel = (id) => { dispatch(cancelBooking(id)) }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="space-y-3">
        {list.length === 0 ? <div className="text-sm text-slate-500">No bookings</div> : list.map(b => <BookingCard key={b._id} booking={b} onCancel={onCancel} />)}
      </div>
    </div>
  )
}
