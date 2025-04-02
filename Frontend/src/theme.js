import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2' // blau
        },
        secondary: {
            main: '#f50057' // pink
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif'
    }
})

export default theme
