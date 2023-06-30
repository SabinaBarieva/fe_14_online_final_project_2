import {
  Button,
  FormControl,
  IconButton,
  InputBase,
  Grid,
  Typography,
  Modal,
  Container,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledForm = styled(FormControl)({
  gap: 5,
  width: '100%',
});

const StyledButton = styled(Button)({
  '&.MuiButton-root': {
    display: 'block',
    fontFamily: 'Lato',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
    width: 130,
    height: 50,
    margin: '10px auto',
    padding: '13px 18px',
    backgroundColor: '#211F1C',
  },
  '&.MuiButton-contained': {
    borderRadius: 50,
  },
});

const StyledIconButton = styled(IconButton)({
  height: 30,
  width: 30,
  margin: 5,
  borderRadius: '20%',
});

const StyledInputBase = styled(InputBase)({
  margin: 5,
  width: '90%',
  boxSizing: 'border-box',
  border: 'black 1px solid',
  borderRadius: 50,
  minHeight: 40,
  '& .MuiInputBase-input': {
    padding: '10px 15px!important',
    borderRadius: 50,
    '& ::placeholder': {
      opacity: 0.5,
    },
  },
  '& .MuiOutlinedInput-input': {
    outline: 'none',
    minHeight: 40,
    borderRadius: 50,
  },
});

const StyledGrid = styled(Grid)({
  margin: 0,
  maxWidth: 250,
  paddingLeft: 10,
  borderRadius: 20,
  minWidth: 50,
});

const StyledTypography = styled(Typography)({
  textAlign: 'center',
  '&.MuiTypography-paragraph': {
    margin: 0,
    fontSize: '0.6rem',
    color: 'red',
    height: 12,
  },

  '&.MuiTypography-h6': {
    margin: '10px auto',
  },

  '&.MuiTypography-h5': {
    margin: '10px auto',
    color: '#334756',
    fontFamily: 'Lato',
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '132%',
    letterSpacing: '0.015rem',
    textTransform: 'uppercase',
  },
});

const StyledModal = styled(Modal)({
  margin: 'auto',
  height: '35%',
  minWidth: 300,
  width: '50%',
  maxWidth: 500,
  '& .MuiModal-backdrop': {
    backgroundColor: 'white',
    zIndex: -1,
  },
});

const StyledModalContainer = styled(Container)({
  padding: 20,
  lineHeight: 1.5,
  borderRadius: 20,
  boxShadow: '0 0 30px 6px #42445a',
  textAlign: 'center',
});

const StyledFormBackground = styled(Container)({
  backgroundColor: 'white',
  position: 'fixed',
  zIndex: 0,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  overflow: 'scroll',
  height: '100%',
  maxWidth: '100%!Important',
});

export {
  StyledForm,
  StyledButton,
  StyledInputBase,
  StyledIconButton,
  StyledGrid,
  StyledTypography,
  StyledModal,
  StyledModalContainer,
  StyledFormBackground,
};
