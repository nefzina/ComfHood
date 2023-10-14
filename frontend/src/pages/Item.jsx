import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/item.scss";
import caret from "../assets/caret.png";

export default function Item() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  const [showDescription, setshowDescription] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`)
      .then((result) => setItem(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    item && (
      <div className="item">
        <div className="photos">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${item.photo}`}
            alt={`${item.name}`}
          />
        </div>
        <div className="details">
          <h2>{item.name}</h2>
          <p className="details-price">{item.price} €</p>
          <div className="details-color">
            <p>Color</p>
            <h5>{item.color}</h5>
          </div>

          <div className="details-size">
            <p>Size</p>
            <h5>one size</h5>
          </div>

          <button
            type="button"
            className="details-description"
            onClick={() => setshowDescription(!showDescription)}
          >
            <div className="details-description-flex-wrapper">
              Description
              <img src={caret} alt="down arrow" />
            </div>
            {showDescription && (
              <div className="fold">
                <p>Material : {item.material}</p>
                <p>{item.description}</p>
              </div>
            )}
          </button>

          <button type="button" className="addToCart">
            Add to cart
          </button>
        </div>
      </div>
    )
  );
}
