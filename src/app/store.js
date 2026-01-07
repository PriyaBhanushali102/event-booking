import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/events/eventSlice'
import bookingReducer from '../features/bookings/bookingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    bookings: bookingReducer
  }
})

export default store
