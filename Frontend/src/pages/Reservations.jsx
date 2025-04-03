import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { getRooms } from '../api/meetingRooms'
import {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
} from '../api/reservations'
import ReservationForm from '../components/ReservationForm'
import {
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material'
import ReservationCalendar from '../components/ReservationCalendar'

export default function Reservations() {
    const [rooms, setRooms] = useState([])
    const [reservations, setReservations] = useState([])
    const [editingReservation, setEditingReservation] = useState(null)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        loadRooms()
        loadReservations()
    }, [])

    const loadRooms = async () => {
        try {
            const data = await getRooms()
            setRooms(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Räume', { variant: 'error' })
        }
    }

    const loadReservations = async () => {
        try {
            const data = await getReservations()
            setReservations(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Reservierungen', { variant: 'error' })
        }
    }

    const handleSave = async (res) => {
        try {
            if (editingReservation) {
                await updateReservation(editingReservation._id, res)
                enqueueSnackbar('Reservierung aktualisiert', { variant: 'success' })
            } else {
                await createReservation(res)
                enqueueSnackbar('Reservierung erstellt', { variant: 'success' })
            }
            setEditingReservation(null)
            loadReservations()
        } catch {
            enqueueSnackbar('Fehler beim Speichern der Reservierung', { variant: 'error' })
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteReservation(id)
            enqueueSnackbar('Reservierung gelöscht', { variant: 'info' })
            loadReservations()
        } catch {
            enqueueSnackbar('Fehler beim Löschen der Reservierung', { variant: 'error' })
        }
    }

    const getRoomName = (roomId) => {
        const room = rooms.find((r) => r._id === roomId)
        return room?.name || 'Unbekannt'
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>Reservierungen</Typography>

            <ReservationForm
                rooms={rooms}
                reservations={reservations}
                onSave={handleSave}
                currentReservation={editingReservation}
                onCancel={() => setEditingReservation(null)}
            />

            {reservations.map((r) => (
                <Card key={r._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{getRoomName(r.roomId)}</Typography>
                        <Typography>Reserviert von: {r.reserver}</Typography>
                        <Typography>Zweck: {r.purpose}</Typography>
                        <Typography>Von: {new Date(r.start).toLocaleString()}</Typography>
                        <Typography>Bis: {new Date(r.end).toLocaleString()}</Typography>
                        <Button onClick={() => setEditingReservation(r)} sx={{ mr: 1 }}>Bearbeiten</Button>
                        <Button color="error" onClick={() => handleDelete(r._id)}>Löschen</Button>
                    </CardContent>
                </Card>
            ))}

            <ReservationCalendar reservations={reservations} rooms={rooms} />
        </div>
    )
}
