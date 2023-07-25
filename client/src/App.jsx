import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import Basket from './pages/Basket';
import HomeContent from './pages/Home';
import Header from './components/Header';
import ProductDescription from './components/ProductDescription';
import PageNotFound from './components/NotFoundPage';
import store, { persistor } from './redux/store';
import theme from './themes/theme';
import ProductsContent from './pages/Products';
import About from './components/AboutUs';
import UserPage from './pages/UserPage';
import Init from './components/Init';

function App() {
  return (
    <Provider store={store}>
      <Init />
      <PersistGate loading="LDNG" persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route path="/about" element={<About />} />
                <Route path="/user" element={<UserPage />} />
                <Route index element={<HomeContent />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/product" element={<ProductsContent />} />
                <Route path="/product/:id" element={<ProductDescription />} />
                <Route path="/product/not-found" element={<PageNotFound />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
