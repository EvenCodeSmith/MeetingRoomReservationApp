// ✅ Prüft, ob der Startzeitpunkt vor dem Endzeitpunkt liegt
export function isValidTimeRange(start, end) {
    return new Date(start) < new Date(end)
    // Gibt true zurück, wenn start < end – sonst false
}

// ✅ Prüft, ob sich eine neue Reservierung mit bestehenden überschneidet
export function isOverlapping(existingReservations, newStart, newEnd) {
    return existingReservations.some(r => {
        const start = new Date(r.start)
        const end = new Date(r.end)

        return (
            // Fall 1: Neuer Start liegt innerhalb einer bestehenden Reservierung
            (newStart >= start && newStart < end) ||

            // Fall 2: Neues Ende liegt innerhalb einer bestehenden Reservierung
            (newEnd > start && newEnd <= end) ||

            // Fall 3: Neue Reservierung überlappt vollständig eine bestehende
            (newStart <= start && newEnd >= end)
        )
    })
}
