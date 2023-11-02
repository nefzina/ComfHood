import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../contexts/UserContext";
import "../scss/signinupmodal.scss";

export default function SignInUpModal({ setShowModal }) {
  const [tab, setTab] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const { user, setUser, cartItems } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      email,
      password,
    })
      .then((res) => {
        if (res.data.role_id === 2) {
          setUser(res.data);
          setTimeout(() => {
            setShowModal(false);
            navigate("/dashboard");
          }, 400);
        } else {
          setUser(res.data);

          setTimeout(() => {
            setShowModal(false);
            if (cartItems.length) {
              cartItems.forEach((element) => {
                Axios.post(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                  user_id: user.id,
                  item_id: element.id,
                  quantity: element.quantity,
                })
                  .then((result) => console.info(result))
                  .catch((err) => console.error(err));
              });
            }
            navigate("/");
          }, 400);
        }
      })

      .catch((err) => console.error(err));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      firstname,
      lastname,
      email,
      password,
    })
      .then((result) => console.warn(result))
      .catch((err) => console.error(err));
  };

  return (
    <div className="signInModal">
      <button
        type="button"
        className="close"
        onClick={() => setShowModal(false)}
      >
        X
      </button>
      <div className="tabs">
        <button type="button" onClick={() => setTab(1)}>
          Sign in
        </button>
        <button type="button" onClick={() => setTab(2)}>
          Create an account
        </button>
      </div>

      <div className="wrapper">
        {tab === 1 && (
          <div className="signin">
            <form action="" onSubmit={(e) => handleSignIn(e)}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Sign in</button>
            </form>
          </div>
        )}
        {tab === 2 && (
          <div className="signup">
            <form action="" onSubmit={(e) => handleSignUp(e)}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="firstname">firstname</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />

              <label htmlFor="lastname">lastname</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Sign up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

SignInUpModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
