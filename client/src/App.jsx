import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import BasketContent from "./pages/Basket";
import CatsAndFilters from "./pages/CatsAndFilters";
import MainContent from "./pages/Main";
import ProductContent from "./pages/Product";
import Header from "./components/Header";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="home" element={<Navigate to="/" replace />}></Route>
              <Route index element={<MainContent />}></Route>
              <Route path="basket" element={<BasketContent />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
