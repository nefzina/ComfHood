import { useContext, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import "./App.scss";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState(1);
  const { user, setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app">
      <header>
        <Link to="/" className="logo">
          <h2>
            COMF<span>HOOD</span>
          </h2>
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
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  navigate("/");
                }}
              >
                Log out
              </button>

              <Link to="/profile" className="link">
                Profile
              </Link>
            </>
          )}

          <Link to="/cart" className="link cart">
            <span>Cart</span>
            <img src={cart} alt="cart" title="Cart" />
          </Link>
        </div>
      </header>
      {location.pathname !== "/" && <div className="line" />}

      {showModal && (
        <SignInUpModal setShowModal={setShowModal} tab={tab} setTab={setTab} />
      )}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/items/:id" element={<Item />} />
        <Route
          path="/cart"
          element={<Cart setTab={setTab} setShowModal={setShowModal} />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms&conditions" element={<TermsAndConditions />} />

        {/* LOGGED USER ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* LOGGED ADMIN ROUTES */}
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/dashboard" element={<Admin />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <div className="line" />
      <Footer setShowModal={setShowModal} setTab={setTab} />
    </div>
  );
}

export default App;
