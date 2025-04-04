// 🔁 React-Hooks für State und Lifecycle
import { useEffect, useState, useCallback } from 'react'
// 🔔 Snackbar für Benachrichtigungen
import { useSnackbar } from 'notistack'
// 🔧 API-Methoden für Raumverwaltung
import { getRooms, createRoom, updateRoom, deleteRoom } from '../api/meetingRooms'
// 📦 Komponenten für Raumkarte und Formular
import RoomCard from '../components/RoomCard'
import RoomForm from '../components/RoomForm'
// 💄 UI-Komponenten
import { Typography } from '@mui/material'

// 🏠 Hauptkomponente zur Verwaltung von Besprechungsräumen
export default function Rooms() {
    const [rooms, setRooms] = useState([])                // Liste aller Räume
    const [editingRoom, setEditingRoom] = useState(null)  // Raum, der gerade bearbeitet wird
    const { enqueueSnackbar } = useSnackbar()             // Für Erfolg/Fehler-Meldungen

    // 🔄 Räume vom Backend laden
    const loadRooms = useCallback(async () => {
        try {
            const data = await getRooms()
            setRooms(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Räume', { variant: 'error' })
        }
    }, [enqueueSnackbar]) // 📌 useCallback verhindert unnötige Re-Renders

    // 📥 Räume beim ersten Rendern laden
    useEffect(() => {
        loadRooms()
    }, [loadRooms])

    // 💾 Raum speichern (neu oder bearbeiten)
    const handleSave = async (room) => {
        try {
            if (editingRoom) {
                // 📝 Bearbeiten-Modus
                await updateRoom(editingRoom.id, room)
                enqueueSnackbar('Raum aktualisiert', { variant: 'success' })
            } else {
                // ➕ Neuer Raum
                await createRoom(room)
                enqueueSnackbar('Raum erstellt', { variant: 'success' })
            }
            setEditingRoom(null) // 🧹 Reset des Formulars
            loadRooms()          // 🔁 Aktualisiere die Liste
        } catch {
            enqueueSnackbar('Fehler beim Speichern des Raums', { variant: 'error' })
        }
    }

    // 🗑️ Raum löschen
    const handleDelete = async (id) => {
        try {
            await deleteRoom(id)
            enqueueSnackbar('Raum gelöscht', { variant: 'info' })
            loadRooms()
        } catch {
            enqueueSnackbar('Fehler beim Löschen des Raums', { variant: 'error' })
        }
    }

    // 🧱 JSX Struktur der Seite
    return (
        <div>
            {/* 🧾 Titel */}
            <Typography variant="h4" sx={{ mb: 2 }}>
                Besprechungsräume
            </Typography>

            {/* 📝 Formular zum Hinzufügen oder Bearbeiten */}
            <RoomForm
                onSave={handleSave}
                currentRoom={editingRoom}
                onCancel={() => setEditingRoom(null)}
            />

            {/* 🔁 Alle Räume anzeigen */}
            {rooms.map((room) => (
                <RoomCard
                    key={room.id}
                    room={room}
                    onEdit={setEditingRoom}      // 👉 Gibt Raum ins Formular zurück
                    onDelete={handleDelete}      // 🗑️ Raum löschen
                />
            ))}
        </div>
    )
}