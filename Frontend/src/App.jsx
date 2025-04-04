import { Routes, Route } from 'react-router-dom'
// ⬆️ Routing-Komponenten von React Router

import Rooms from './pages/Rooms'
import Reservations from './pages/Reservations'
import Dashboard from './pages/Dashboard'
// ⬆️ Die Hauptseiten (Pages) deiner Anwendung

import MainLayout from './layouts/MainLayout'
// ⬆️ Das übergeordnete Layout, das zb AppBar und Navigation enthält

function App() {
    return (
        // 🧭 MainLayout wird als Rahmen verwendet – Navigation und Grundstruktur
        <MainLayout>
            {/* Alle Routen innerhalb der App */}
            <Routes>
                {/* Startseite – zeigt das Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Seite für Raumverwaltung */}
                <Route path="/rooms" element={<Rooms />} />

                {/* Seite für Reservierungen */}
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </MainLayout>
    )
}

export default App
