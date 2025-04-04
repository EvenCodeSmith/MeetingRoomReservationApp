// 📦 Importiere Axios für HTTP-Anfragen
import axios from 'axios'

// 📍 Importiere die Basis-URL der API aus einer zentralen Konfigurationsdatei
import API_BASE_URL from './apiConfig'

// 🔗 Definiere den vollständigen API-Endpunkt für Reservierungen
const endpoint = `${API_BASE_URL}/reservations`

// 📥 Holt alle Reservierungen von der API
export const getReservations = async () => {
    const res = await axios.get(endpoint) // GET-Anfrage an /reservations
    return res.data // Gibt die Liste der Reservierungen zurück
}

// ➕ Erstellt eine neue Reservierung
export const createReservation = async (reservation) => {
    const res = await axios.post(endpoint, reservation) // POST-Anfrage mit Reservierungsdaten
    return res.data // Gibt die erstellte Reservierung zurück
}

// ✏️ Aktualisiert eine bestehende Reservierung anhand der ID
export const updateReservation = async (id, reservation) => {
    const res = await axios.put(`${endpoint}/${id}`, reservation) // PUT-Anfrage mit ID und neuen Daten
    return res.data // Gibt die aktualisierte Reservierung zurück
}

// 🗑️ Löscht eine Reservierung anhand der ID
export const deleteReservation = async (id) => {
    await axios.delete(`${endpoint}/${id}`) // DELETE-Anfrage an /reservations/:id
    // Keine Rückgabe nötig, wenn erfolgreich
}
