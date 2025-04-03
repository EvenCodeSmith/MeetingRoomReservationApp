import axios from 'axios'
import API_BASE_URL from './apiConfig'

const endpoint = `${API_BASE_URL}/reservations`

export const getReservations = async () => {
    const res = await axios.get(endpoint)
    return res.data
}

export const createReservation = async (reservation) => {
    const res = await axios.post(endpoint, reservation)
    return res.data
}

export const updateReservation = async (id, reservation) => {
    const res = await axios.put(`${endpoint}/${id}`, reservation)
    return res.data
}

export const deleteReservation = async (id) => {
    await axios.delete(`${endpoint}/${id}`)
}
