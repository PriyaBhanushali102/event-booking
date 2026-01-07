import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import eventsReducer from './slices/eventsSlice'
import bookingsReducer from './slices/bookingsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    bookings: bookingsReducer
  }
})

export default store
