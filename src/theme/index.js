import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Professional blue for scheduling
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4caf50', // Success green for confirmations
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: {
            xs: '0 16px',
            sm: '0 24px',
            md: '0 40px',
          },
        },
      },
    },
  },
}); 