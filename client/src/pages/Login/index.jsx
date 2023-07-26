import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useFormik } from 'formik';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import getImg from '../../cloudinary';
import validationSchema from './validation';
import {
  StyledTypography,
  StyledForm,
  StyledInputBaseLogin,
  StyledButton,
  StyleAdvancedImage,
} from '../../themes/themeOrder';
import { login } from '../../redux/slices/loginSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      loginOrEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ loginOrEmail, password }) => {
      dispatch(login({ loginOrEmail, password }));
      navigate('/');
    },
  });

  return (
    <Container
      component="div"
      sx={{
        height: '780px',
        display: 'flex',
        padding: '130px 10px 30px 10px!important',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <StyleAdvancedImage
        cldImg={getImg.image('login/gktl6heq6nphhxarlga5.png')}
        alt="loginImage"
      />
      <form
        onSubmit={formik.handleSubmit}
        style={{
          padding: '8% 0',
          height: 600,
          margin: 'auto',
          maxWidth: 400,
        }}>
        <Container
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 50,
          }}>
          <StyledTypography
            component="h5"
            variant="h5"
            sx={{ paddingLeft: '0!important' }}>
            Login
          </StyledTypography>
        </Container>
        <Container>
          <StyledForm>
            <StyledInputBaseLogin
              type="text"
              id="loginOrEmail"
              name="loginOrEmail"
              onBlur={formik.handleBlur}
              value={formik.values.loginOrEmail}
              onChange={formik.handleChange}
              startAdornment={
                <InputAdornment position="end">
                  <PersonIcon style={{ paddingRight: 5, cursor: 'pointer' }} />
                </InputAdornment>
              }
            />
            {formik.touched.loginOrEmail && formik.errors.loginOrEmail ? (
              <StyledTypography variant="paragraph" component="p">
                {formik.errors.loginOrEmail}
              </StyledTypography>
            ) : (
              <StyledTypography variant="paragraph" component="p">
                {' '}
              </StyledTypography>
            )}
          </StyledForm>
          <StyledForm>
            <StyledInputBaseLogin
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              startAdornment={
                <InputAdornment position="end">
                  {showPassword ? (
                    <LockOpenIcon
                      style={{ paddingRight: 5, cursor: 'pointer' }}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <LockIcon
                      style={{ paddingRight: 5, cursor: 'pointer' }}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <StyledTypography variant="paragraph" component="p">
                {formik.errors.password}
              </StyledTypography>
            ) : (
              <StyledTypography variant="paragraph" component="p">
                {' '}
              </StyledTypography>
            )}
          </StyledForm>
        </Container>
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
          sx={{ width: '80%' }}>
          Login
        </StyledButton>
        <Container sx={{ textAlign: 'center' }}>
          Don&apos;t have an account yet?{' '}
          <Link to="/registration">Register Now</Link>
        </Container>
      </form>
    </Container>
  );
}

export default Login;
