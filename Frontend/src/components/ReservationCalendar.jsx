import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import deCH from 'date-fns/locale/de'
import { useSnackbar } from 'notistack'
import { Button, ButtonGroup, Box } from '@mui/material'

const locales = {
    'de-CH': deCH
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales
})

export default function ReservationCalendar({ reservations, rooms }) {
    const [view, setView] = useState('week')
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedRoomId, setSelectedRoomId] = useState(null)
    const { enqueueSnackbar } = useSnackbar()

    const filteredRooms = selectedRoomId ? rooms.filter(r => r.id === selectedRoomId) : rooms

    const resources = filteredRooms.map(r => ({
        resourceId: r.id,
        resourceTitle: r.name
    }))

    const events = []

    reservations.forEach(r => {
        const room = rooms.find(x => x.id === r.roomId)
        const title = `${room?.name || 'Raum'} - ${r.purpose}`

        let current = new Date(r.startTime)
        const end = new Date(r.endTime)

        while (current < end) {
            const nextDay = new Date(current)
            nextDay.setHours(23, 59, 59, 999)

            const segmentEnd = nextDay < end ? nextDay : end

            events.push({
                title,
                start: new Date(current),
                end: new Date(segmentEnd),
                allDay: false,
                id: r.id,
                resourceId: r.roomId
            })

            current = new Date(segmentEnd)
            current.setHours(0, 0, 0, 0)
            current.setDate(current.getDate() + 1)
        }
    })

    const eventStyleGetter = () => ({
        style: {
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: '5px',
            paddingLeft: '5px'
        }
    })

    const handleSelectEvent = (event) => {
        enqueueSnackbar(`Reservierung: ${event.title}`, { variant: 'info' })
    }

    return (
        <Box>
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
                        timeGutterFormat: 'HH:mm',
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