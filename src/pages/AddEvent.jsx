import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import api from '../services/eventsService'
import { addEvent } from '../store/slices/eventsSlice'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  date: z.string().optional()
})

export default function AddEvent() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const res = await api.createEvent(values)
      dispatch(addEvent(res))
      navigate('/events')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-semibold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="text-sm">Title</label>
          <input {...register('title')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Description</label>
          <textarea {...register('description')} className="mt-1 block w-full rounded border px-3 py-2" rows={4} />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  )
}
