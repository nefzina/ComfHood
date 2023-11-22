import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../scss/footer.scss";

export default function Footer({ setShowModal, setTab }) {
  return (
    <footer className="footer">
      <Link to="/" className="logo">
        <h2>
          COMF<span>HOOD</span>
        </h2>
      </Link>

      <div className="wrapper">
        <p className="col1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          distinctio aliquam, consectetur eum mollitia error molestiae ipsa
          praesentium odio nostrum! Magni delectus minima ullam unde aperiam.
        </p>

        <ul>
          <li>About</li>
          <li>
            <Link to="/terms&conditions">Terms & conditions</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy policy</Link>{" "}
          </li>
        </ul>

        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              setTab(2);
              setShowModal(true);
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => {
              setTab(1);
              setShowModal(true);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
      <p className="rights">
        &copy;{new Date().getFullYear()} ComfHood. All right reserved.
      </p>
    </footer>
  );
}

Footer.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
};
