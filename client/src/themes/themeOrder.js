import { AdvancedImage } from '@cloudinary/react';
import {
  Button,
  FormControl,
  IconButton,
  InputBase,
  Grid,
  Typography,
  Modal,
  Container,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledForm = styled(FormControl)({
  width: '100%',
  alignItems: 'flex-start',
});

const StyledButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
    color: { xs: '#616467', md: '#fff' },
    borderRadius: 7,
    border: '1px solid #211F1C',
    margin: '10px 0',
    display: 'block',
    minHeight: 40,
    width: {
      xs: '5rem',
      sm: '7rem',
      md: '9rem',
    },
    height: {
      xs: '2rem',
      sm: '2.5rem',
      md: '3rem',
    },
  },
}));

const StyledIconButton = styled(IconButton)({
  height: 30,
  width: 30,
  margin: 5,
  borderRadius: '20%',
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  margin: 5,
  width: '90%',
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: 7,
  minHeight: 40,
  '& .MuiInputBase-input': {
    padding: '10px 15px!important',
    borderRadius: 7,
    '& ::placeholder': {
      opacity: 0.5,
    },
  },
  '& .MuiOutlinedInput-input': {
    outline: 'none',
    minHeight: 40,
    borderRadius: 7,
  },
  '& .login': {
    backgroundColor: 'red',
    border: 'none',
  },
}));

const StyledInputBaseLogin = styled(TextField)(({ theme }) => ({
  margin: 5,
  width: '90%',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.secondary.inputBackground,
  minHeight: 40,
  position: 'relative',
  '& .MuiInputBase-root': {
    borderRadius: 7,
  },
  '& .MuiInputBase-input': {
    padding: '12px 15px!important',
  },
  '& .MuiOutlinedInput-input': {
    borderRadius: 7,
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: 0,
  maxWidth: 250,
  paddingLeft: 10,
  borderRadius: 7,
  minWidth: 50,
  [theme.breakpoints.down(330)]: {
    paddingLeft: 0,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  '&.MuiTypography-paragraph': {
    margin: 0,
    fontSize: '0.6rem',
    color: theme.palette.secondary.main,
    height: 12,
  },

  '&.MuiTypography-h6': {
    margin: '10px auto',
  },

  '&.MuiTypography-h5': {
    margin: '10px auto',
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '2rem',
    fontWeight: theme.typography.const.fontWeight.bold,
    lineHeight: '132%',
    letterSpacing: '0.015rem',
    textTransform: 'uppercase',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '1.3rem',
    },
  },
}));

const StyledModal = styled(Modal)({
  margin: 'auto',
  height: '35%',
  minWidth: 300,
  width: '50%',
  maxWidth: 500,
  '& .MuiModal-backdrop': {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    zIndex: -1,
  },
});

const StyledModalContainer = styled(Container)(({ theme }) => ({
  padding: 20,
  backgroundColor: 'white',
  lineHeight: 1.5,
  borderRadius: 7,
  boxShadow: `0 0 30px 6px ${theme.palette.primary.header}`,
  textAlign: 'center',
}));

const StyledFormBackground = styled(Container)({
  backgroundColor: 'rgba(128, 128, 128, 0.5)',
  position: 'fixed',
  zIndex: 1300,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  overflow: 'scroll',
  height: '100%',
  maxWidth: '100%!Important',
});

const StyleAdvancedImage = styled(AdvancedImage)(({ theme }) => ({
  width: 500,
  header: 500,
  margin: '10px',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

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
  StyledInputBaseLogin,
  StyleAdvancedImage,
};
