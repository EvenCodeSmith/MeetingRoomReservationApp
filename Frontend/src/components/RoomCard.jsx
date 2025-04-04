// 📦 Importiere Material UI-Komponenten für die Darstellung der Raumkarte
import { Card, CardContent, Typography, Button } from '@mui/material'

// 🧾 Komponente zur Anzeige eines einzelnen Raums mit Bearbeiten- und Löschen-Buttons
export default function RoomCard({ room, onEdit, onDelete }) {
    return (
        // 🃏 Material-UI Card-Komponente mit etwas Abstand unten
        <Card sx={{ mb: 2 }}>
            <CardContent>
                {/* 🏷️ Raumname in größerer Schrift */}
                <Typography variant="h6">{room.name}</Typography>

                {/* 👥 Anzeige der Raumkapazität */}
                <Typography>Kapazität: {room.capacity}</Typography>

                {/* 🛠️ Anzeige der Ausstattung oder 'Keine', falls leer */}
                <Typography>
                    Ausstattung:{' '}
                    {room.equipment && room.equipment.length > 0
                        ? room.equipment.join(', ') // z.B. "Beamer, Whiteboard"
                        : 'Keine'}
                </Typography>

                {/* ✏️ Bearbeiten-Button mit Callback-Funktion */}
                <Button
                    variant="outlined"
                    onClick={() => onEdit(room)}
                    sx={{ mr: 1 }}
                >
                    Bearbeiten
                </Button>

                {/* 🗑️ Löschen-Button in roter Farbe */}
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(room.id)}
                >
                    Löschen
                </Button>
            </CardContent>
        </Card>
    )
}