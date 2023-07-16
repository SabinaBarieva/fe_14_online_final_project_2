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

const StyledButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    display: 'block',
    fontFamily: `${theme.typography.fontFamily.primary}`,
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
    width: 130,
    height: 50,
    margin: '10px auto',
    padding: '13px 18px',
    backgroundColor: `${theme.palette.primary.dark}`,
  },
  '&.MuiButton-contained': {
    borderRadius: 50,
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
}));

const StyledGrid = styled(Grid)({
  margin: 0,
  maxWidth: 250,
  paddingLeft: 10,
  borderRadius: 20,
  minWidth: 50,
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  '&.MuiTypography-paragraph': {
    margin: 0,
    fontSize: '0.6rem',
    color: `${theme.palette.secondary.main}`,
    height: 12,
  },

  '&.MuiTypography-h6': {
    margin: '10px auto',
  },

  '&.MuiTypography-h5': {
    margin: '10px auto',
    color: `${theme.palette.primary.main}`,
    fontFamily: `${theme.typography.fontFamily.primary}`,
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '132%',
    letterSpacing: '0.015rem',
    textTransform: 'uppercase',
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
  borderRadius: 20,
  boxShadow: `0 0 30px 6px ${theme.palette.primary.header}`,
  textAlign: 'center',
}));

const StyledFormBackground = styled(Container)({
  backgroundColor: 'rgba(128, 128, 128, 0.5)',
  position: 'fixed',
  zIndex: 999,
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
