import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  TextField,
} from '@mui/material';

function UserProfileInfo() {
  const initialUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City',
    cardNumber: '**** **** **** 1234',
    photoUrl: 'https://example.com/user-photo.jpg',
  };

  // State to track the user data in edit mode
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUser);

  // Function to handle user data changes during edit mode
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setUser(initialUser);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Divider />

      <Box my={2}>
        {editMode ? (
          <TextField
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleUserDataChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        ) : (
          <Avatar
            src={
              user.photoUrl
            }>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
        )}
        <Typography variant="h6" gutterBottom>
          {editMode ? (
            <TextField
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ) : (
            `${user.firstName} ${user.lastName}`
          )}
        </Typography>
        <Typography variant="subtitle1">
          {editMode ? (
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ) : (
            user.email
          )}
        </Typography>
        <Typography variant="body1">
          {editMode ? (
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ) : (
            user.phone
          )}
        </Typography>
        <Typography variant="body1">
          {editMode ? (
            <TextField
              label="Address"
              name="address"
              value={user.address}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ) : (
            user.address
          )}
        </Typography>
        <Typography variant="body1">
          {editMode ? (
            <TextField
              label="Card Number"
              name="cardNumber"
              value={user.cardNumber}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ) : (
            `Card Number: ${user.cardNumber}`
          )}
        </Typography>
      </Box>

      {editMode ? (
        <Box>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </Box>
  );
}

export default UserProfileInfo;
