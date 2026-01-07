import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as eventsService from '../../services/eventsService'

const initialState = { items: [], status: 'idle', error: null }

export const fetchEvents = createAsyncThunk('events/fetchAll', async () => {
  return await eventsService.fetchEvents()
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action) { state.items.push(action.payload) }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.status = 'loading' })
      .addCase(fetchEvents.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchEvents.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
  }
})

export const { addEvent } = eventsSlice.actions
export default eventsSlice.reducer
