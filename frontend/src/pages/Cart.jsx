import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  let user;
  const [cartItems, setCartItems] = useState();
  if (typeof user !== "undefined") {
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE}`)
        .then((result) => setCartItems(result.data))
        .catch((err) => console.error(err));
    }, []);
  }
  return cartItems ? (
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
    <p>Your cart is empty</p>
  );
}
