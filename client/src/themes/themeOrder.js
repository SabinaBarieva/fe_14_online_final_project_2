import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#211F1C',
    },
    secondary: {
      main: '#C4C4C4',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          gap: 5,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          margin: 5,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          margin: 5,
          width: '90%',
          boxSizing: 'border-box',
          border: 'none',
        },
        input: {
          padding: '5!important',
          '&::placeholder': {
            opacity: 0.5,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
          fontSize: '1.2rem',
          fontWeight: 400,
          lineHeight: '1.5rem',
          width: 130,
          height: 50,
          margin: '10px auto',
          padding: '13px 18px',
        },
        contained: {
          borderRadius: 50,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 'auto',
          margin: 'auto',
          position: 'relative!important',
          height: '35%',
          minWidth: 280,
          width: '50%',
          maxWidth: 500,
          padding: 10,
          lineHeight: 1.5,
          borderRadius: 20,
          boxShadow: '0 0 30px 6px #42445a',
          textAlign: 'center',
        },
        backdrop: {
          backgroundColor: 'white',
          borderRadius: 20,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: 'center',
        },
        paragraph: {
          margin: 0,
          fontSize: '0.6rem',
          color: 'red',
          height: 12,
        },
        h6: {
          margin: '10px auto',
        },
        h5: {
          margin: '10px auto',
          color: '#334756',
          fontFamily: 'Lato',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: '132%',
          letterSpacing: '0.015em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          outline: 'none',
          minHeight: 40,
          borderRadius: 50,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          gap: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          height: 30,
          width: 30,
          margin: 5,
          borderRadius: '20%',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          maxWidth: 250,
          paddingLeft: 10,
          borderRadius: 20,
          minWidth: 50,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: 230,
        },
      },
    },
  },
});
console.log(theme);
export default theme;
