import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, InputAdornment } from '@mui/material';
import { Close, VisibilityOff, Visibility } from '@mui/icons-material';
import { useFormik } from 'formik';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import validationSchema from './validation';
import {
  StyledFormBackground,
  StyledTypography,
  StyledIconButton,
  StyledForm,
  StyledInputBase,
  StyledButton,
} from '../../themes/themeOrder';
import { login } from '../../redux/slices/loginSlice';

function Login() {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
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
      setOpenLogin(false);
    },
  });

  const handleClickOutside = (event) => {
    if (formLoginRef.current && !formLoginRef.current.contains(event.target)) {
      setOpenLogin(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button
        variant="contained"
        endIcon={<LoginOutlinedIcon />}
        onClick={() => {
          setOpenLogin(true);
          formik.resetForm();
        }}
        sx={{
          background: '#211F1C',
          width: '113px',
          height: '40px',
          padding: '0',
          margin: '0',
        }}>
        Login
      </Button>
      {openLogin && (
        <StyledFormBackground component="div">
          <form
            ref={formLoginRef}
            onSubmit={formik.handleSubmit}
            style={{
              padding: '10px 0',
              top: '10%',
              margin: 'auto',
              position: 'relative',
              borderRadius: 7,
              maxWidth: 400,
              backgroundColor: 'white',
              boxShadow: '0 0 30px 6px #42445a',
            }}>
            <Container
              component="div"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 50,
              }}>
              <StyledTypography component="h5" variant="h5">
                Login
              </StyledTypography>
              <StyledIconButton onClick={() => setOpenLogin(false)}>
                <Close />
              </StyledIconButton>
            </Container>
            <Container>
              <StyledForm>
                <StyledInputBase
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
              <StyledForm>
                <StyledInputBase
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
              variant="contained"
              color="primary"
              disableElevation
              type="submit">
              Login
            </StyledButton>
          </form>
        </StyledFormBackground>
      )}
    </>
  );
}

export default Login;
