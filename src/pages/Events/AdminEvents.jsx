import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../features/events/eventSlice'
import Loader from '../../components/Loader'

export default function AdminEvents(){
  const dispatch = useDispatch()
  const { events, loading } = useSelector((s) => s.events)
  const auth = useSelector((s) => s.auth)
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', category: '', price: 0, availableTickets: 0 })
  const [editingId, setEditingId] = useState(null)

  useEffect(()=>{ dispatch(fetchEvents()) }, [dispatch])

  if (!auth.isAuthenticated || auth.user?.role !== 'admin') return <div className="text-center">Access denied</div>
  if (loading) return <Loader />

  const onSubmit = async (e) =>{
    e.preventDefault()
    if (form.description.length < 20) return alert('Description must be at least 20 characters')
    if (editingId) await dispatch(updateEvent({ id: editingId, payload: form })).unwrap()
    else await dispatch(createEvent(form)).unwrap()
    setForm({ title: '', description: '', date: '', location: '', category: '', price: 0, availableTickets: 0 })
    setEditingId(null)
  }

  const startEdit = (evt) => { setEditingId(evt._id); setForm({ title: evt.title, description: evt.description, date: evt.date, location: evt.location, category: evt.category, price: evt.price, availableTickets: evt.availableTickets }) }

  return (
    <div className="space-y-6">
      <div className="rounded bg-white p-6 shadow">
        <h2 className="font-medium">Create / Edit Event</h2>
        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-3">
          <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="border rounded px-3 py-2" />
          <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description (min 20 chars)" className="border rounded px-3 py-2" />
          <input value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} placeholder="Date" className="border rounded px-3 py-2" />
          <input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} placeholder="Location" className="border rounded px-3 py-2" />
          <input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder="Category" className="border rounded px-3 py-2" />
          <input type="number" value={form.price} onChange={(e)=>setForm({...form,price:+e.target.value})} placeholder="Price" className="border rounded px-3 py-2" />
          <input type="number" value={form.availableTickets} onChange={(e)=>setForm({...form,availableTickets:+e.target.value})} placeholder="Available tickets" className="border rounded px-3 py-2" />
          <div className="flex gap-2 justify-end">
            <button className="btn">Cancel</button>
            <button className="btn btn-primary" type="submit">{editingId? 'Update':'Create'}</button>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {events.map((e)=> (
          <div key={e._id} className="rounded bg-white p-4 shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-xs text-slate-500">{e.category} • {new Date(e.date).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>startEdit(e)} className="text-sm text-sky-600">Edit</button>
              <button onClick={()=>dispatch(deleteEvent(e._id))} className="text-sm text-rose-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
