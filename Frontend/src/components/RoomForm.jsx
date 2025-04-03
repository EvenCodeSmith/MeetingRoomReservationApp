import { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

export default function RoomForm({ onSave, currentRoom, onCancel }) {
    const initialRoom = { name: '', capacity: '', equipment: '' }
    const [room, setRoom] = useState(initialRoom)

    useEffect(() => {
        if (currentRoom) {
            setRoom({
                name: currentRoom.name || '',
                capacity: currentRoom.capacity || '',
                equipment: Array.isArray(currentRoom.equipment)
                    ? currentRoom.equipment.join(', ')
                    : ''
            })
        } else {
            setRoom({ name: '', capacity: '', equipment: '' }) // direkt hier
        }
    }, [currentRoom])

    const handleChange = (e) => {
        setRoom(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedRoom = {
            name: room.name.trim(),
            capacity: Math.max(1, parseInt(room.capacity)),
            equipment: room.equipment
                .split(',')
                .map(f => f.trim())
                .filter(Boolean)
        }

        onSave(formattedRoom)
        setRoom(initialRoom)
    }

    const handleCancel = () => {
        setRoom(initialRoom)
        if (onCancel) onCancel()
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
                label="Raumname"
                name="name"
                value={room.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Kapazität"
                name="capacity"
                value={room.capacity}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                type="number"
                inputProps={{ min: 1 }}
            />
            <TextField
                label="Ausstattung (kommagetrennt)"
                name="equipment"
                value={room.equipment}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained">Speichern</Button>
            <Button onClick={handleCancel} variant="text" sx={{ ml: 2 }}>
                Abbrechen
            </Button>
        </Box>
    )
}