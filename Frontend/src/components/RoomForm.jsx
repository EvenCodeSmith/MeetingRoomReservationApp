import { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

export default function RoomForm({ onSave, currentRoom, onCancel }) {
    const [room, setRoom] = useState({ name: '', capacity: '', features: '' })

    useEffect(() => {
        if (currentRoom) {
            setRoom({
                name: currentRoom.name,
                capacity: currentRoom.capacity,
                features: currentRoom.features?.join(', ')
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
            capacity: parseInt(room.capacity),
            features: room.features.split(',').map((f) => f.trim())
        }
        onSave(formattedRoom)
        setRoom({ name: '', capacity: '', features: '' })
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
            />
            <TextField
                label="Ausstattung (kommagetrennt)"
                name="features"
                value={room.features}
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
