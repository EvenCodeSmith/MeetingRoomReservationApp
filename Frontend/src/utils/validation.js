export function isValidTimeRange(start, end) {
    return new Date(start) < new Date(end)
}

export function isOverlapping(existingReservations, newStart, newEnd) {
    return existingReservations.some(r => {
        const start = new Date(r.start)
        const end = new Date(r.end)

        return (
            (newStart >= start && newStart < end) ||
            (newEnd > start && newEnd <= end) ||
            (newStart <= start && newEnd >= end)
        )
    })
}
