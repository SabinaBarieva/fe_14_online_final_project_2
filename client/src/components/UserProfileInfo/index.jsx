import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Divider, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { userData } from '../../redux/selectors'; ??? useSelector не читає userData
import { useFormik } from 'formik';
import {
  DataBoxes,
  BoxUserData,
  BoxTitle,
  Buttons,
} from '../../themes/themeUserProfileInfo';
import { logout } from '../../redux/slices/loginSlice';
import { updateCustomer } from '../../api/customer';
import { fetchUserInfo } from '../../redux/slices/userSlice';
import validationSchema from './validation';

function UserProfileInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.user);

  const [editMode, setEditMode] = useState(false);
  const handleCancel = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  const initialValues = {
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
    email: dataUser.email,
    telephone: dataUser.telephone,
    login: dataUser.login,
  };

  const onSubmit = (values) => {
    updateCustomer(values);
    setEditMode(false);
    dispatch(fetchUserInfo());
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
              <BoxUserData>{formik.values.firstName}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>Surname:</BoxTitle>
              <BoxUserData>{formik.values.lastName}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>E-mail:</BoxTitle>
              <BoxUserData>{formik.values.email}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>Phone number:</BoxTitle>
              <BoxUserData>{formik.values.telephone}</BoxUserData>
            </DataBoxes>
            <DataBoxes>
              <BoxTitle>Login:</BoxTitle>
              <BoxUserData>{formik.values.login}</BoxUserData>
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
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ margin: '10px 20px' }}>
            <TextField
              label="First name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={formik.touched.lastName && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Phone"
              name="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={
                formik.touched.telephone && Boolean(formik.errors.telephone)
              }
              helperText={formik.touched.telephone && formik.errors.telephone}
            />
            <TextField
              label="Login"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              variant="outlined"
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default UserProfileInfo;
