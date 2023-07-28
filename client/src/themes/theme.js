import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto';
import '@fontsource/lato';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#393D45',
      dark: '#211f1c',
      light: '#616467',
      header: '#484543',
      section: '#FCF9F6',
      buttonhover: '#ACACAC',
    },
    secondary: {
      main: '#ff6565',
      contrastText: '#f5f7fb',
      inputBackground: '#F3F6FF',
      green: '#1b7a0f',
      greenTransparent: '#1b7a0f47',
    },
    text: {
      primary: '#393D45',
      secondary: '#616467',
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1024,
      /* xl: 1366, */
      xl: 1536,
    },
  },
  typography: {
    const: {
      fontWeight: {
        normal: 400,
        bold: 700,
        semibold: 500,
      },
      fontFamily: {
        primary: 'Lato, sans-serif',
        secondary: 'Roboto, sans-serif',
      },
    },
    fontFamily: 'Lato, Arial, Verdana, Tahoma, sans-serif',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default theme;
