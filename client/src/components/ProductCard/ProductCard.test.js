import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductCard from './index';
import store from '../../redux/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../themes/theme';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import { modalAddBasket } from '../../redux/slices/modalAddToBasket';
import renderer from 'react-test-renderer';

const productInStock = {
  name: 'AirPods 3rd generation with Lightning Charging Case',
  currentPrice: 181,
  sale: false,
  categories: 'headphones',
  imageUrls: [
    'headphone/egj1bm6mwsa0imaesroo.jpg',
    'headphone/kcytnfnwrjttjvxcu0zr.jpg',
    'headphone/m8lm5oq0h7bj1pv1luzx.jpg',
    'headphone/cv0ujhkjeibecrqxojzp.jpg',
  ],
  quantity: 26,
  color: 'White',
  brand: 'Apple',
  storage: '64gb',
  itemNo: '82656',
  description:
    'Apple AirPods 3 wireless headphones are headphones with high-quality sound...',
  guarantee: '3 months',
  arrivalPhoto: 'headphone/vlw1uhpqs7ofoiku9wuu.jpg',
};

const productOutOfStock = {
  name: 'AirPods 3rd generation with Lightning Charging Case',
  currentPrice: 181,
  sale: false,
  categories: 'headphones',
  imageUrls: [
    'headphone/egj1bm6mwsa0imaesroo.jpg',
    'headphone/kcytnfnwrjttjvxcu0zr.jpg',
    'headphone/m8lm5oq0h7bj1pv1luzx.jpg',
    'headphone/cv0ujhkjeibecrqxojzp.jpg',
  ],
  quantity: 0,
  color: 'White',
  brand: 'Apple',
  storage: '64gb',
  itemNo: '82656',
  description:
    'Apple AirPods 3 wireless headphones are headphones with high-quality sound...',
  guarantee: '3 months',
  arrivalPhoto: 'headphone/vlw1uhpqs7ofoiku9wuu.jpg',
};

const renderCard = (product, path) => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[path]}>
          <ProductCard product={product} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};
describe('ProductCard', () => {
  test('renders product card correctly with product in stock on product page', () => {
    renderCard(productInStock, '/product');
    const productCard = screen.getByTestId('product-card');
    expect(productCard).toBeInTheDocument();
    const productPrice = screen.getByText('Detail');
    expect(productPrice).toBeInTheDocument();
    const productButtons = screen.getAllByRole('button');
    expect(productButtons.length).toBeGreaterThan(0);
    const productInfo = screen.queryByTestId('product-info');
    expect(productInfo).toBeInTheDocument();
  });
  test('renders product card correctly with product out of stock', () => {
    renderCard(productOutOfStock, '/product');
    const productCard = screen.getByTestId('product-card');
    expect(productCard).toBeInTheDocument();
    const labelOutOfStock = screen.getByTestId('label-out-of-stock');
    expect(labelOutOfStock).toBeInTheDocument();
  });
  test('render product card on home page', () => {
    renderCard(productInStock, '/');
    const productCard = screen.getByTestId('product-card');
    expect(productCard).toBeInTheDocument();
    const productInfo = screen.queryByTestId('product-info');
    expect(productInfo).not.toBeInTheDocument();
  });
});

test('ProductCard snapshot', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ProductCard product={productInStock} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Product card user interactions', () => {
  test('user interaction with "Detail" and "AddToCart" buttons', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ProductCard product={productInStock} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const detailButton = screen.getByTestId('detail-btn');
    fireEvent.click(detailButton);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/product/82656');
    });
    const addToCart = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCart);
    await waitFor(() => {
      store.dispatch(changeQuantityInBasketActionCreator(productInStock, 1));
      store.dispatch(modalAddBasket(productInStock));
    });
  });
});


