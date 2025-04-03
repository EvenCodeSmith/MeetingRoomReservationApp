import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Räume', path: '/rooms' },
    { label: 'Reservierungen', path: '/reservations' }
]

export default function MainLayout({ children }) {
    const location = useLocation()

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        📅 MeetingPoint
                    </Typography>
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            color="inherit"
                            component={Link}
                            to={item.path}
                            sx={{
                                textDecoration: location.pathname === item.path ? 'underline' : 'none'
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
    )
}
