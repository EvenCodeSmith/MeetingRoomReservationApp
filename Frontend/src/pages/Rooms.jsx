import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { getRooms, createRoom, updateRoom, deleteRoom } from '../api/meetingRooms'
import RoomCard from '../components/RoomCard'
import RoomForm from '../components/RoomForm'
import { Typography } from '@mui/material'

export default function Rooms() {
    const [rooms, setRooms] = useState([])
    const [editingRoom, setEditingRoom] = useState(null)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        loadRooms()
    }, [])

    const loadRooms = async () => {
        try {
            const data = await getRooms()
            setRooms(data)
        } catch (error) {
            enqueueSnackbar('Fehler beim Laden der Räume', { variant: 'error' })
        }
    }

    const handleSave = async (room) => {
        try {
            if (editingRoom) {
                await updateRoom(editingRoom._id, room)
                enqueueSnackbar('Raum aktualisiert', { variant: 'success' })
            } else {
                await createRoom(room)
                enqueueSnackbar('Raum erstellt', { variant: 'success' })
            }
            setEditingRoom(null)
            loadRooms()
        } catch (error) {
            enqueueSnackbar('Fehler beim Speichern des Raums', { variant: 'error' })
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteRoom(id)
            enqueueSnackbar('Raum gelöscht', { variant: 'info' })
            loadRooms()
        } catch (error) {
            enqueueSnackbar('Fehler beim Löschen des Raums', { variant: 'error' })
        }
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Besprechungsräume
            </Typography>
            <RoomForm onSave={handleSave} currentRoom={editingRoom} onCancel={() => setEditingRoom(null)} />
            {rooms.map((room) => (
                <RoomCard key={room._id} room={room} onEdit={setEditingRoom} onDelete={handleDelete} />
            ))}
        </div>
    )
}