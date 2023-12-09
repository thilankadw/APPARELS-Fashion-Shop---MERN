import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

//Pages
import HomePage from "./Pages/Home/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import ValuesPage from './Pages/Values/Values';
import ContactPage from './Pages/Contact/ContactPage';
import StocklistPage from './Pages/Stocklist/StocklistPage';
import CataloguePage from './Pages/Catalogue/Catalogue';
import ProductPage from './Pages/Product/Product';
import BasketPage from './Pages/Basket/Basket';
import CheckoutPage from './Pages/Checkout/Checkout';
import LoginPage from './Pages/LoginNRegister/LoginNRegister';

function App() {
  return (
    <>
      <Header/>
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
            <Route path="/values" element={<ValuesPage/>}></Route>
            <Route path="/contact" element={<ContactPage/>}></Route>
            <Route path="/stocklist" element={<StocklistPage/>}></Route>
            <Route path="/catalogue" element={<CataloguePage/>}></Route>
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/basket" element={<BasketPage/>}></Route>
            <Route path="/checkout" element={<CheckoutPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>        
        </Routes>        
      <Footer/>

    </>
  );
}

export default App;
