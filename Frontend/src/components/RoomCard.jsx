import { Card, CardContent, Typography, Button } from '@mui/material'

export default function RoomCard({ room, onEdit, onDelete }) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{room.name}</Typography>
                <Typography>Kapazität: {room.capacity}</Typography>
                <Typography>
                    Ausstattung:{' '}
                    {room.equipment && room.equipment.length > 0
                        ? room.equipment.join(', ')
                        : 'Keine'}
                </Typography>
                <Button variant="outlined" onClick={() => onEdit(room)} sx={{ mr: 1 }}>
                    Bearbeiten
                </Button>
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