// Importiere die Axios-Bibliothek für HTTP-Anfragen
import axios from 'axios'

// Importiere die Basis-URL für die API aus der Konfigurationsdatei
import API_BASE_URL from './apiConfig'

// Definiere das Endpunkt-Basis-URL für Meetingräume
const endpoint = `${API_BASE_URL}/meetingrooms`

// 📦 Holt alle Meetingräume von der API
export const getRooms = async () => {
    const res = await axios.get(endpoint) // Sende eine GET-Anfrage an /meetingrooms
    return res.data // Gib die empfangenen Raumdaten zurück
}

// ➕ Erstellt einen neuen Meetingraum
export const createRoom = async (room) => {
    const res = await axios.post(endpoint, room) // Sende eine POST-Anfrage mit den Raumdaten
    return res.data // Gib die erstellten Raumdaten zurück
}

// ✏️ Aktualisiert einen bestehenden Meetingraum
export const updateRoom = async (id, room) => {
    const res = await axios.put(`${endpoint}/${id}`, room) // PUT-Anfrage an /meetingrooms/:id mit neuen Daten
    return res.data // Gib die aktualisierten Raumdaten zurück
}

// 🗑️ Löscht einen Meetingraum anhand der ID
export const deleteRoom = async (id) => {
    await axios.delete(`${endpoint}/${id}`) // Sende eine DELETE-Anfrage an /meetingrooms/:id
    // Keine Rückgabe nötig, wenn erfolgreich
}
