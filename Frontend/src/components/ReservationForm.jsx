import { useState, useEffect } from 'react'
import { TextField, Button, MenuItem, Box } from '@mui/material'
import { useSnackbar } from 'notistack'
import { isValidTimeRange, isOverlapping } from '../utils/validation'

const formatDatetimeLocal = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const pad = (n) => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export default function ReservationForm({ rooms, reservations, onSave, currentReservation, onCancel }) {
    const [reservation, setReservation] = useState({
        roomId: '',
        reservedBy: '',
        purpose: '',
        startTime: '',
        endTime: ''
    })

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        const empty = {
            roomId: '',
            reservedBy: '',
            purpose: '',
            startTime: '',
            endTime: ''
        }

        if (currentReservation) {
            setReservation({
                roomId: currentReservation.roomId,
                reservedBy: currentReservation.reservedBy,
                purpose: currentReservation.purpose,
                startTime: currentReservation.startTime,
                endTime: currentReservation.endTime
            })
        } else {
            setReservation(empty)
        }
    }, [currentReservation])

    const handleChange = (e) => {
        const { name, value } = e.target
        setReservation({ ...reservation, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newStart = new Date(reservation.startTime)
        const newEnd = new Date(reservation.endTime)

        if (!isValidTimeRange(newStart, newEnd)) {
            enqueueSnackbar('Startzeit muss vor der Endzeit liegen!', { variant: 'warning' })
            return
        }

        const relevantReservations = reservations.filter(r =>
            r.roomId === reservation.roomId &&
            (!currentReservation || r.id !== currentReservation.id)
        )

        if (isOverlapping(relevantReservations, newStart, newEnd)) {
            enqueueSnackbar('Reservierung überschneidet sich mit einer bestehenden!', { variant: 'error' })
            return
        }

        onSave(reservation)

        if (!currentReservation) {
            setReservation({
                roomId: '',
                reservedBy: '',
                purpose: '',
                startTime: '',
                endTime: ''
            })
        }
    }

    const handleCancel = () => {
        setReservation({
            roomId: '',
            reservedBy: '',
            purpose: '',
            startTime: '',
            endTime: ''
        })
        if (onCancel) onCancel()
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
                    <MenuItem key={room.id} value={room.id}>
                        {room.name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Reserviert von"
                name="reservedBy"
                value={reservation.reservedBy}
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
                name="startTime"
                type="datetime-local"
                value={formatDatetimeLocal(reservation.startTime)}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                inputRef={(ref) => {
                    if (ref) {
                        ref.addEventListener('click', () => ref.showPicker?.())
                    }
                }}
                inputProps={{
                    onKeyDown: (e) => e.preventDefault() // ⛔ Blockiere manuelle Eingabe
                }}
            />

            <TextField
                label="Endzeit"
                name="endTime"
                type="datetime-local"
                value={formatDatetimeLocal(reservation.endTime)}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                inputRef={(ref) => {
                    if (ref) {
                        ref.addEventListener('click', () => ref.showPicker?.())
                    }
                }}
                inputProps={{
                    onKeyDown: (e) => e.preventDefault()
                }}
            />

            <Button type="submit" variant="contained">Speichern</Button>
            <Button onClick={handleCancel} variant="text" sx={{ ml: 2 }}>
                Abbrechen
            </Button>
        </Box>
    )
}
