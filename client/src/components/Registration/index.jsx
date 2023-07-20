import React, { useState, useEffect, useRef } from 'react';
import {
  Hidden,
  Button,
  Container,
  InputAdornment,
  FormControlLabel,
  FormControl,
  Checkbox,
} from '@mui/material';
import { Close, VisibilityOff, Visibility } from '@mui/icons-material';
import { useFormik } from 'formik';
import { PatternFormat } from 'react-number-format';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  StyledFormBackground,
  StyledTypography,
  StyledIconButton,
  StyledForm,
  StyledInputBase,
  StyledButton,
} from '../../themes/themeOrder';

function Registration() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const formRegistrationRef = useRef(null);

  const closedLOginForm = () => {
    setOpenRegistration(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      passwordFirst: '',
      passwordSecond: '',
      telephone: '',
      gender: '',
      avatarUrl: '',
    },
    // validationSchema,
    onSubmit: (values) => {
      console.log(values);
      closedLOginForm();
    },
  });

  const handleGenderChange = (event) => {
    formik.setFieldValue('gender', event.target.value);
  };

  const handleFileInputClick = (event) => {
    event.stopPropagation();
  };

  const handleClickOutside = (event) => {
    if (
      formRegistrationRef.current &&
      !formRegistrationRef.current.contains(event.target)
    ) {
      closedLOginForm();
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
      <Hidden lgDown>
        <Button
          variant="contained"
          endIcon={<PersonAddIcon />}
          onClick={() => {
            setOpenRegistration(true);
            formik.resetForm();
          }}
          sx={{
            background: '#211F1C',
            width: '150px',
            height: '40px',
            padding: '0',
            margin: '0',
          }}>
          Registration
        </Button>
      </Hidden>
      {openRegistration && (
        <StyledFormBackground component="div">
          <form
            ref={formRegistrationRef}
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
                Registration
              </StyledTypography>
              <StyledIconButton onClick={closedLOginForm}>
                <Close />
              </StyledIconButton>
            </Container>
            <Container>
              <StyledForm>
                <StyledInputBase
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.firstName}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm>
                <StyledInputBase
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.lastName}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm>
                <StyledInputBase
                  type="text"
                  id="login"
                  name="login"
                  placeholder="Login"
                  onBlur={formik.handleBlur}
                  value={formik.values.login}
                  onChange={formik.handleChange}
                />
                {formik.touched.login && formik.errors.login ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.login}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm>
                <StyledInputBase
                  type={showPasswordFirst ? 'text' : 'password'}
                  id="passwordFirst"
                  name="passwordFirst"
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordFirst}
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      {showPasswordFirst ? (
                        <VisibilityOff
                          style={{ paddingRight: 5, cursor: 'pointer' }}
                          onClick={() => setShowPasswordFirst(false)}
                        />
                      ) : (
                        <Visibility
                          style={{ paddingRight: 5, cursor: 'pointer' }}
                          onClick={() => setShowPasswordFirst(true)}
                        />
                      )}
                    </InputAdornment>
                  }
                />
                {formik.touched.passwordFirst && formik.errors.passwordFirst ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.passwordFirst}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm>
                <StyledInputBase
                  type={showPasswordSecond ? 'text' : 'password'}
                  id="passwordSecond"
                  name="passwordSecond"
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordSecond}
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      {showPasswordSecond ? (
                        <VisibilityOff
                          style={{ paddingRight: 5, cursor: 'pointer' }}
                          onClick={() => setShowPasswordSecond(false)}
                        />
                      ) : (
                        <Visibility
                          style={{ paddingRight: 5, cursor: 'pointer' }}
                          onClick={() => setShowPasswordSecond(true)}
                        />
                      )}
                    </InputAdornment>
                  }
                />
                {formik.touched.passwordSecond &&
                formik.errors.passwordSecond ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.passwordSecond}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm style={{ padding: '10px 5px' }}>
                <PatternFormat
                  style={{
                    width: '95%',
                    border: 'none',
                    minHeight: 45,
                    padding: '0 20px',
                    borderRadius: 7,
                  }}
                  format="+380 (##) ## ## ###"
                  allowEmptyFormatting
                  mask="_"
                  id="phone"
                  name="phone"
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.phone}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm>
                <Container>
                  <StyledTypography
                    component="span"
                    variant="span"
                    style={{ paddingRight: 10 }}>
                    Gender
                  </StyledTypography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.gender === 'Male'}
                        onChange={handleGenderChange}
                        name="gender"
                        value="Male"
                        color="primary"
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.gender === 'Female'}
                        onChange={handleGenderChange}
                        name="gender"
                        value="Female"
                        color="primary"
                      />
                    }
                    label="Female"
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <StyledTypography variant="paragraph" component="p">
                      {formik.errors.gender}
                    </StyledTypography>
                  )}
                </Container>
              </StyledForm>
              <FormControl fullWidth>
                <StyledInputBase
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue(
                      'avatarUrl',
                      event.currentTarget.files[0]
                    );
                  }}
                  onClick={handleFileInputClick}
                  style={{ display: 'none' }}
                  id="image-upload-input"
                />
                <StyledButton variant="contained">Add avatar</StyledButton>
              </FormControl>
              <StyledButton
                variant="contained"
                color="primary"
                disableElevation
                type="submit">
                Registration
              </StyledButton>
            </Container>
          </form>
        </StyledFormBackground>
      )}
    </>
  );
}

export default Registration;
