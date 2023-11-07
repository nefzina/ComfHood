import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/item.scss";
import caret from "../assets/caret.png";
import UserContext from "../contexts/UserContext";
import changeQuantity from "../services/changeQuantity";

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
        .get(`${import.meta.env.VITE_BACKEND_URL}/carts/${user.id}/${item.id}`)
        .then((result) => {
          if (result.data.message === "not found") {
            // item doesn't exist in DB
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                item_id: item.id,
                user_id: user.id,
                quantity: 1,
              })
              .then((res) => {
                if (res.status === 201) {
                  console.info("Done !");
                } else console.error("Error occured !");
              })
              .catch((err) => console.error(err));
          } else {
            // item exists already in DB

            axios
              .put(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                item_id: item.id,
                user_id: user.id,
                quantity: result.data.quantity + 1,
              })
              .then((res) => {
                if (res.status === 201) {
                  console.info("Done !");
                } else console.error("Error occured !");
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    } else if (
      // no user thus using local storage
      // add item
      !localStorage.getItem("cartItems") ||
      !JSON.parse(localStorage.getItem("cartItems"))?.filter(
        (element) => element.id === item.id
      ).length
    ) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { id: item.id, quantity: 1 }])
      );
      setCartItems([...cartItems, { id: item.id, quantity: 1 }]);
    } else {
      // modify existing item in local storage
      const data = JSON.parse(localStorage.getItem("cartItems"));
      const newData = changeQuantity(data, item.id, "add");
      localStorage.setItem("cartItems", JSON.stringify(newData));
      setCartItems(newData);
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
