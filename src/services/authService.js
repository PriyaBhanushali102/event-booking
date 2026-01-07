import api from '../lib/api'

export const login = async (credentials) => {
  const res = await api.post('/api/auth/login', credentials)
  return res.data
}

export const logout = async () => {
  const res = await api.post('/api/auth/logout')
  return res.data
}

export const registerUser = async (payload) => {
  const res = await api.post('/api/auth/register', payload)
  return res.data
}
