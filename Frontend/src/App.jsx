import { Routes, Route } from 'react-router-dom'
import Rooms from './pages/Rooms'
import Reservations from './pages/Reservations'
import Dashboard from './pages/Dashboard'
import MainLayout from './layouts/MainLayout'

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </MainLayout>
    )
}

export default App
