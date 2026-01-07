import api from '../lib/api'

export const fetchEvents = async () => {
  const res = await api.get('/api/events')
  return res.data
}

export const fetchEventById = async (id) => {
  const res = await api.get(`/api/events/${id}`)
  return res.data
}

export const createEvent = async (payload) => {
  const res = await api.post('/api/events', payload)
  return res.data
}
