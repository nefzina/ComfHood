import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Clothes from "./pages/Clothes";
import Home from "./pages/Home";
import "./App.css";
import cart from "./assets/trolley.png";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">ConfHood</Link>
          <ul>
            <li>
              <Link to="/hoodies">Hoodies</Link>
            </li>
            <li>
              <Link to="/tshirts">T-shirts</Link>
            </li>
          </ul>
          <Link to="/cart">
            <img src={cart} alt="cart" />
          </Link>
        </header>

        <Home />

        <Routes>
          <Route path="/" to={<Home />} />
          <Route path="/hoodies" to={<Clothes />} />
          <Route path="/tshirts" to={<Clothes />} />
          <Route path="/cart" to={<Cart />} />
          <Route path="/admin" to={<Admin />} />
        </Routes>
      </BrowserRouter>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
