import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatternFormat } from 'react-number-format';
import { useFormik } from 'formik';
import { Container, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Close } from '@mui/icons-material';
import validationSchema from './validation';
import { orderBasket } from '../../redux/slices/modalSlice';
import { openApp } from '../../redux/slices/formSlice';
import {
  StyledForm,
  StyledButton,
  StyledInputBaseLogin,
  StyledIconButton,
  StyledGrid,
  StyledTypography,
  StyledFormBackground,
} from '../../themes/themeOrder';
import { sendOrder, saveOrder } from '../../redux/slices/orderSlice';

export default function OrderForm() {
  const dispatch = useDispatch();
  const itemsBasket = useSelector((state) => state.basket.itemsBasket);
  const isOpenForm = useSelector((state) => state.form.statusForm);
  const formRef = useRef(null);
  const dataUser = useSelector((state) => state.user.user);

  const elem = (values) => {
    const name = `${values.firstName} ${values.lastName}`;
    const phone = values.telephone.replace(/\D/g, '');
    const emailAdress = values.email;
    const bodyMail = `
      <div>
        Thank you for choosing our online store for your recent purchase. We
        will process your order and prepare it for shipment as soon as possible.
        You will receive a separate email notification once your order is
        shipped, along with tracking details.
      </div>`;
    const addressString = values.address;
    const [street = '', number = '', rest = ''] = addressString.split(', ');
    const addressObj = {
      firstAdress: street,
      secondAdress: number,
      restAdress: rest,
    };

    dispatch(
      sendOrder({ email: emailAdress, phone, name, bodyMail, addressObj })
    );
    // dispatch(sendOrder(itemsBasket));
  };

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

  const getInitialValues = () => {
    if (dataUser) {
      return {
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email,
        address: '',
        telephone: dataUser.telephone,
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
      };
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      telephone: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: '',
    };
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: (values) => {
      elem(values);
      dispatch(orderBasket(values));
      dispatch(openApp());
    },
  });

  return (
    isOpenForm && (
      <StyledFormBackground component="div">
        <form
          ref={formRef}
          onSubmit={formik.handleSubmit}
          style={{
            padding: '10px 0',
            top: '10%',
            margin: 'auto',
            position: 'relative',
            borderRadius: 7,
            maxWidth: 660,
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
              Order
            </StyledTypography>
            <StyledIconButton onClick={closed}>
              <Close />
            </StyledIconButton>
          </Container>
          <Container>
            <Container
              component="div"
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              <Container component="div" style={{ maxWidth: 300, padding: 0 }}>
                <StyledForm>
                  <StyledInputBaseLogin
                    style={{ width: '100%' }}
                    variant="outlined"
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon
                            style={{ paddingRight: 5, cursor: 'pointer' }}
                          />
                        </InputAdornment>
                      ),
                    }}
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
                  <StyledInputBaseLogin
                    style={{ width: '100%' }}
                    variant="outlined"
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon
                            style={{ paddingRight: 5, cursor: 'pointer' }}
                          />
                        </InputAdornment>
                      ),
                    }}
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
                <StyledForm style={{ textAlign: 'center' }}>
                  <PatternFormat
                    style={{ width: '100%' }}
                    label="Phone"
                    format="+380 (##) ## ## ###"
                    allowEmptyFormatting
                    customInput={StyledInputBaseLogin}
                    mask="_"
                    id="telephone"
                    name="telephone"
                    onBlur={formik.handleBlur}
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <LocalPhoneIcon
                            style={{ paddingRight: 5, cursor: 'pointer' }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.telephone && formik.errors.telephone ? (
                    <StyledTypography variant="paragraph" component="p">
                      {formik.errors.telephone}
                    </StyledTypography>
                  ) : (
                    <StyledTypography variant="paragraph" component="p">
                      {' '}
                    </StyledTypography>
                  )}
                </StyledForm>
              </Container>
              <StyledGrid
                container
                spacing={2}
                style={{
                  backgroundColor: '#C4C4C4',
                }}>
                <StyledTypography variant="h6">
                  Card for payment
                </StyledTypography>
                <StyledGrid item xs={12}>
                  <PatternFormat
                    style={{
                      marginBottom: 5,
                      width: 180,
                      border: 'none',
                      minHeight: 40,
                      padding: '0 20px',
                      borderRadius: 7,
                    }}
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
                    <StyledTypography variant="paragraph" component="p">
                      {formik.errors.cardNumber}
                    </StyledTypography>
                  ) : (
                    <StyledTypography variant="paragraph" component="p">
                      {' '}
                    </StyledTypography>
                  )}
                </StyledGrid>
                <StyledGrid container spacing={3}>
                  <StyledGrid item xs={2} style={{ paddingLeft: '0' }}>
                    <PatternFormat
                      style={{
                        margin: '0 7px 5px 7px',
                        width: 80,
                        border: 'none',
                        minHeight: 40,
                        padding: '0 20px',
                        borderRadius: 7,
                      }}
                      label="Expiration Month"
                      placeholder="MM"
                      format="##"
                      id="expirationMonth"
                      name="expirationMonth"
                      onBlur={formik.handleBlur}
                      value={formik.values.expirationMonth}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.expirationMonth &&
                    formik.errors.expirationMonth ? (
                      <StyledTypography
                        variant="paragraph"
                        component="p"
                        style={{ height: 40 }}>
                        {formik.errors.expirationMonth}
                      </StyledTypography>
                    ) : (
                      <StyledTypography
                        variant="paragraph"
                        component="p"
                        style={{ height: 40 }}>
                        {' '}
                      </StyledTypography>
                    )}
                  </StyledGrid>
                  <StyledGrid item xs={2} style={{ paddingLeft: '0' }}>
                    <PatternFormat
                      style={{
                        marginBottom: 5,
                        width: 80,
                        border: 'none',
                        minHeight: 40,
                        padding: '0 20px',
                        borderRadius: 7,
                      }}
                      label="Expiration Year"
                      placeholder="YY"
                      format="##"
                      id="expirationYear"
                      name="expirationYear"
                      onBlur={formik.handleBlur}
                      value={formik.values.expirationYear}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.expirationYear &&
                    formik.errors.expirationYear ? (
                      <StyledTypography
                        variant="paragraph"
                        component="p"
                        style={{ height: 40 }}>
                        {formik.errors.expirationYear}
                      </StyledTypography>
                    ) : (
                      <StyledTypography
                        variant="paragraph"
                        component="p"
                        style={{ height: 40 }}>
                        {' '}
                      </StyledTypography>
                    )}
                  </StyledGrid>
                  <StyledGrid item xs={6} style={{ paddingLeft: '0' }}>
                    <PatternFormat
                      style={{
                        marginBottom: 5,
                        width: 90,
                        border: 'none',
                        minHeight: 40,
                        padding: '0 20px',
                        borderRadius: 7,
                      }}
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
                      <StyledTypography
                        variant="paragraph"
                        component="p"
                        style={{ height: 40 }}>
                        {formik.errors.cvv}
                      </StyledTypography>
                    ) : (
                      <StyledTypography
                        variant="paragraph"
                        component="p"
                        style={{ height: 40 }}>
                        {' '}
                      </StyledTypography>
                    )}
                  </StyledGrid>
                </StyledGrid>
              </StyledGrid>
              <StyledForm>
                <StyledInputBaseLogin
                  variant="outlined"
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  sx={{ width: '100%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <AlternateEmailIcon
                          style={{ paddingRight: 5, cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.email}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
              <StyledForm>
                <StyledInputBaseLogin
                  variant="outlined"
                  type="text"
                  id="address"
                  name="address"
                  label="Address"
                  style={{ width: '100%' }}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <HomeIcon
                          style={{ paddingRight: 5, cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {formik.touched.address && formik.errors.address ? (
                  <StyledTypography variant="paragraph" component="p">
                    {formik.errors.address}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant="paragraph" component="p">
                    {' '}
                  </StyledTypography>
                )}
              </StyledForm>
            </Container>
            <StyledButton variant="contained" color="primary" type="submit">
              Order
            </StyledButton>
          </Container>
        </form>
      </StyledFormBackground>
    )
  );
}
