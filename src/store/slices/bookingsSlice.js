import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], status: 'idle' }

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings(state, action) { state.items = action.payload },
    addBooking(state, action) { state.items.push(action.payload) }
  }
})

export const { setBookings, addBooking } = bookingsSlice.actions
export default bookingsSlice.reducer
