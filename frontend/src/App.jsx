import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminProtectedRoutes from "./layouts/AdminProtectedRoutes";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Item from "./pages/Item";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import SignInUpModal from "./components/SignInUpModal";
import UserContext from "./contexts/UserContext";

import cart from "./assets/shopping-cart.png";
import "./App.scss";
import Profile from "./pages/Profile";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState(1);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <Link to="/" className="logo">
            <i>
              COMF<span>HOOD</span>
            </i>
          </Link>

          <div className="buttons">
            {user?.role_id === 2 && (
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
            )}

            {!user && (
              <button
                type="button"
                title="Sign in / Sign up"
                onClick={() => {
                  setShowModal(true);
                  setTab(1);
                }}
              >
                Sign in
              </button>
            )}

            {user && (
              <>
                <button
                  type="button"
                  title="Log out"
                  onClick={() => setUser(null)}
                >
                  Log out
                </button>
                <button type="button">
                  <Link to="/profile" className="link">
                    Profile
                  </Link>
                </button>
              </>
            )}
            <button type="button">
              <Link to="/cart" className="link cart">
                <span>Cart</span>
                <img src={cart} alt="cart" title="Cart" />
              </Link>
            </button>
          </div>
        </header>

        {showModal && (
          <SignInUpModal
            setShowModal={setShowModal}
            tab={tab}
            setTab={setTab}
          />
        )}

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<Item />} />
          <Route
            path="/cart"
            element={<Cart setTab={setTab} setShowModal={setShowModal} />}
          />

          {/* LOGGED USER ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* LOGGED ADMIN ROUTES */}
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/dashboard" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer setShowModal={setShowModal} setTab={setTab} />
    </div>
  );
}

export default App;
