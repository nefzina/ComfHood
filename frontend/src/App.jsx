import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Clothes from "./pages/Clothes";
import Home from "./pages/Home";
import "./App.scss";
import cart from "./assets/trolley.png";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/" className="logo">
            ConfHood
          </Link>
          <ul className="tabs">
            <li>
              <Link to="/hoodies">Hoodies</Link>
            </li>
            <li>
              <Link to="/tshirts">T-shirts</Link>
            </li>
          </ul>
          <Link to="/cart" className="cartImg">
            <img src={cart} alt="cart" />
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/hoodies"
            element={<Clothes key="hoodies" clothesType={1} />}
          />
          <Route
            path="/tshirts"
            element={<Clothes key="tshirts" clothesType={2} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
