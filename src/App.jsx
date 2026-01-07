import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import EventList from './pages/Events/EventList'
import EventDetail from './pages/Events/EventDetail'
import AdminEvents from './pages/Events/AdminEvents'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Profile from './pages/User/Profile'
import Checkout from './pages/Booking/Checkout'
import History from './pages/Booking/History'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/admin" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/booking/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><History /></ProtectedRoute>} />

          <Route path="*" element={<div className="text-center py-10">Not found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
