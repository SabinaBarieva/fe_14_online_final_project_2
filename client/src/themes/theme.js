import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#393D45',
    },
    secondary: {
      main: '#C4C4C4',
    },
  },
  breakpoints: {
    values: {
      xs: 320,
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: 5,
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
          padding: 10,
          '&::placeholder': {
            opacity: 0.5,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: 115,
          height: 50,
          margin: '10px auto',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 'auto',
          margin: '20%',
          position: 'relative',
          height: '35%',
          minWidth: '300px',
          width: '40%',
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
          margin: 15,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'wrap',
          textOverflow: 'ellipsis',
        },
        paragraph: {
          margin: 0,
          fontSize: '0.6rem',
          color: 'red',
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
          height: '30px',
          width: '30px',
          margin: '5px',
          borderRadius: '20%',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          maxWidth: 250,
          padding: 10,
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

export default theme;
