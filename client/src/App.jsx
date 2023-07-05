import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Basket from './pages/Basket';
import HomeContent from './pages/Home';
import Header from './components/Header';
import ProductDescription from './components/ProductDescription';
import PageNotFound from './components/NFP';
import store from './redux/store';
import theme from './themes/theme';
import ProductsContent from './pages/Products';

function App() {
  // const id = useSelector() id товара
  const id = 123;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<HomeContent />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/product" element={<ProductsContent />} />
              <Route
                path={`/product/:${id}`}
                element={<ProductDescription />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
