import { createTheme } from "@mui/material"; 

const theme = createTheme({
    palette: {
        primary: {
            dark: '#4F6D7A',
            main: '#C0D6DF',
            light: '#DBE9EE',
        },
        secondary: {
            main: '#4A6FA5',
            dark: '#166088',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    },
})

export default theme;