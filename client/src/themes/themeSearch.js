import { Input, Container, Icon, List } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const animationLeft = keyframes`
0% {
    width: 0;
  }
  100% {
    width: 100%;
  }`;

const animationFadeOut = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }`;

const StyledSearch = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  height: 50,
  '& .MuiInput-root:before': {
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
  '& .MuiInput-root:after': {
    borderBottom: `2px solid ${theme.palette.primary.section}`,
  },
}));

const StyledSearchWrapper = styled(Container)({
  width: 300,
  padding: '0!important',
});

const StyledButtonIcon = styled(Icon)(({ theme }) => ({
  cursor: 'pointer',
  color: `${theme.palette.primary.main}`,
}));

const StyledInput = styled(Input)({
  '&.fade': {
    animation: `${animationLeft} 0.7s linear forwards`,
  },
  '&.fadeOut': {
    animation: `${animationFadeOut} 0.7s linear forwards`,
  },
});

const StyledList = styled(List)(({ theme }) => ({
  width: 300,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 999,
  maxHeight: 350,
  overflow: 'auto',
  '&.MuiList-root::-webkit-scrollbar': {
    width: 10,
  },
  '&.MuiList-root::-webkit-scrollbar-track': {
    background: 'none',
  },
  '&.MuiList-root::-webkit-scrollbar-thumb': {
    background: `${theme.palette.primary.light}`,
    borderRadius: 5,
    width: 10,
  },
  '&.MuiList-root::-webkit-scrollbar-thumb:hover': {
    background: `${theme.palette.primary.main}`,
  },
}));

const StyledListItem = styled(RouterLink)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  textDecoration: 'none',
  padding: '0 10px',
}));

export {
  StyledSearch,
  StyledButtonIcon,
  StyledInput,
  StyledSearchWrapper,
  StyledList,
  StyledListItem,
};
