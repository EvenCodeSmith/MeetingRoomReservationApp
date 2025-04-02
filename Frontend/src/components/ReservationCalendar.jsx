import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import deCH from 'date-fns/locale/de'

const locales = {
    'de-CH': deCH
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
})

export default function ReservationCalendar({ reservations, rooms }) {
    const events = reservations.map(r => ({
        title: `${rooms.find(x => x._id === r.roomId)?.name || 'Raum'} - ${r.purpose}`,
        start: new Date(r.start),
        end: new Date(r.end),
        allDay: false
    }))

    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                views={['week', 'day', 'agenda']}
                messages={{
                    week: 'Woche', day: 'Tag', agenda: 'Agenda', today: 'Heute', previous: 'Zurück', next: 'Weiter'
                }}
            />
        </div>
    )
}
