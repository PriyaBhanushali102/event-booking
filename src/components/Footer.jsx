import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t mt-8 py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} Event Booking - Demo
    </footer>
  )
}
