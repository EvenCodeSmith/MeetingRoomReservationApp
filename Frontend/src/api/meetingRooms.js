import axios from 'axios'
import API_BASE_URL from './apiConfig'

const endpoint = `${API_BASE_URL}/meetingrooms`

export const getRooms = async () => {
    const res = await axios.get(endpoint)
    return res.data
}

export const createRoom = async (room) => {
    const res = await axios.post(endpoint, room)
    return res.data
}

export const updateRoom = async (id, room) => {
    const res = await axios.put(`${endpoint}/${id}`, room)
    return res.data
}

export const deleteRoom = async (id) => {
    await axios.delete(`${endpoint}/${id}`)
}
