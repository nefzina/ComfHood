import error from "../assets/404-error.png";
import "../scss/pageNotFound.scss";

export default function PageNotFound() {
  return (
    <div className="notFound">
      <img src={error} alt="404 not found" />
      <p>Page not found !</p>
    </div>
  );
}
