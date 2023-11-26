import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import closeBtn from "../assets/close.png";
import getAxiosInstance from "../services/axios";
import UserContext from "../contexts/UserContext";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../services/validators";
import "../scss/signinupmodal.scss";

export default function SignInUpModal({ setShowModal, tab, setTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const axiosInstance = getAxiosInstance();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ success: "", error: "" });

  const handleSignIn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.currentUser.role_id) {
          setUser(res.data.currentUser);
          setToken(res.data.token);

          if (res.data.currentUser.role_id === 2) {
            setTimeout(() => {
              setShowModal(false);
              navigate("/dashboard");
            }, 400);
          } else if (res.data.currentUser.role_id === 1) {
            setTimeout(() => {
              setShowModal(false);
            }, 400);

            if (localStorage.getItem("cartItems")) {
              const data = JSON.parse(localStorage.getItem("cartItems"));
              data.forEach((element) => {
                // verify if the local storage item exists or not in user cart in DB
                axiosInstance
                  .get(`/carts/${res.data.id}/${element.id}`, {
                    headers: { Authorization: `Bearer ${res.data.token}` },
                  })
                  .then((result) => {
                    // item doesn't exist in cart
                    if (result.data.message === "not found") {
                      axiosInstance
                        .post(
                          `/carts`,
                          {
                            user_id: res.data.id,
                            item_id: element.id,
                            quantity: element.quantity,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${res.data.token}`,
                            },
                          }
                        )
                        .then((response) => console.info(response))
                        .catch((err) => console.error(err));
                    }
                    // item exists in cart
                    else {
                      axiosInstance
                        .put(
                          `/carts`,
                          {
                            user_id: res.data.id,
                            item_id: element.id,
                            quantity: result.data.quantity + element.quantity,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${res.data.token}`,
                            },
                          }
                        )
                        .then((response) => console.info(response))
                        .catch((err) => console.error(err));
                    }
                  })
                  .catch((err) => console.error(err));
              });
              localStorage.removeItem("cartItems");
            }
          }
        } else setAlert({ success: "", error: "Wrong email or password !" });
      })

      .catch(() =>
        setAlert({ success: "", error: "Wrong email or password !" })
      );
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setAlert({ success: "", error: "" });
    }, 4000);
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
      axiosInstance
        .post(`/users`, {
          firstname,
          lastname,
          email,
          password,
        })
        .then((result) => {
          if (result.status === 201)
            setAlert({
              success:
                "Your account has been created ! Sign in and enjoy your shopping !",
              error: "",
            });
          else {
            setAlert({
              success: "",
              error: "Error occured ! Please try again !",
            });
          }
        })
        .catch((err) => console.error(err));
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setAlert({ success: "", error: "" });
    }, 6000);
  };

  return (
    <div className="signInModal">
      <button
        type="button"
        className="close"
        onClick={() => setShowModal(false)}
      >
        <img src={closeBtn} alt="close button" />
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

              <button type="submit" className="brownBtn">
                Sign in
              </button>
            </form>

            {(alert.success.length || alert.error.length) && (
              <Alert alert={alert} />
            )}
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

              <button type="submit" className="brownBtn">
                Sign up
              </button>
            </form>

            {(alert.success.length || alert.error.length) && (
              <Alert alert={alert} />
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
