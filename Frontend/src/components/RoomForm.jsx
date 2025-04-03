import { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

export default function RoomForm({ onSave, currentRoom, onCancel }) {
    const [room, setRoom] = useState({
        name: '',
        capacity: '',
        equipment: ''
    })

    useEffect(() => {
        if (currentRoom) {
            setRoom({
                name: currentRoom.name,
                capacity: currentRoom.capacity,
                equipment: currentRoom.equipment?.join(', ') || ''
            })
        }
    }, [currentRoom])

    const handleChange = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedRoom = {
            ...room,
            capacity: Math.max(1, parseInt(room.capacity) || 1), // 🧠 Nie kleiner als 1
            equipment: room.equipment
                .split(',')
                .map((f) => f.trim())
                .filter((f) => f.length > 0)
        }

        onSave(formattedRoom)

        setRoom({ name: '', capacity: '', equipment: '' })
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
            <Button type="submit" variant="contained">
                Speichern
            </Button>
            {onCancel && (
                <Button onClick={onCancel} variant="text" sx={{ ml: 2 }}>
                    Abbrechen
                </Button>
            )}
        </Box>
    )
}