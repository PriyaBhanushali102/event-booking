import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = { events: [], selectedEvent: null, loading: false, error: null }

export const fetchEvents = createAsyncThunk('events/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/events')
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const fetchEventById = createAsyncThunk('events/fetchById', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/events/${id}`)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const createEvent = createAsyncThunk('events/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/events', payload)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const updateEvent = createAsyncThunk('events/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/api/events/${id}`, payload)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const deleteEvent = createAsyncThunk('events/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/events/${id}`)
    return id
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearSelected(state) { state.selectedEvent = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchEvents.fulfilled, (state, action) => { state.loading = false; state.events = action.payload })
      .addCase(fetchEvents.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })

      .addCase(fetchEventById.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchEventById.fulfilled, (state, action) => { state.loading = false; state.selectedEvent = action.payload })
      .addCase(fetchEventById.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })

      .addCase(createEvent.pending, (state) => { state.loading = true; state.error = null })
      .addCase(createEvent.fulfilled, (state, action) => { state.loading = false; state.events.unshift(action.payload) })
      .addCase(createEvent.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })

      .addCase(updateEvent.pending, (state) => { state.loading = true; state.error = null })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false
        state.events = state.events.map((e) => (e._id === action.payload._id ? action.payload : e))
        if (state.selectedEvent && state.selectedEvent._id === action.payload._id) state.selectedEvent = action.payload
      })
      .addCase(updateEvent.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })

      .addCase(deleteEvent.pending, (state) => { state.loading = true; state.error = null })
      .addCase(deleteEvent.fulfilled, (state, action) => { state.loading = false; state.events = state.events.filter((e) => e._id !== action.payload) })
      .addCase(deleteEvent.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message })
  }
})

export const { clearSelected } = eventSlice.actions
export default eventSlice.reducer
