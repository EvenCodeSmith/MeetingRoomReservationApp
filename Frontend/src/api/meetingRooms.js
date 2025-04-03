import axios from 'axios'

const API_BASE = 'http://localhost:5000/api/MeetingRooms' // ggf. anpassen

export const getRooms = async () => {
    const res = await axios.get(API_BASE)
    return res.data
}

export const createRoom = async (room) => {
    const res = await axios.post(API_BASE, room)
    return res.data
}

export const updateRoom = async (id, room) => {
    const res = await axios.put(`${API_BASE}/${id}`, room)
    return res.data
}

export const deleteRoom = async (id) => {
    const res = await axios.delete(`${API_BASE}/${id}`)
    return res.data
}
