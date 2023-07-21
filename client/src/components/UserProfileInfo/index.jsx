import React, { useState } from 'react';
import { Typography, Box, Divider, Button, TextField } from '@mui/material';
import {
  DataBoxes,
  DataBoxesBorder,
  BoxUserData,
  BoxTitle,
  Buttons,
} from '../../themes/themeUserProfileInfo.js';

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
    <>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Divider />
      {!editMode && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '90%',
              margin: '25px auto',
            }}>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Name:</BoxTitle>
                <BoxUserData>{user.name}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>E-mail:</BoxTitle>
                <BoxUserData>{user.email}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Phone number:</BoxTitle>
                <BoxUserData>{user.phone}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Address:</BoxTitle>
                <BoxUserData>{user.address}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Card Number:</BoxTitle>
                <BoxUserData>{user.cardNumber}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
          </Box>
          <Buttons variant="outlined" onClick={handleEdit}>
            Edit
          </Buttons>
        </>
      )}
      {editMode && (
        <>
          <Box
            sx={{
              margin: '10px 20px',
            }}>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              value={user.address}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Card Number"
              name="cardNumber"
              value={user.cardNumber}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}>
            <Buttons onClick={handleSave}>Save</Buttons>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default UserProfileInfo;
