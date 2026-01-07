import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authService from '../../services/authService'

const initialState = { user: null, token: null, status: 'idle', error: null }

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const data = await authService.login(credentials)
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutLocal(state) { state.user = null; state.token = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading' })
      .addCase(login.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload.user; state.token = action.payload.token })
      .addCase(login.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
  }
})

export const { logoutLocal } = authSlice.actions
export default authSlice.reducer
