import { useState, useEffect } from 'react'
import { TextField, Button, MenuItem, Box } from '@mui/material'
import { useSnackbar } from 'notistack'
import { isValidTimeRange, isOverlapping } from '../utils/validation'

export default function ReservationForm({ rooms, reservations, onSave, currentReservation, onCancel }) {
    const [reservation, setReservation] = useState({
        roomId: '',
        reserver: '',
        purpose: '',
        start: '',
        end: ''
    })

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (currentReservation) {
            setReservation(currentReservation)
        }
    }, [currentReservation])

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newStart = new Date(reservation.start)
        const newEnd = new Date(reservation.end)

        if (!isValidTimeRange(reservation.start, reservation.end)) {
            enqueueSnackbar('Startzeit muss vor der Endzeit liegen!', { variant: 'warning' })
            return
        }

        // Check auf Überschneidung im gleichen Raum (außer eigene Reservierung beim Bearbeiten)
        const relevantReservations = reservations.filter(r =>
            r.roomId === reservation.roomId &&
            (!currentReservation || r._id !== currentReservation._id)
        )

        if (isOverlapping(relevantReservations, newStart, newEnd)) {
            enqueueSnackbar('Reservierung überschneidet sich mit einer bestehenden!', { variant: 'error' })
            return
        }

        onSave(reservation)
        setReservation({ roomId: '', reserver: '', purpose: '', start: '', end: '' })
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
                select
                label="Raum"
                name="roomId"
                value={reservation.roomId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            >
                {rooms.map((room) => (
                    <MenuItem key={room._id} value={room._id}>
                        {room.name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Reserviert von"
                name="reserver"
                value={reservation.reserver}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Zweck"
                name="purpose"
                value={reservation.purpose}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Startzeit"
                name="start"
                type="datetime-local"
                value={reservation.start}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                label="Endzeit"
                name="end"
                type="datetime-local"
                value={reservation.end}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
            />

            <Button type="submit" variant="contained">Speichern</Button>
            {onCancel && (
                <Button onClick={onCancel} variant="text" sx={{ ml: 2 }}>
                    Abbrechen
                </Button>
            )}
        </Box>
    )
}