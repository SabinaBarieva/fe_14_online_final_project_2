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

const StyledSearch = styled(Container)({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  height: 50,
  '& .MuiInput-root:before': {
    borderBottom: '2px solid black',
  },
  '& .MuiInput-root:after': {
    borderBottom: '2px solid white',
  },
});

const StyledSearchWrapper = styled(Container)({
  width: 300,
  padding: '0!important',
});

const StyledButtonIcon = styled(Icon)({
  cursor: 'pointer',
});

const StyledInput = styled(Input)({
  '&.fade': {
    animation: `${animationLeft} 0.7s linear forwards`,
  },
  '&.fadeOut': {
    animation: `${animationFadeOut} 0.7s linear forwards`,
  },
});

const StyledList = styled(List)({
  width: 300,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
});

const StyledListItem = styled(RouterLink)({
  color: 'black',
  textDecoration: 'none',
  padding: '0 10px',
});

export {
  StyledSearch,
  StyledButtonIcon,
  StyledInput,
  StyledSearchWrapper,
  StyledList,
  StyledListItem,
};
