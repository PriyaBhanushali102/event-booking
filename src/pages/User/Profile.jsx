import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfile, updateProfile } from '../../features/auth/authSlice'
import { fetchMyBookings } from '../../features/bookings/bookingSlice'
import BookingCard from '../../components/BookingCard'

const schema = z.object({ name: z.string().min(4), contact: z.string().regex(/^\d{10}$/, 'Contact must be exactly 10 digits') })

export default function Profile(){
  const dispatch = useDispatch()
  const { user, loading } = useSelector((s) => s.auth)
  const bookings = useSelector((s) => s.bookings.bookings)
  const { register, handleSubmit, reset } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchMyBookings())
  }, [dispatch])

  useEffect(() => {
    if (user) reset({ name: user.name, contact: user.contact })
  }, [user, reset])

  const onSubmit = async (values) => {
    await dispatch(updateProfile(values)).unwrap()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded bg-white p-6 shadow">
        <h2 className="text-lg font-medium">Profile</h2>
        {user && (
          <div className="mt-4">
            <div className="text-sm text-slate-600">Email: {user.email}</div>
            <div className="text-sm text-slate-600">Role: {user.role}</div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input {...register('name')} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">Contact</label>
            <input {...register('contact')} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary" type="submit">Update profile</button>
          </div>
        </form>
      </div>

      <div className="rounded bg-white p-6 shadow">
        <h3 className="font-medium">Booking history</h3>
        <div className="mt-4 space-y-3">
          {bookings.length === 0 ? (
            <div className="text-sm text-slate-500">No bookings yet.</div>
          ) : (
            bookings.map((b) => <BookingCard key={b._id} booking={b} />)
          )}
        </div>
      </div>
    </div>
  )
}
