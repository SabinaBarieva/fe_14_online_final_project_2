/* eslint-disable react/react-in-jsx-scope */
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store from '../../redux/store';
import theme from '../../themes/theme';
import OrderForm from './orderForm';
import ModalOrdered from './modal';
import { openForm, openApp } from '../../redux/slices/formSlice';
import { orderBasket } from '../../redux/slices/modalSlice';

afterEach(cleanup);

test('Test Form', () => {
  store.dispatch(openForm());
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <OrderForm />
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getAllByRole('button')).toHaveLength(2);
  const buttons = screen.getAllByRole('button');
  const svgInsideFirstButton = buttons[0].querySelector('svg');
  expect(buttons[0]).toContainElement(svgInsideFirstButton);
  expect(buttons[1]).toHaveTextContent('Order');
  expect(screen.getAllByRole('textbox')).toHaveLength(9);
  fireEvent.click(buttons[0]);
  const form = screen.queryByRole('dialog');
  expect(form).not.toBeInTheDocument();
});

const values = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@gmail.com',
  address: 'City, Street, 3',
  telephone: '+380662662255',
  cardNumber: '444444444444448',
  expirationMonth: '10',
  expirationYear: '25',
  cvv: '444',
};

test('Test OpenModalOrder', () => {
  store.dispatch(orderBasket(values));
  store.dispatch(openApp());
  store.dispatch({ type: 'order/setLoading', payload: false });
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ModalOrdered />
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getAllByRole('button')).toHaveLength(2);
  const buttons = screen.getAllByRole('button');
  const svgCloseButton = buttons[0].querySelector('svg');
  expect(buttons[0]).toContainElement(svgCloseButton);
  expect(buttons[1]).toHaveTextContent('Ok');
  expect(screen.getByText('Ordered')).toBeInTheDocument();
  expect(
    screen.getByText(
      'Dear, firstName lastName. Thank you for your purchase. The parcel number will be sent to the email@gmail.com.'
    )
  ).toBeInTheDocument();
  fireEvent.click(buttons[1]);
  const modal = screen.queryByRole('dialog');
  expect(modal).not.toBeInTheDocument();
});
