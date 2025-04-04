import { StrictMode } from 'react'
// 🔍 Aktiviert zusätzliche Warnungen und Checks im Entwicklungsmodus

import { createRoot } from 'react-dom/client'
// 📦 Neue API zum Rendern der App in React 18+

import { BrowserRouter } from 'react-router-dom'
// 🧭 Ermöglicht Routing (Navigation) durch die App

import { SnackbarProvider } from 'notistack'
// 🔔 Ermöglicht Snackbars (Benachrichtigungen) mit queue-basiertem System

import { ThemeProvider } from '@mui/material/styles'
// 🎨 Ermöglicht die Anwendung eines globalen MUI-Themes

import CssBaseline from '@mui/material/CssBaseline'
// ✨ Setzt standardisierte CSS-Styles (zb margin/padding-Reset)

import App from './App.jsx'
// 🧠 Der Hauptbestandteil deiner Anwendung – Einstiegspunkt

import theme from './theme'
// 🎨 Eigenes Material-UI Theme (Farben, Schriftarten, etc.)

import './styles/global.css'
// 🌐 Deine globalen CSS-Regeln

// 🎬 Startet und rendert die React-App im HTML-Element mit der ID "root"
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            {/* Standardisiertes CSS-Reset via MUI */}
            <CssBaseline />

            {/* Snackbar-Kontext mit max. 3 gleichzeitigen Nachrichten */}
            <SnackbarProvider maxSnack={3}>

                {/* Ermöglicht Client-Side-Routing (zb /rooms) */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>

            </SnackbarProvider>
        </ThemeProvider>
    </StrictMode>
)
