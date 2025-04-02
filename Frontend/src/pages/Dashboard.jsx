import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { getRooms } from '../api/meetingRooms'
import { getReservations } from '../api/reservations'
import { Typography, Card, CardContent, Grid } from '@mui/material'

export default function Dashboard() {
    const [roomCount, setRoomCount] = useState(0)
    const [reservationCount, setReservationCount] = useState(0)
    const [todayCount, setTodayCount] = useState(0)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const rooms = await getRooms()
            const reservations = await getReservations()

            setRoomCount(rooms.length)
            setReservationCount(reservations.length)

            const today = new Date()
            const countToday = reservations.filter(r => {
                const start = new Date(r.start)
                const end = new Date(r.end)
                return start <= today && end >= today
            }).length

            setTodayCount(countToday)
        } catch (error) {
            enqueueSnackbar('Fehler beim Laden des Dashboards', { variant: 'error' })
        }
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card><CardContent><Typography>Anzahl Räume: {roomCount}</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card><CardContent><Typography>Reservierungen gesamt: {reservationCount}</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card><CardContent><Typography>Reservierungen heute aktiv: {todayCount}</Typography></CardContent></Card>
                </Grid>
            </Grid>
        </div>
    )
}