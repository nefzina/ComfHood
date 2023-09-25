import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import cart from "./assets/trolley.png";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Item from "./pages/Item";
import person from "./assets/user.png";
import shield from "./assets/shield.png";
import SignInUpModal from "./components/SignInUpModal";
import "./App.scss";

function App() {
  const admin = true; // optimize css when admin is false
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <Link to="/" className="logo">
            ConfHood
          </Link>

          <div className="buttons">
            {admin && (
              <Link to="/dashboard">
                <img src={shield} alt="shield" />
              </Link>
            )}

            <button type="button" onClick={() => setShowModal(true)}>
              <img src={person} alt="sign up sign in" />
            </button>

            <Link to="/cart">
              <img src={cart} alt="cart" />
            </Link>
          </div>
        </header>

        {showModal && <SignInUpModal setShowModal={setShowModal} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/clothes/:id" element={<Item />} />
        </Routes>
      </BrowserRouter>
      <Footer setShowModal={setShowModal} />
    </div>
  );
}

export default App;
