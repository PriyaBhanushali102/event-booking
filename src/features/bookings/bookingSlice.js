import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = { bookings: [], loading: false, error: null }

export const createBooking = createAsyncThunk('bookings/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/bookings', payload)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const fetchMyBookings = createAsyncThunk('bookings/my', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/bookings/my')
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const cancelBooking = createAsyncThunk('bookings/cancel', async (id, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/api/bookings/${id}/cancel`)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => { state.loading = true; state.error = null })
      .addCase(createBooking.fulfilled, (state, action) => { state.loading = false; state.bookings.unshift(action.payload) })
      .addCase(createBooking.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })

      .addCase(fetchMyBookings.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchMyBookings.fulfilled, (state, action) => { state.loading = false; state.bookings = action.payload })
      .addCase(fetchMyBookings.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })

      .addCase(cancelBooking.pending, (state) => { state.loading = true; state.error = null })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = state.bookings.map((b) => (b._id === action.payload._id ? action.payload : b))
      })
      .addCase(cancelBooking.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })
  }
})

export default bookingSlice.reducer
