// 📦 React und benötigte Hooks importieren
import { useEffect, useState, useCallback } from 'react'
import { useSnackbar } from 'notistack' // Snackbar für Feedback (Erfolg, Fehler)
import { getRooms } from '../api/meetingRooms' // API-Funktion zum Laden der Räume
import {
    getReservations,     // 🗂️ Reservierungen abrufen
    createReservation,   // ➕ Neue Reservierung erstellen
    updateReservation,   // ✏️ Reservierung aktualisieren
    deleteReservation    // 🗑️ Reservierung löschen
} from '../api/reservations'

import ReservationForm from '../components/ReservationForm'         // 📝 Formular zum Erstellen/Bearbeiten
import ReservationCalendar from '../components/ReservationCalendar' // 📅 Kalender zur Anzeige

import {
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material' // Material UI-Komponenten

// 💡 Hauptkomponente für das Reservierungs-Management
export default function Reservations() {
    // 📊 State für Räume, Reservierungen und die aktuell bearbeitete Reservierung
    const [rooms, setRooms] = useState([])
    const [reservations, setReservations] = useState([])
    const [editingReservation, setEditingReservation] = useState(null)
    const { enqueueSnackbar } = useSnackbar()

    // 🔄 Räume laden (nur einmal pro Komponente durch useCallback + useEffect)
    const loadRooms = useCallback(async () => {
        try {
            const data = await getRooms()
            setRooms(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Räume', { variant: 'error' })
        }
    }, [enqueueSnackbar])

    // 🔄 Reservierungen laden
    const loadReservations = useCallback(async () => {
        try {
            const data = await getReservations()
            setReservations(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Reservierungen', { variant: 'error' })
        }
    }, [enqueueSnackbar])

    // ⏱️ Daten laden beim Initialisieren der Komponente
    useEffect(() => {
        loadRooms()
        loadReservations()
    }, [loadRooms, loadReservations])

    // 💾 Neue oder bearbeitete Reservierung speichern
    const handleSave = async (res) => {
        try {
            if (editingReservation) {
                await updateReservation(editingReservation.id, res)
                enqueueSnackbar('Reservierung aktualisiert', { variant: 'success' })
            } else {
                await createReservation(res)
                enqueueSnackbar('Reservierung erstellt', { variant: 'success' })
            }
            setEditingReservation(null) // Zurücksetzen nach dem Speichern
            loadReservations()
        } catch {
            enqueueSnackbar('Fehler beim Speichern der Reservierung', { variant: 'error' })
        }
    }

    // 🗑️ Reservierung löschen
    const handleDelete = async (id) => {
        if (!id) {
            enqueueSnackbar('Fehler: Reservierungs-ID fehlt', { variant: 'error' })
            return
        }

        try {
            await deleteReservation(id)
            enqueueSnackbar('Reservierung gelöscht', { variant: 'info' })
            loadReservations()
        } catch {
            enqueueSnackbar('Fehler beim Löschen der Reservierung', { variant: 'error' })
        }
    }

    // 🔎 Hilfsfunktion: Raumnamen anhand der ID herausfinden
    const getRoomName = (roomId) => {
        const room = rooms.find((r) => r.id === roomId)
        return room?.name || 'Unbekannt'
    }

    // 🧱 Aufbau der Komponente
    return (
        <div>
            {/* 🔠 Titel */}
            <Typography variant="h4" sx={{ mb: 2 }}>Reservierungen</Typography>

            {/* ✍️ Formular zum Erstellen oder Bearbeiten */}
            <ReservationForm
                rooms={rooms}
                reservations={reservations}
                onSave={handleSave}
                currentReservation={editingReservation}
                onCancel={() => setEditingReservation(null)}
            />

            {/* 🧾 Liste aller bestehenden Reservierungen */}
            {reservations.map((r) => (
                <Card key={r.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{getRoomName(r.roomId)}</Typography>
                        <Typography>Reserviert von: {r.reservedBy}</Typography>
                        <Typography>Zweck: {r.purpose}</Typography>
                        <Typography>Von: {new Date(r.startTime).toLocaleString()}</Typography>
                        <Typography>Bis: {new Date(r.endTime).toLocaleString()}</Typography>
                        <Button onClick={() => setEditingReservation(r)} sx={{ mr: 1 }}>Bearbeiten</Button>
                        <Button color="error" onClick={() => handleDelete(r.id)}>Löschen</Button>
                    </CardContent>
                </Card>
            ))}

            {/* 📅 Kalenderansicht aller Reservierungen */}
            <ReservationCalendar reservations={reservations} rooms={rooms} />
        </div>
    )
}