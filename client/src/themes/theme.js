import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto';
import '@fontsource/lato';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#393D45',
      dark: '#211f1c',
      light: '#616467',
      header: '#484543',
      section: '#FCF9F6',
      buttonhover: 'background: #ACACAC',
    },
    secondary: {
      main: '#ff6565',
      contrastText: '#f5f7fb',
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
      xl: 1366,
      xxl: 1920,
    },
  },
  typography: {
    fontFamily: {
      primary: 'Lato, sans-serif',
      secondary: 'Roboto, sans-serif',
    },
  },
});

export default theme;
