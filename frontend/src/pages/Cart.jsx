import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../scss/cart.scss";

export default function Cart() {
  const [cartItems, setCartItems] = useState();
  const { user } = useContext(UserContext);

  if (user) {
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cart/{user.id}`)
        .then((result) => setCartItems(result.data))
        .catch((err) => console.error(err));
    }, []);
  }
  return user && cartItems ? (
    cartItems.map((item) => (
      <div className="row">
        <Link to={`/items/${item.id}`}>
          <img src={item.photo} alt={item.name} />
        </Link>
        <Link to={`/items/${item.id}`}>{item.name}</Link>
        <p>{item.price}</p>
      </div>
    ))
  ) : (
    <div className="noItems">
      No items in your cart
      <small>
        Add items or <button type="button">sign in</button>
      </small>
    </div>
  );
}
