import { Container } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Main({ children }) {
  return (
    <Container maxWidth="xl" sx={{ margin: '5%', padding: '2%' }}>
      {children}
    </Container>
  );
}

export default Main;

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
