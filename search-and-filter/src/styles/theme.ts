import {createTheme} from '@mui/material';

const theme = createTheme({
  palette: {
    common: {
      black: '#1B2434',
    },

    background: {
      default: '#F7F9FC',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    button: {
      textTransform: 'none',
    },
    subtitle1: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
  },
});

export {theme};
