import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatternFormat } from 'react-number-format';
import { useFormik } from 'formik';
import { Container } from '@mui/material';
import { Close } from '@mui/icons-material';
import validationSchema from './validation';
import { orderBasket } from '../../redux/slices/modalSlice';
import { openApp, closeForm } from '../../redux/slices/formSlice';
import { clearBasket } from '../../redux/slices/basketSlice';
import {
  StyledForm,
  StyledButton,
  StyledInputBase,
  StyledIconButton,
  StyledGrid,
  StyledTypography,
  StyledFormBackground,
} from '../../themes/themeOrder';
import { createOrder, saveOrder } from '../../redux/slices/orderSlice';

export default function OrderForm() {
  const dispatch = useDispatch();
  const itemsBasket = useSelector((state) => state.basket.itemsBasket);
  const isOpenForm = useSelector((state) => state.form.statusForm);
  const formRef = useRef(null);

  const elem = (values) => {
    const name = `${values.firstName} ${values.lastName}`;
    const phone = values.phone.replace(/\D/g, '');
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
    dispatch(createOrder(itemsBasket));
    dispatch(saveOrder({ emailAdress, phone, name, bodyMail, addressObj }));
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
      elem(values);
      dispatch(orderBasket(values));
      dispatch(closeForm());
      dispatch(clearBasket());
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
            borderRadius: 20,
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
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              <Container component="div" style={{ maxWidth: 300, padding: 0 }}>
                <StyledForm>
                  <StyledInputBase
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="FirstName"
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
                    placeholder="LastName"
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
                <StyledForm style={{ padding: '10px 5px' }}>
                  <PatternFormat
                    style={{
                      width: '95%',
                      border: 'none',
                      minHeight: 45,
                      padding: '0 20px',
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
                    <StyledTypography variant="paragraph" component="p">
                      {formik.errors.phone}
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
                  marginBottom: 10,
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
                      borderRadius: 50,
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
                        borderRadius: 50,
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
                        borderRadius: 50,
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
                        borderRadius: 50,
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
                <StyledInputBase
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
                <StyledInputBase
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
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              type="submit">
              Order
            </StyledButton>
          </Container>
        </form>
      </StyledFormBackground>
    )
  );
}
