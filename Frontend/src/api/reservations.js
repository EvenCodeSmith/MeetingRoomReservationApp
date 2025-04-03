import axios from 'axios'

const API_BASE = 'http://localhost:5000/api/Reservations' // ggf. anpassen

export const getReservations = async () => {
    const res = await axios.get(API_BASE)
    return res.data
}

export const createReservation = async (reservation) => {
    const res = await axios.post(API_BASE, reservation)
    return res.data
}

export const updateReservation = async (id, reservation) => {
    const res = await axios.put(`${API_BASE}/${id}`, reservation)
    return res.data
}

export const deleteReservation = async (id) => {
    const res = await axios.delete(`${API_BASE}/${id}`)
    return res.data
}
