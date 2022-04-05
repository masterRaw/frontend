import { Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct.js';
import Home from './components/Home.js';
import Product from './components/Product.js';
import Products from './components/Products.js';
import Login from './components/Login.js';
import Signup from './components/Signup';
import Navigation from './components/Navigation.js';
import Bids from './components/Bids.js';
import SearchProducts from './components/SearchProducts.js';

function App() {
  return (
    <>
      <Navigation />
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/viewbids" element={<Bids />} />
          <Route path="/search/:keyword"  element={<SearchProducts />} />
        </Routes>
    </>
  );
}

export default App;
