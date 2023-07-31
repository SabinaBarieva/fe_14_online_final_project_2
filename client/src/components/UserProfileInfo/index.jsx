import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Divider, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { userData } from '../../redux/selectors'; ??? useSelector не читає userData
import {
  DataBoxes,
  BoxUserData,
  BoxTitle,
  Buttons,
} from '../../themes/themeUserProfileInfo';
import { logout } from '../../redux/slices/loginSlice';
import { updateCustomer } from '../../api/customer';
import { fetchUserInfo } from '../../redux/slices/userSlice';

function UserProfileInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.user);

  const [
    { login, telephone, email, firstName, lastName },
    setCachedDataOfUser,
  ] = useState(dataUser);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, editMode, dataUser]);

  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setCachedDataOfUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateCustomer({ login, telephone, email, firstName, lastName });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        Your Profile
      </Typography>
      <Divider />
      {!editMode && dataUser && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '20px auto',
            }}>
            <DataBoxes>
              <BoxTitle>Name:</BoxTitle>
              <BoxUserData>{firstName}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>Surname:</BoxTitle>
              <BoxUserData>{lastName}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>E-mail:</BoxTitle>
              <BoxUserData>{email}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>Phone number:</BoxTitle>
              <BoxUserData>{telephone}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>Login:</BoxTitle>
              <BoxUserData>{login}</BoxUserData>
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
                dispatch(logout());
                navigate(-1);
              }}>
              Logout
            </Buttons>
          </Box>
        </>
      )}
      {editMode && dataUser && (
        <>
          <Box
            sx={{
              margin: '10px 20px',
            }}>
            <TextField
              label="First name"
              name="firstName"
              value={firstName}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Last name"
              name="lastName"
              value={lastName}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Phone"
              name="telephone"
              value={telephone}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Login"
              name="login"
              value={login}
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
