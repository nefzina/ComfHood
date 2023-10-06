import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminProtectedRoutes from "./layouts/AdminProtectedRoutes";
import Cart from "./pages/Cart";
import cart from "./assets/trolley.png";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Item from "./pages/Item";
import koala from "./assets/koala.png";
import person from "./assets/user.png";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
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
            <i>
              <img src={koala} alt="koala" />
              ComfHood
            </i>
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
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<Item />} />

          {/* LOGGED USER ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* LOGGED ADMIN ROUTES */}
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/dashboard" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer setShowModal={setShowModal} />
    </div>
  );
}

export default App;
