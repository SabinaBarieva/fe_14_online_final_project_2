import React from 'react';
import {
  Avatar,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

function UserProfileInfo() {
  // Здесь вы можете добавить логику для получения данных о пользователе из API или других источников

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, City',
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Divider />

      <Box my={2}>
        <Avatar>{user.name[0]}</Avatar>
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="subtitle1">{user.email}</Typography>
        <Typography variant="body1">{user.address}</Typography>
      </Box>

      {/* Дополнительные сведения о пользователе могут быть отображены здесь */}
    </Box>
  );
}

export default UserProfileInfo;
