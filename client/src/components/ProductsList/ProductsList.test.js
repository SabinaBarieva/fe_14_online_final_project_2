import React from 'react';
import '@testing-library/jest-dom';
import store from '../../redux/store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import ProductsList from '.';
import { BrowserRouter } from 'react-router-dom';
import {
  mockProductsForHome,
  mockProductsForProducts,
} from './productsForTest';
import { fetchProducts } from '../../redux/slices/productsSlice';
import { getAllHomeProducts } from '../../redux/slices/allProdsHomeSlice';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../themes/theme';

jest.setTimeout(10000);

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    const { urlFilter } = req.url.searchParams;
    if (urlFilter === '/') {
      return res(ctx.json(mockProductsForHome));
    } else {
      return res(ctx.json(mockProductsForProducts));
    }
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const emptyUrl = {};

const searchParams = new URLSearchParams();
searchParams.append('categories', '');
searchParams.append('minPrice', '7');
searchParams.append('maxPrice', '100000');
searchParams.append('sort', 'default');

/*
function ComponentHome() {

  store.dispatch(getAllHomeProducts())
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <ProductsList urlFilter={emptyUrl} />
      </MemoryRouter>
    </Provider>
  );
}
*/

/* function ComponentProducts() {
  store.dispatch(fetchProducts(1, emptyUrl));
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/product']}>
        <ProductsList urlFilter={searchParams} />
      </MemoryRouter>
    </Provider>
  );
} */
const pagination = () => screen.getByTestId('pagination');
const productCard = () => screen.getAllByTestId('product-card');
const productList = () => screen.getByTestId('products-list');
/* const init = async () => {
  store.dispatch(fetchProducts({
    1,
    urlFilter,
  }));
  store.dispatch(resetFilters());
  render(<ComponentHome />);
  await screen.(productList());
}; */

describe('Products component on home page and productsSlice', () => {
  test('Component renders', async () => {
    store.dispatch(getAllHomeProducts());
    await render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ProductsList urlFilter={emptyUrl} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    /* const productTitle = screen.getByText('Test iPad Air');
    expect(productTitle).toBeInTheDocument(); */
    expect(productList()).toBeInTheDocument();
    expect(productCard()).toBeInTheDocument();
    expect(productCard()).toHaveLength(10);
    expect(pagination()).not.toBeInTheDocument();
  });
});
