import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  const auth = useSelector((s) => s.auth)

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="text-sm">Email</label>
          <input {...register('email')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" {...register('password')} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
        {auth.error && <div className="text-sm text-rose-600">{JSON.stringify(auth.error)}</div>}
      </form>
    </div>
  )
}
