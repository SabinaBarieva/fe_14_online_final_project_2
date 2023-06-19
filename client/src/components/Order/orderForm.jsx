import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatternFormat } from 'react-number-format';
import { useFormik } from 'formik';
import {
  TextField,
  FormControl,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import validationSchema from './validation';
import { orderBasket } from '../../redux/slices/reducersModal';
import { closeForm, openApp } from '../../redux/slices/reducersForm';

export default function OrderForm() {
  const dispatch = useDispatch();
  const isOpenForm = useSelector((state) => state.toolkitForm.statusForm);
  const formRef = useRef(null);

  const closed = () => {
    dispatch(openApp());
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closed();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(closeForm());
      dispatch(orderBasket(values));
    },
  });

  return (
    isOpenForm && (
      <form
        ref={formRef}
        onSubmit={formik.handleSubmit}
        style={{
          margin: 'auto',
          position: 'relative',
          borderRadius: 20,
          maxWidth: 600,
          boxShadow: '0 0 30px 6px #42445a',
        }}
      >
        <Container
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 50,
          }}
        >
          <Typography component="h5" variant="h5">
            Order
          </Typography>
          <IconButton onClick={closed}>
            <Close />
          </IconButton>
        </Container>
        <FormControl>
          <Container
            component="div"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            <Container component="div" style={{ maxWidth: 300, padding: 0 }}>
              <Container component="div">
                <TextField
                  variant="outlined"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="FirstName"
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Typography variant="paragraph" component="p">
                    {formik.errors.firstName}
                  </Typography>
                ) : <Typography variant="paragraph" component="p"> </Typography>}
              </Container>
              <Container component="div">
                <TextField
                  variant="outlined"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="LastName"
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <Typography variant="paragraph" component="p">
                    {formik.errors.lastName}
                  </Typography>
                ) : <Typography variant="paragraph" component="p"> </Typography>}
              </Container>
              <Container component="div" style={{ padding: '10px 30px' }}>
                <PatternFormat
                  variant="outlined"
                  style={{
                    border: 'none',
                    minHeight: 50,
                    padding: '0 15px',
                    borderRadius: 50,
                  }}
                  format="+# (###) #### ###"
                  allowEmptyFormatting
                  mask="_"
                  id="phone"
                  name="phone"
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <Typography variant="paragraph" component="p">
                    {formik.errors.phone}
                  </Typography>
                ) : <Typography variant="paragraph" component="p"> </Typography>}
              </Container>
            </Container>

            <Grid
              container
              spacing={2}
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.main,
              }}
            >
              <Typography variant="h6">
                Card for payment
              </Typography>
              <Grid item xs={12}>
                <PatternFormat
                  style={{
                    marginBottom: 5,
                    width: 160,
                    border: 'none',
                    minHeight: 40,
                    padding: '0 20px',
                    borderRadius: 50,
                  }}
                  variant="outlined"
                  label="Card Number"
                  placeholder="#### #### #### ####"
                  format="#### #### #### ####"
                  id="cardNumber"
                  name="cardNumber"
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <Typography variant="paragraph" component="p">
                    {formik.errors.cardNumber}
                  </Typography>
                ) : <Typography variant="paragraph" component="p"> </Typography>}
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={2} style={{ paddingLeft: '0' }}>
                  <PatternFormat
                    style={{
                      margin: '0 7px 5px 7px',
                      width: 50,
                      border: 'none',
                      minHeight: 40,
                      padding: '0 20px',
                      borderRadius: 50,
                    }}
                    variant="outlined"
                    label="Expiration Month"
                    placeholder="MM"
                    format="##"
                    id="expirationMonth"
                    name="expirationMonth"
                    onBlur={formik.handleBlur}
                    value={formik.values.expirationMonth}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.expirationMonth && formik.errors.expirationMonth ? (
                    <Typography variant="paragraph" component="p" style={{ height: 40 }}>
                      {formik.errors.expirationMonth}
                    </Typography>
                  ) : <Typography variant="paragraph" component="p" style={{ height: 40 }}> </Typography>}
                </Grid>
                <Grid item xs={2} style={{ paddingLeft: '0' }}>
                  <PatternFormat
                    style={{
                      marginBottom: 5,
                      width: 50,
                      border: 'none',
                      minHeight: 40,
                      padding: '0 20px',
                      borderRadius: 50,
                    }}
                    variant="outlined"
                    label="Expiration Year"
                    placeholder="YY"
                    format="##"
                    id="expirationYear"
                    name="expirationYear"
                    onBlur={formik.handleBlur}
                    value={formik.values.expirationYear}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.expirationYear && formik.errors.expirationYear ? (
                    <Typography variant="paragraph" component="p" style={{ height: 40 }}>
                      {formik.errors.expirationYear}
                    </Typography>
                  ) : <Typography variant="paragraph" component="p" style={{ height: 40 }}> </Typography>}
                </Grid>
                <Grid item xs={6} style={{ paddingLeft: '0' }}>
                  <PatternFormat
                    style={{
                      marginBottom: 5,
                      width: 65,
                      border: 'none',
                      minHeight: 40,
                      padding: '0 20px',
                      borderRadius: 50,
                    }}
                    variant="outlined"
                    label="CVV"
                    placeholder="CVV"
                    format="###"
                    id="cvv"
                    name="cvv"
                    onBlur={formik.handleBlur}
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.cvv && formik.errors.cvv ? (
                    <Typography variant="paragraph" component="p" style={{ height: 40 }}>
                      {formik.errors.cvv}
                    </Typography>
                  ) : <Typography variant="paragraph" component="p" style={{ height: 40 }}> </Typography>}
                </Grid>
              </Grid>
            </Grid>
            <Container component="div">
              <TextField
                variant="outlined"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                style={{ width: '100%' }}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography variant="paragraph" component="p">
                  {formik.errors.email}
                </Typography>
              ) : <Typography variant="paragraph" component="p"> </Typography>}
            </Container>
            <Container component="div">
              <TextField
                variant="outlined"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                style={{ width: '100%' }}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address ? (
                <Typography variant="paragraph" component="p">
                  {formik.errors.address}
                </Typography>
              ) : <Typography variant="paragraph" component="p"> </Typography>}
            </Container>
          </Container>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
          >
            Order
          </Button>
        </FormControl>
      </form>
    )
  );
}
