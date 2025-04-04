// 📦 React Hooks und MUI-Komponenten importieren
import { useState, useEffect } from 'react'
import { TextField, Button, MenuItem, Box } from '@mui/material'
import { useSnackbar } from 'notistack' // Snackbar für Benachrichtigungen
import { isValidTimeRange, isOverlapping } from '../utils/validation' // Validierungsfunktionen

// 🧮 Hilfsfunktion zum Formatieren von datetime-local Strings
const formatDatetimeLocal = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const pad = (n) => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// 🧾 Hauptkomponente: Formular zur Erstellung/Bearbeitung einer Reservierung
export default function ReservationForm({ rooms, reservations, onSave, currentReservation, onCancel }) {
    // 📦 Lokaler State für das Reservierungsobjekt
    const [reservation, setReservation] = useState({
        roomId: '',
        reservedBy: '',
        purpose: '',
        startTime: '',
        endTime: ''
    })

    const { enqueueSnackbar } = useSnackbar() // Snackbar zum Anzeigen von Feedback

    // 🔁 Wenn `currentReservation` gesetzt ist, Daten in Formular übernehmen
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

    // 🖊️ Eingaben aktualisieren
    const handleChange = (e) => {
        const { name, value } = e.target
        setReservation({ ...reservation, [name]: value })
    }

    // ✅ Validierung & Übergabe beim Speichern
    const handleSubmit = (e) => {
        e.preventDefault()

        const newStart = new Date(reservation.startTime)
        const newEnd = new Date(reservation.endTime)

        // 🔐 Validierung: Start vor Endzeit?
        if (!isValidTimeRange(newStart, newEnd)) {
            enqueueSnackbar('Startzeit muss vor der Endzeit liegen!', { variant: 'warning' })
            return
        }

        // 🔁 Prüfen auf Überschneidung mit bestehenden Reservierungen (gleicher Raum)
        const relevantReservations = reservations.filter(r =>
            r.roomId === reservation.roomId &&
            (!currentReservation || r.id !== currentReservation.id)
        )

        if (isOverlapping(relevantReservations, newStart, newEnd)) {
            enqueueSnackbar('Reservierung überschneidet sich mit einer bestehenden!', { variant: 'error' })
            return
        }

        // 📤 Reservierung speichern
        onSave(reservation)

        // 🧹 Formular leeren (nur wenn es sich um eine neue Reservierung handelt)
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

    // ⛔ Abbrechen: Formular zurücksetzen
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
            {/* 🔽 Raumauswahl (Dropdown) */}
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

            {/* 🧑 Eingabefeld: Wer reserviert */}
            <TextField
                label="Reserviert von"
                name="reservedBy"
                value={reservation.reservedBy}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            {/* 📝 Zweck der Reservierung */}
            <TextField
                label="Zweck"
                name="purpose"
                value={reservation.purpose}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {/* 📅 Startzeit mit Datums-/Uhrzeitauswahl */}
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
                        ref.addEventListener('click', () => ref.showPicker?.()) // 📆 Öffne Picker beim Klick
                    }
                }}
                inputProps={{
                    onKeyDown: (e) => e.preventDefault() // ⛔ Verhindere manuelle Eingabe
                }}
            />

            {/* 🕒 Endzeit mit Picker */}
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

            {/* 💾 Buttons */}
            <Button type="submit" variant="contained">Speichern</Button>
            <Button onClick={handleCancel} variant="text" sx={{ ml: 2 }}>
                Abbrechen
            </Button>
        </Box>
    )
}