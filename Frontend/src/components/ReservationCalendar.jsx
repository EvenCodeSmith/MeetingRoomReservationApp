// 📦 React Hooks für State-Management
import { useState } from 'react'

// 📅 React Big Calendar & Styles
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// 🗓️ Tools zur Zeitverarbeitung
import { format, parse, startOfWeek, getDay } from 'date-fns'
import deCH from 'date-fns/locale/de'

// 🔔 Snackbar für Benachrichtigungen
import { useSnackbar } from 'notistack'

// 🧩 Material UI für Buttons & Layout
import { Button, ButtonGroup, Box } from '@mui/material'

// 🌍 Lokalisierung für Kalender auf Schweizerdeutsch
const locales = { 'de-CH': deCH }

// 📅 Lokalisierer für date-fns + React Big Calendar
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales
})

// 🔧 Hauptkomponente: Zeigt Kalender mit Reservierungen
export default function ReservationCalendar({ reservations, rooms }) {
    // 🗂 Aktuelle Kalenderansicht (z.B. Woche)
    const [view, setView] = useState('week')

    // 📍 Aktuelles Datum im Kalender
    const [currentDate, setCurrentDate] = useState(new Date())

    // 🏢 Raumfilter (null = alle Räume)
    const [selectedRoomId, setSelectedRoomId] = useState(null)

    // 🔔 Snackbar zum Anzeigen von Infos
    const { enqueueSnackbar } = useSnackbar()

    // 📋 Räume nach Auswahl filtern
    const filteredRooms = selectedRoomId ? rooms.filter(r => r.id === selectedRoomId) : rooms

    // 🏷 Ressourcenliste für parallele Raumansicht (resourceId)
    const resources = filteredRooms.map(r => ({
        resourceId: r.id,
        resourceTitle: r.name
    }))

    // 📅 Events für Kalender vorbereiten
    const events = []

    reservations.forEach(r => {
        const room = rooms.find(x => x.id === r.roomId)
        const title = `${room?.name || 'Raum'} - ${r.purpose}`

        let current = new Date(r.startTime)
        const end = new Date(r.endTime)

        // ⏱ Reservierungen, die über mehrere Tage gehen, in Tagesabschnitte aufteilen
        while (current < end) {
            const nextDay = new Date(current)
            nextDay.setHours(23, 59, 59, 999) // Tagesende

            const segmentEnd = nextDay < end ? nextDay : end

            events.push({
                title,
                start: new Date(current),
                end: new Date(segmentEnd),
                allDay: false,
                id: r.id,
                resourceId: r.roomId
            })

            // 👉 Zum nächsten Tag springen
            current = new Date(segmentEnd)
            current.setHours(0, 0, 0, 0)
            current.setDate(current.getDate() + 1)
        }
    })

    // 🎨 Stil für jedes Event (blauer Balken)
    const eventStyleGetter = () => ({
        style: {
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: '5px',
            paddingLeft: '5px'
        }
    })

    // 🖱 Zeigt Reservierungstitel beim Klick auf Event
    const handleSelectEvent = (event) => {
        enqueueSnackbar(`Reservierung: ${event.title}`, { variant: 'info' })
    }

    return (
        <Box>
            {/* 🔘 Raumfilter-Buttons */}
            <ButtonGroup sx={{ mb: 2 }} variant="outlined">
                <Button
                    onClick={() => setSelectedRoomId(null)}
                    variant={!selectedRoomId ? 'contained' : 'outlined'}
                >
                    Alle Räume
                </Button>
                {rooms.map(room => (
                    <Button
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        variant={selectedRoomId === room.id ? 'contained' : 'outlined'}
                    >
                        {room.name}
                    </Button>
                ))}
            </ButtonGroup>

            {/* 📅 Kalenderanzeige */}
            <div className="custom-calendar" style={{ height: 600 }}>
                <Calendar
                    localizer={localizer}
                    events={events.filter(e =>
                        !selectedRoomId || e.resourceId === selectedRoomId
                    )}
                    resources={resources}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['week', 'day', 'agenda']}
                    step={60}
                    timeslots={1}
                    view={view}
                    onView={setView}
                    date={currentDate}
                    onNavigate={setCurrentDate}
                    culture="de-CH"
                    messages={{
                        week: 'Woche',
                        day: 'Tag',
                        agenda: 'Agenda',
                        today: 'Heute',
                        previous: 'Zurück',
                        next: 'Weiter'
                    }}
                    formats={{
                        timeGutterFormat: 'HH:mm', // 24h Anzeige
                        eventTimeRangeFormat: ({ start, end }) =>
                            `${start.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })} – ${end.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}`
                    }}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </Box>
    )
}
