import React, { useState, useEffect, useRef } from 'react';
import { Hidden, Button, Container } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Login from '.';
import Registration from '../Registration';
import { StyledFormBackground } from '../../themes/themeOrder';

function LoginButtons() {
  const [openButtons, setOpenButtons] = useState(false);
  const buttonsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (buttonsRef.current && !buttonsRef.current.contains(event.target)) {
      setOpenButtons(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Hidden lgDown>
        <Button
          variant="contained"
          endIcon={<LoginOutlinedIcon />}
          onClick={() => {
            setOpenButtons(true);
          }}
          sx={{
            background: '#211F1C',
            width: '113px',
            height: '40px',
            padding: '0',
            margin: '0',
          }}>
          Login
        </Button>
      </Hidden>
      {openButtons && (
        <StyledFormBackground>
          <Container
            ref={buttonsRef}
            style={{
              padding: '10px 0',
              top: '30%',
              margin: 'auto',
              maxWidth: 350,
              position: 'relative',
            }}>
            <Login /> <span style={{ color: 'black', margin: 10 }}> OR </span>{' '}
            <Registration />
          </Container>
        </StyledFormBackground>
      )}
    </>
  );
}

export default LoginButtons;
