import Axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../services/validators";
import "../scss/signinupmodal.scss";

export default function SignInUpModal({ setShowModal, tab, setTab }) {
  // const [tab, setTab] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);

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
        } else if (res.data.role_id === 1) {
          setUser(res.data);
          setTimeout(() => {
            setShowModal(false);
          }, 400);

          if (localStorage.getItem("cartItems")) {
            const data = JSON.parse(localStorage.getItem("cartItems"));
            data.forEach((element) => {
              Axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/carts/${res.data.id}/${
                  element.id
                }`
              )
                .then((result) => {
                  // item doesn't exist in cart
                  if (result.data.message === "not found") {
                    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                      user_id: res.data.id,
                      item_id: element.id,
                      quantity: element.quantity,
                    })
                      .then((response) => console.info(response))
                      .catch((err) => console.error(err));
                  }
                  // item exists in cart
                  else {
                    Axios.put(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                      user_id: res.data.id,
                      item_id: element.id,
                      quantity: result.data.quantity + element.quantity,
                    })
                      .then((response) => console.info(response))
                      .catch((err) => console.error(err));
                  }
                })
                .catch((err) => console.error(err));
            });
            localStorage.removeItem("cartItems");
          }
        }
      })

      .catch((err) => console.error(err));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrors({
      email: validateEmail(email),
      password: validatePassword(password),
      firstname: validateName(firstname, "firstname"),
      lastname: validateName(lastname, "lastname"),
    });

    if (
      !validateEmail(email) &&
      !validatePassword(password) &&
      !validateName(firstname, "firstname") &&
      !validateName(lastname, "lastname")
    ) {
      Axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        firstname,
        lastname,
        email,
        password,
      })
        .then((result) => {
          if (result.status === 204) setAlert(true);
        })
        .catch((err) => console.error(err));
    }
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
              <label htmlFor="email">Email *</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password *</label>
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
              <label htmlFor="email">Email *</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({
                    ...errors,
                    email: validateEmail(e.target.value),
                  });
                }}
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <label htmlFor="firstname">firstname *</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  setErrors({
                    ...errors,
                    firstname: validateName(e.target.value, "Firstname"),
                  });
                }}
              />
              {errors.firstname && <p className="error">{errors.firstname}</p>}

              <label htmlFor="lastname">lastname *</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                  setErrors({
                    ...errors,
                    lastname: validateName(e.target.value, "Lastname"),
                  });
                }}
              />
              {errors.lastname && <p className="error">{errors.lastname}</p>}

              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    ...errors,
                    password: validatePassword(e.target.value, "password"),
                  });
                }}
              />
              {errors.password && <p className="error">{errors.password}</p>}

              <button type="submit">Sign up</button>
            </form>

            {alert && (
              <Snackbar>
                <Alert severity="success" sx={{ width: "200px" }}>
                  Your account has been created ! Sign in and enjoy your
                  shopping !
                </Alert>
              </Snackbar>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

SignInUpModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
};
