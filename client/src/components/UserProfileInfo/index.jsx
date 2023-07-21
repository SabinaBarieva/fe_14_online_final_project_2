import React, { useState } from 'react';
import { Typography, Box, Divider, Button, TextField } from '@mui/material';

function UserProfileInfo() {
  const initialUser = {
    name: 'John',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City',
    cardNumber: '**** **** **** 1234',
  };

  // State to track the user data in edit mode
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUser);

  // Function to handle user data changes during edit mode
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
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
        <Typography variant="h6" gutterBottom>
          {editMode ? (
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ) : (
            `Name: ${user.name}`
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
            `E-mail: ${user.email}`
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
            `Phone number: ${user.phone}`
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
            `Address: ${user.address}`
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
