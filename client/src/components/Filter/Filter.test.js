import React from 'react';
import { Provider } from 'react-redux';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import store from '../../redux/store';
import Filter from '.';
import { fetchFilters, resetFilters } from '../../redux/slices/filtersSlice';

jest.setTimeout(10000);
const minPriceBoundary = 9;
const maxPriceBoundary = 9876;
const filterCategories = {
  categories: [
    { id: 'test-category-1', name: 'Test Category 1', quantity: 7 },
    { id: 'test-category-2', name: 'Test Category 2', quantity: 7 },
    { id: 'test-category-3', name: 'Test Category 3', quantity: 8 },
    { id: 'test-category-4', name: 'Test Category 4', quantity: 5 },
    { id: 'test-category-5', name: 'Test Category 5', quantity: 10 },
    { id: 'test-category-6', name: 'Test Category 6', quantity: 5 },
  ],
  price: { min: minPriceBoundary, max: maxPriceBoundary },
};

const server = setupServer(
  rest.get('/api/product-filters', (req, res, ctx) =>
    res(ctx.json(filterCategories))
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const minPriceInput = () => screen.getByLabelText('Min');
const maxPriceInput = () => screen.getByLabelText('Max');
const categoriesCheckboxes = () => screen.getAllByLabelText(/Test Category.*/);
const resetButton = () => screen.getByText('Clear Filter');

const init = async () => {
  store.dispatch(fetchFilters());
  store.dispatch(resetFilters());
  render(<Component />);
  await screen.findByText('Filter');
};

function Component() {
  return (
    <Provider store={store}>
      <Filter
        priceMinBoundary={minPriceBoundary}
        priceMaxBoundary={maxPriceBoundary}
      />
    </Provider>
  );
}
describe('Filter component and filterSlice', () => {
  test.skip('snapshot renders correctly', async () => {
    await init();
    const tree = renderer.create(<Component />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('Component renders', async () => {
    await init();
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Product Category')).toBeInTheDocument();
    expect(screen.getByText('Price range')).toBeInTheDocument();
    expect(categoriesCheckboxes().length).toEqual(6);
  });

  test('Set category', async () => {
    await init();
    const checkbox = categoriesCheckboxes()[0];
    expect(checkbox.name).toEqual('test-category-1');
    expect(checkbox.checked).toEqual(false);
    act(() => {
      userEvent.click(checkbox);
    });

    expect(checkbox.checked).toEqual(true);
    act(() => {
      userEvent.click(checkbox);
    });
    expect(checkbox.checked).toEqual(false);
  });

  test('Set price', async () => {
    await init();
    act(() => {
      userEvent.type(minPriceInput(), String(minPriceBoundary + 10));
    });
    expect(minPriceInput().value).toEqual(String(minPriceBoundary + 10));
    act(() => {
      userEvent.type(maxPriceInput(), String(maxPriceBoundary - 10));
    });
    expect(maxPriceInput().value).toEqual(String(maxPriceBoundary - 10));
  });

  test('Reset filter', async () => {
    await init();
    act(() => {
      categoriesCheckboxes().forEach((checkbox) => {
        userEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true);
      });
    });
    act(() => {
      userEvent.type(minPriceInput(), String(minPriceBoundary + 10));
    });
    expect(minPriceInput().value).toEqual(String(minPriceBoundary + 10));
    act(() => {
      userEvent.type(maxPriceInput(), String(maxPriceBoundary - 10));
    });
    expect(maxPriceInput().value).toEqual(String(maxPriceBoundary - 10));
    act(() => {
      userEvent.click(resetButton());
    });
    categoriesCheckboxes().forEach((checkbox) =>
      expect(checkbox.checked).toEqual(false)
    );
    expect(minPriceInput().value).toEqual('');
    expect(maxPriceInput().value).toEqual('');
  });

  test('Set min and max price out of boundaries', async () => {
    await init();
    act(() => {
      userEvent.type(minPriceInput(), String(minPriceBoundary - 1));
      userEvent.type(maxPriceInput(), String(maxPriceBoundary + 1));
      userEvent.click(minPriceInput());
    });

    expect(minPriceInput().value).toEqual(String(minPriceBoundary));
    expect(maxPriceInput().value).toEqual(String(maxPriceBoundary));
    act(() => {
      userEvent.click(resetButton());
    });
    act(() => {
      userEvent.type(minPriceInput(), String(minPriceBoundary));
      userEvent.type(maxPriceInput(), String(maxPriceBoundary));
      userEvent.click(minPriceInput());
    });

    expect(minPriceInput().value).toEqual(String(minPriceBoundary));
    expect(maxPriceInput().value).toEqual(String(maxPriceBoundary));
    act(() => {
      userEvent.click(resetButton());
    });
    act(() => {
      userEvent.type(minPriceInput(), String(minPriceBoundary + 1));
      userEvent.type(maxPriceInput(), String(maxPriceBoundary - 1));
      userEvent.click(minPriceInput());
    });
    expect(minPriceInput().value).toEqual(String(minPriceBoundary + 1));
    expect(maxPriceInput().value).toEqual(String(maxPriceBoundary - 1));
  });
});
