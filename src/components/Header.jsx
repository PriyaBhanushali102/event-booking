import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

export default function Header() {
  const auth = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">Event Booking</Link>
        <nav className="flex items-center gap-4">
          <Link to="/events" className="text-sm text-slate-600">Events</Link>
          {auth.isAuthenticated ? (
            <>
              <Link to="/bookings" className="text-sm text-slate-600">My Bookings</Link>
              <Link to="/profile" className="text-sm text-slate-600">Profile</Link>
              <button onClick={handleLogout} className="text-sm text-slate-600">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="text-sm text-slate-600">Sign in</Link>
              <Link to="/auth/signup" className="text-sm text-slate-600">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
