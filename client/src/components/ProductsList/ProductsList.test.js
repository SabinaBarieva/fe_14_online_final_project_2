import React from 'react';
import { Provider } from 'react-redux';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import '@testing-library/jest-dom';
import { rootReducer } from '../../redux/store';
import ProductsList from '.';
import { productsForHome, productsForProducts } from './productsForTest';
import { URLSearchParams } from 'url';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

jest.setTimeout(10000);

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => res(ctx.json(productsForTest)))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const initialState = {
  products: productsForProducts,
  allProdsHomePage: productsForHome,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const searchParams = new URLSearchParams();
searchParams.append('categories', '');
searchParams.append('minPrice', '7');
searchParams.append('maxPrice', '100000');
searchParams.append('sort', 'default');

function ComponentHome() {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <ProductsList urlFilter={searchParams} />
      </MemoryRouter>
    </Provider>
  );
}

function ComponentProducts() {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/product']}>
        <ProductsList urlFilter={searchParams} />
      </MemoryRouter>
    </Provider>
  );
}

const pagination = () => screen.getByTestId('pagination');
const productCard = () => screen.getAllByTestId('product-card');
const productList = () => screen.getByTestId('products-list');
describe('Products component on home page and productsSlice', () => {
  test('Component renders', async () => {
    render(<ComponentHome />);
    expect(productList()).toBeInTheDocument();
    expect(productCard()).toBeInTheDocument();
    expect(productCard()).toHaveLength(10);
    expect(pagination()).not.toBeInTheDocument();
  });
});
