import { createTheme } from '@mui/material/styles'
// 🎨 Funktion von MUI, um ein individuelles Theme zu erstellen

// 🌈 Theme-Konfiguration
const theme = createTheme({
    palette: {
        mode: 'light', // 💡 Setzt das Farb-Schema auf "hell" (statt "dark")

        primary: {
            main: '#1976d2' // 🎯 Hauptfarbe: Blau (zb Buttons, AppBar)
        },

        secondary: {
            main: '#f50057' // 💖 Sekundärfarbe: Pink (zb Akzente, Chips)
        }
    },

    typography: {
        fontFamily: 'Roboto, sans-serif' // ✍️ Standardschriftart für die ganze App
    }
})

export default theme
// 🚀 Exportiert das Theme zur Verwendung in ThemeProvider (siehe main.jsx)
