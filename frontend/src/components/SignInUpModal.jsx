import PropTypes from "prop-types";
import { useState } from "react";
import "../scss/signinupmodal.scss";

export default function SignInUpModal({ setShowModal }) {
  const [tab, setTab] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLarstname] = useState("");

  const handleSignIn = () => {};

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
            <form action="" onSubmit={() => handleSignIn()}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="text"
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
            <form action="" onSubmit={() => handleSignIn()}>
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
                onChange={(e) => setLarstname(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="text"
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
