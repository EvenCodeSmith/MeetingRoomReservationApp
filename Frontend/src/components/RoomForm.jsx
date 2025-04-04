// 📦 React-Hooks und Material UI Komponenten importieren
import { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

// 🧾 Formular-Komponente zur Erfassung von Raumdaten
export default function RoomForm({ onSave, currentRoom, onCancel }) {
    // 📌 Initialzustand für das Formular (leerer Raum)
    const initialRoom = { name: '', capacity: '', equipment: '' }

    // 🧠 useState Hook für das Formular
    const [room, setRoom] = useState(initialRoom)

    // 🔁 Wenn currentRoom gesetzt wird (zb zum Bearbeiten), lade dessen Daten ins Formular
    useEffect(() => {
        if (currentRoom) {
            setRoom({
                name: currentRoom.name || '',
                capacity: currentRoom.capacity || '',
                equipment: Array.isArray(currentRoom.equipment)
                    ? currentRoom.equipment.join(', ') // Array → String
                    : ''
            })
        } else {
            // 🧹 Zurücksetzen, wenn kein currentRoom ausgewählt ist
            setRoom({ name: '', capacity: '', equipment: '' })
        }
    }, [currentRoom])

    // 🖊️ Änderungen an einem der Eingabefelder ins State übernehmen
    const handleChange = (e) => {
        setRoom(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // ✅ Wenn das Formular abgeschickt wird
    const handleSubmit = (e) => {
        e.preventDefault()

        // 📦 Bereite die Daten im richtigen Format für das Backend auf
        const formattedRoom = {
            name: room.name.trim(),
            capacity: Math.max(1, parseInt(room.capacity)), // Mindestens 1
            equipment: room.equipment
                .split(',')             // Kommagetrennte Liste
                .map(f => f.trim())     // Whitespace entfernen
                .filter(Boolean)        // Leere Einträge entfernen
        }

        onSave(formattedRoom) // ⬆️ Übergabe an Elternkomponente (zb zum Speichern)
        setRoom(initialRoom)  // 🔄 Formular zurücksetzen
    }

    // ❌ Abbrechen: zurücksetzen und Callback aufrufen
    const handleCancel = () => {
        setRoom(initialRoom)
        if (onCancel) onCancel()
    }

    return (
        // 📋 Formular-Wrapper von MUI mit Padding unten
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            {/* 📌 Raumname */}
            <TextField
                label="Raumname"
                name="name"
                value={room.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            {/* 👥 Kapazität mit Eingabe als Zahl */}
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

            {/* 🧰 Ausstattung als kommagetrennte Liste */}
            <TextField
                label="Ausstattung (kommagetrennt)"
                name="equipment"
                value={room.equipment}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {/* 💾 Speichern & ❌ Abbrechen-Buttons */}
            <Button type="submit" variant="contained">Speichern</Button>
            <Button onClick={handleCancel} variant="text" sx={{ ml: 2 }}>
                Abbrechen
            </Button>
        </Box>
    )
}