import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store';
import theme from '../../themes/theme';
import Item from './item';

const fakeItem = {
  itemNo: 1,
  name: 'Sample Item',
  imageUrls: ['sample-image-url.jpg'],
};

test('Item component renders correctly', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Item item={fakeItem} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText('Sample Item')).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('Clicking on Item navigates to the correct route', async () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Item item={fakeItem} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  fireEvent.click(screen.getByText('Sample Item'));
  await waitFor(() => {
    expect(window.location.pathname).toBe('/product/1');
  });
});
