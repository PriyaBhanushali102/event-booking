import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventById } from '../../features/events/eventSlice'
import { createBooking } from '../../features/bookings/bookingSlice'
import { Dialog } from '@radix-ui/react-dialog'

export default function Checkout(){
  const [params] = useSearchParams()
  const eventId = params.get('eventId')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedEvent: event } = useSelector((s) => s.events)
  const [tickets, setTickets] = useState(1)
  const [open, setOpen] = useState(false)

  useEffect(()=>{ if (eventId) dispatch(fetchEventById(eventId)) }, [dispatch, eventId])

  const total = useMemo(()=> (event ? (tickets * event.price) : 0), [tickets, event])

  const onConfirm = async () =>{
    try{
      await dispatch(createBooking({ eventId: event._id, tickets, total })).unwrap()
      setOpen(false)
      navigate('/bookings')
    }catch(e){ console.error(e) }
  }

  if (!event) return <div className="text-center">Loading...</div>

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="rounded bg-white p-6 shadow">
        <h2 className="font-medium">Checkout • {event.title}</h2>
        <div className="mt-3">
          <label className="text-sm">Tickets</label>
          <input type="number" min={1} max={event.availableTickets} value={tickets} onChange={(e)=>setTickets(Math.max(1, Math.min(+e.target.value, event.availableTickets)))} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>Total</div>
          <div className="font-semibold">${total}</div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="btn btn-primary" onClick={()=>setOpen(true)}>Confirm booking</button>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-medium">Confirm booking</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-slate-600">You're booking {tickets} ticket(s) for <strong>{event.title}</strong>. Total ${total}.</Dialog.Description>
            <div className="mt-4 flex justify-end gap-2">
              <Dialog.Close asChild>
                <button className="btn">Cancel</button>
              </Dialog.Close>
              <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
