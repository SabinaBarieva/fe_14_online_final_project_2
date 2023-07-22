import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Divider, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { userData } from '../../redux/selectors'; ??? useSelector не читає userData
import {
  DataBoxes,
  DataBoxesBorder,
  BoxUserData,
  BoxTitle,
  Buttons,
} from '../../themes/themeUserProfileInfo';

function UserProfileInfo() {
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.user.user);

  // State to track the user data in edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to handle user data changes during edit mode
  const handleUserDataChange = (event) => {
    // const { name, value } = event.target;
    // setUser((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    // setUser(initialUser);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Box>
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
              margin: '25px auto',
            }}>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Name:</BoxTitle>
                <BoxUserData>{dataUser.firstName}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Surname:</BoxTitle>
                <BoxUserData>{dataUser.lastName}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>E-mail:</BoxTitle>
                <BoxUserData>{dataUser.email}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Phone number:</BoxTitle>
                <BoxUserData>{dataUser.telephone}</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Address:</BoxTitle>
                <BoxUserData>ЗАГЛУШКА</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
            <DataBoxes>
              <DataBoxesBorder>
                <BoxTitle>Card Number:</BoxTitle>
                <BoxUserData>ЗАГЛУШКА</BoxUserData>
              </DataBoxesBorder>
            </DataBoxes>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Buttons variant="outlined" onClick={handleEdit}>
              Edit
            </Buttons>
            <Buttons
              style={{ backgroundColor: 'white', color: 'black' }}
              variant="outlined"
              onClick={() => {
                alert('Token should be deleted');
                navigate('/');
              }}>
              Logout
            </Buttons>
          </Box>
        </>
      )}
      {editMode && (
        <>
          <Box
            sx={{
              margin: '10px 20px',
            }}>
            <TextField
              label="First name"
              name="firstName"
              value={dataUser.firstName}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Last name"
              name="lastName"
              value={dataUser.lastName}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={dataUser.email}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Phone"
              name="phone"
              value={dataUser.telephone}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              value="ЗАГЛУШКА"
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Card Number"
              name="cardNumber"
              value="ЗАГЛУШКА"
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
    </Box>
  );
}

export default UserProfileInfo;
