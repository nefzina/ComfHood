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

import cart from "./assets/trolley.png";
import person from "./assets/user.png";
import shield from "./assets/shield.png";
import logOut from "./assets/logout.png";
import "./App.scss";
import Profile from "./pages/Profile";

function App() {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <Link to="/" className="logo">
            <i>COMFHOOD</i>
          </Link>

          <div className="buttons">
            {user?.role_id === 2 && (
              <Link to="/dashboard">
                <img src={shield} alt="shield" title="Dashboard" />
              </Link>
            )}

            {!user && (
              <button
                type="button"
                title="Sign in / Sign up"
                onClick={() => setShowModal(true)}
              >
                <img src={person} alt="sign up sign in" />
              </button>
            )}

            {user && (
              <>
                <button
                  type="button"
                  title="Log out"
                  onClick={() => setUser(null)}
                >
                  <img src={logOut} alt="sign out" />
                </button>
                <Link to="/profile">Profile</Link>
              </>
            )}

            <Link to="/cart">
              <img src={cart} alt="cart" title="Cart" />
            </Link>
          </div>
        </header>

        {showModal && <SignInUpModal setShowModal={setShowModal} />}

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />

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
      <Footer setShowModal={setShowModal} />
    </div>
  );
}

export default App;
