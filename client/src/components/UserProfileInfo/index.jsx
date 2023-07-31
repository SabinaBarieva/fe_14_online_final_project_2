import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Divider, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { userData } from '../../redux/selectors'; ??? useSelector не читає userData
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

  // const handleUserDataChange = (event) => {
  //   const { name, value } = event.target;
  //   setCachedDataOfUser((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSave = () => {
  //   updateCustomer({ login, telephone, email, firstName, lastName });
  //   setEditMode(false);
  // };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  const initialValues = {
    firstName,
    lastName,
    email,
    telephone,
    login,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Min 2 letters required')
      .max(25, 'Max 25 letters allowed')
      .matches(/^[a-zA-Zа-яА-Я]*$/, 'The name must contain only letters')
      .required('This field is required!'),
    lastName: Yup.string()
      .min(2, 'Min 2 letters required')
      .max(25, 'Max 25 letters allowed')
      .matches(/^[a-zA-Zа-яА-Я]*$/, 'The name must contain only letters')
      .required('This field is required!'),
    login: Yup.string()
      .min(4, 'Min 4 letters required')
      .max(10, 'Max 10 letters allowed')
      .matches(
        /^[a-zA-Z0-9]*$/,
        'Login must contain Latin letters and numbers only, without spaces'
      )
      .required('This field is required!'),
    email: Yup.string()
      .email('Invalid email address')
      .min(6, 'Min 6 letters required')
      .max(30, 'Max 30 letters required')
      .required('This field is required!'),
    telephone: Yup.string()
      .matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/, 'Invalid phone number')
      .required('This field is required!'),
  });

  const onSubmit = (values) => {
    console.log(values);
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

// <Formik
//   initialValues={initialValues}
//   validationSchema={validationSchema}
//   onSubmit={() => {
//     console.log('submit');
//   }}>
//   <Form>
//     <Field
//       as={TextField}
//       type="text"
//       name="firstName"
//       label="First name"
//       fullWidth
//       margin="normal"
//     />
//     <ErrorMessage name="firstName" component="div" />
//     <Field
//       as={TextField}
//       type="text"
//       name="lastName"
//       label="Last name"
//       fullWidth
//       margin="normal"
//     />
//     <ErrorMessage name="lastName" component="div" />
//     <Field
//       as={TextField}
//       type="text"
//       name="email"
//       label="Email"
//       fullWidth
//       margin="normal"
//     />
//     <ErrorMessage name="email" component="div" />
//     <Field
//       as={TextField}
//       type="text"
//       name="telephone"
//       label="Phone"
//       fullWidth
//       margin="normal"
//     />
//     <ErrorMessage name="telephone" component="div" />
//     <Field
//       as={TextField}
//       type="text"
//       name="login"
//       label="Login"
//       fullWidth
//       margin="normal"
//     />
//     <ErrorMessage name="login" component="div" />
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-evenly',
//       }}>
//       <Buttons type="submit">Save</Buttons>
//       <Button
//         variant="outlined"
//         color="secondary"
//         onClick={handleCancel}>
//         Cancel
//       </Button>
//     </Box>
//   </Form>
// </Formik>
