import { useEffect, useState, useCallback } from 'react'
import { useSnackbar } from 'notistack'
import { getRooms } from '../api/meetingRooms'
import {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
} from '../api/reservations'
import ReservationForm from '../components/ReservationForm'
import ReservationCalendar from '../components/ReservationCalendar'
import {
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material'

export default function Reservations() {
    const [rooms, setRooms] = useState([])
    const [reservations, setReservations] = useState([])
    const [editingReservation, setEditingReservation] = useState(null)
    const { enqueueSnackbar } = useSnackbar()

    const loadRooms = useCallback(async () => {
        try {
            const data = await getRooms()
            setRooms(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Räume', { variant: 'error' })
        }
    }, [enqueueSnackbar])

    const loadReservations = useCallback(async () => {
        try {
            const data = await getReservations()
            setReservations(data)
        } catch {
            enqueueSnackbar('Fehler beim Laden der Reservierungen', { variant: 'error' })
        }
    }, [enqueueSnackbar])

    useEffect(() => {
        loadRooms()
        loadReservations()
    }, [loadRooms, loadReservations])

    const handleSave = async (res) => {
        try {
            if (editingReservation) {
                await updateReservation(editingReservation.id, res)
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

    const getRoomName = (roomId) => {
        const room = rooms.find((r) => r.id === roomId)
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

            <ReservationCalendar reservations={reservations} rooms={rooms} />
        </div>
    )
}