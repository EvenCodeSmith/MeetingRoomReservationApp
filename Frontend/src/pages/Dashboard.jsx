// 📦 React-Hooks und UI-Komponenten importieren
import { useEffect, useState, useCallback } from 'react'
import { useSnackbar } from 'notistack'
import { getRooms } from '../api/meetingRooms'
import { getReservations } from '../api/reservations'
import { Typography, Card, CardContent, Box, Grid, Chip } from '@mui/material'

// 📊 Dashboard-Komponente zeigt Statistiken und Raumstatus
export default function Dashboard() {
    // 📈 Zustände für Anzahl Räume, Reservierungen und Raumstatus
    const [roomCount, setRoomCount] = useState(0)
    const [reservationCount, setReservationCount] = useState(0)
    const [todayCount, setTodayCount] = useState(0)
    const [roomStatuses, setRoomStatuses] = useState([])
    const { enqueueSnackbar } = useSnackbar()

    // ⏱️ Helferfunktion zum Formatieren einer Zeitdauer in "1h 30min"
    const formatDuration = (ms) => {
        const totalMinutes = Math.ceil(ms / (60 * 1000))
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        if (hours > 0 && minutes > 0) return `${hours}h ${minutes}min`
        if (hours > 0) return `${hours}h`
        return `${minutes}min`
    }

    // 📥 Lade Daten für Räume und Reservierungen
    const loadData = useCallback(async () => {
        try {
            const rooms = await getRooms()
            const reservations = await getReservations()

            // 📌 Anzahl Räume & Reservierungen setzen
            setRoomCount(rooms.length)
            setReservationCount(reservations.length)

            const now = new Date()

            // 📅 Wie viele Reservierungen gerade aktiv sind
            const countToday = reservations.filter(r => {
                const start = new Date(r.startTime || r.start)
                const end = new Date(r.endTime || r.end)
                return start <= now && end >= now
            }).length

            setTodayCount(countToday)

            // 🔍 Raumstatus berechnen (belegt, bald reserviert, frei)
            const statuses = rooms.map(room => {
                const roomReservations = reservations.filter(r => r.roomId === room.id)

                // Aktive Reservierung?
                const active = roomReservations.find(r => {
                    const start = new Date(r.startTime || r.start)
                    const end = new Date(r.endTime || r.end)
                    return start <= now && end >= now
                })

                if (active) {
                    const end = new Date(active.endTime || active.end)
                    const remaining = end - now
                    return {
                        room,
                        status: `Belegt – noch ${formatDuration(remaining)}`,
                        color: 'error'
                    }
                }

                // 📅 Nächste zukünftige Reservierung?
                const upcoming = roomReservations
                    .map(r => new Date(r.startTime || r.start))
                    .filter(start => start > now)
                    .sort((a, b) => a - b)[0]

                if (upcoming) {
                    const until = upcoming - now
                    return {
                        room,
                        status: `Reserviert in ${formatDuration(until)}`,
                        color: 'warning'
                    }
                }

                // ✅ Kein aktiver oder bevorstehender Termin
                return {
                    room,
                    status: 'Frei – keine Reservierung offen',
                    color: 'success'
                }
            })

            setRoomStatuses(statuses)

        } catch (error) {
            enqueueSnackbar('Fehler beim Laden des Dashboards', { variant: 'error' })
            console.error('Dashboard load error:', error)
        }
    }, [enqueueSnackbar])

    // 📦 Lade Daten beim ersten Rendern
    useEffect(() => {
        loadData()
    }, [loadData])

    // 🖼️ Rückgabe des Dashboards
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Dashboard</Typography>

            {/* 📊 Übersichtliche Statistiken */}
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {[
                    { title: 'Anzahl Räume', value: roomCount },
                    { title: 'Reservierungen gesamt', value: reservationCount },
                    { title: 'Reservierungen heute aktiv', value: todayCount }
                ].map((stat, i) => (
                    <Grid key={i}>
                        <Card sx={{ minWidth: 220, px: 2, py: 1 }}>
                            <CardContent>
                                <Typography variant="h6">{stat.title}</Typography>
                                <Typography variant="h4" sx={{ mt: 1 }}>{stat.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* 🏷️ Raumstatus-Anzeige */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Raumstatus</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {roomStatuses.map(({ room, status, color }) => (
                        <Grid key={room.id} item>
                            <Card sx={{ minWidth: 200 }}>
                                <CardContent>
                                    <Typography variant="h6">{room.name}</Typography>
                                    <Chip label={status} color={color} sx={{ mt: 1 }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}