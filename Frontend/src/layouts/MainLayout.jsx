// 📦 Importiere UI-Komponenten von Material UI und Routing-Funktionen
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

// 🧭 Liste aller Navigationspunkte mit Beschriftung und Pfad
const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Räume', path: '/rooms' },
    { label: 'Reservierungen', path: '/reservations' }
]

// 📐 Hauptlayout-Komponente, die die Seitenstruktur mit Navbar definiert
export default function MainLayout({ children }) {
    // 📍 useLocation gibt uns den aktuellen Pfad (für aktive Navigation)
    const location = useLocation()

    return (
        <Box>
            {/* 🔝 Obere Navigationsleiste */}
            <AppBar position="static">
                <Toolbar>
                    {/* 🧭 Titel der App (links) */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        📅 MeetingPoint
                    </Typography>

                    {/* 🔘 Navigationsbuttons rechts */}
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            color="inherit" // Standardfarbe (weiß)
                            component={Link} // Mache Button zum Router-Link
                            to={item.path}
                            sx={{
                                textDecoration: location.pathname === item.path ? 'underline' : 'none' // 🟢 Aktive Seite unterstreichen
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>

            {/* 🧱 Inhalt der jeweiligen Seite (unten unterhalb der Navbar) */}
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        </Box>
    )
}