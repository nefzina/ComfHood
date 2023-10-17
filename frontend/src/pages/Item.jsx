import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/item.scss";
import caret from "../assets/caret.png";
import UserContext from "../contexts/UserContext";

export default function Item() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  const [showDescription, setshowDescription] = useState(false);
  const { cartItems, setCartItems, user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`)
      .then((result) => setItem(result.data))
      .catch((err) => console.error(err));
  }, []);

  const AddToCart = () => {
    if (user) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
          item_id: item.id,
          user_id: user.id,
        })
        .then((result) => {
          if (result.status === 201) {
            console.info("Done !");
          } else console.error("Error occured !");
        })
        .catch((err) => console.error(err));
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, item.id])
      );
      setCartItems([...cartItems, item.id]);
    }
  };

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

          <button
            type="button"
            className="addToCart"
            value={item.id}
            onClick={(e) => AddToCart(e)}
          >
            Add to cart
          </button>
        </div>
      </div>
    )
  );
}
