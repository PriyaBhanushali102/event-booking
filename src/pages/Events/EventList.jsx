import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../features/events/eventSlice'
import EventCard from '../../components/EventCard'
import Loader from '../../components/Loader'

export default function EventList(){
  const dispatch = useDispatch()
  const { events, loading } = useSelector((s) => s.events)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('date-asc')

  useEffect(()=>{ dispatch(fetchEvents()) }, [dispatch])

  const categories = useMemo(()=>{
    const set = new Set(events.map(e => e.category))
    return ['all', ...Array.from(set)]
  }, [events])

  const filtered = events.filter(e => e.title.toLowerCase().includes(query.toLowerCase()) && (category==='all' || e.category===category))

  const sorted = filtered.sort((a,b)=>{
    const ta = new Date(a.date).getTime()
    const tb = new Date(b.date).getTime()
    return sort === 'date-asc' ? ta-tb : tb-ta
  })

  if (loading) return <Loader />

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Search by title" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border rounded px-3 py-2">
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border rounded px-3 py-2">
          <option value="date-asc">Date asc</option>
          <option value="date-desc">Date desc</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sorted.map(event => <EventCard key={event._id || event.id} event={event} />)}
      </div>
    </div>
  )
}
