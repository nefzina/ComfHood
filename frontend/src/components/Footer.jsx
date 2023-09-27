import "../scss/footer.scss";
import PropTypes from "prop-types";

export default function Footer({ setShowModal }) {
  return (
    <footer className="footer">
      <h2>ComfHood</h2>
      <div className="wrapper">
        <p className="col1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          distinctio aliquam, consectetur eum mollitia error molestiae ipsa
          praesentium odio nostrum! Magni delectus minima ullam unde aperiam.
        </p>

        <ul>
          <li>About</li>
          <li>Terms & conditions</li>
          <li>Privacy policy</li>
        </ul>

        <div className="buttons">
          <button type="button" onClick={() => setShowModal(true)}>
            Sign up
          </button>
          <button type="button" onClick={() => setShowModal(true)}>
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
};
