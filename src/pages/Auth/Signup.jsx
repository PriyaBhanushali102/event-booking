import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(4, 'Name must be at least 4 chars'),
  email: z.string().email(),
  contact: z.string().regex(/^\d{10}$/, 'Contact must be exactly 10 digits'),
  password: z.string().min(6)
})

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  const auth = useSelector((s) => s.auth)

  const onSubmit = async (values) => {
    try {
      await dispatch(signup(values)).unwrap()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="text-sm">Name</label>
          <input {...register('name')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input {...register('email')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Contact</label>
          <input {...register('contact')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" {...register('password')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Sign up</button>
        </div>
        {auth.error && <div className="text-sm text-rose-600">{JSON.stringify(auth.error)}</div>}
      </form>
    </div>
  )
}
