import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useFormik } from 'formik';
import validationSchema from './validation';
import {
  StyledTypography,
  StyledForm,
  StyledInputBase,
  StyledButton,
} from '../../themes/themeOrder';
import { login } from '../../redux/slices/loginSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formLoginRef = useRef(null);

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
    <form
      ref={formLoginRef}
      onSubmit={formik.handleSubmit}
      style={{
        padding: '10px 0',
        top: '10%',
        margin: 'auto',
        borderRadius: 7,
        width: '100%',
      }}>
      <Container
        component="div"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 50,
          padding: '0',
        }}>
        <StyledTypography component="h5" variant="h5">
          Login
        </StyledTypography>
      </Container>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 50,
          padding: '0',
        }}>
        <StyledForm style={{ maxWidth: '100%' }}>
          <StyledInputBase
            style={{ margin: '0', width: '100%' }}
            type="text"
            id="loginOrEmail"
            name="loginOrEmail"
            placeholder="Login"
            onBlur={formik.handleBlur}
            value={formik.values.loginOrEmail}
            onChange={formik.handleChange}
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
        <StyledForm style={{ maxWidth: '100%' }}>
          <StyledInputBase
            style={{ margin: '0', width: '100%' }}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOff
                    style={{ paddingRight: 5, cursor: 'pointer' }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Visibility
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
        style={{ width: '100%', margin: '0' }}
        variant="contained"
        color="primary"
        disableElevation
        type="submit">
        Login
      </StyledButton>
    </form>
  );
}

export default Login;
