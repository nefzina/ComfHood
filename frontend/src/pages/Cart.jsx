import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import "../scss/cart.scss";

export default function Cart({ setTab, setShowModal }) {
  const { user, cartItems, setCartItems } = useContext(UserContext);

  if (user) {
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cart/${user.id}`)
        .then((result) => setCartItems(result.data))
        .catch((err) => console.error(err));
    }, []);
  }

  const handleCheckout = () => {};

  return cartItems.length ? (
    <>
      <table className="cartItems">
        <thead>
          <tr>
            <th className="productHeader">Product</th>
            <th className="quantityHeader desktop">Quantity</th>
            <th className="priceHeader">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="row">
              <td className="productData">
                <Link to={`/items/${item.id}`}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.photo}`}
                    alt={item.name}
                  />
                </Link>
                <div>
                  <Link to={`/items/${item.id}`}>{item.name}</Link>
                  <p>{item.price} €</p>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <div className="mobile">
                    <button type="button">-</button>
                    <p className="quantity">{item.quantity}</p>
                    <button type="button">+</button>
                  </div>
                </div>
              </td>
              <td className="desktop">
                <button type="button">-</button>
                <p className="quantity">{item.quantity}</p>
                <button type="button">+</button>
              </td>
              <td>tot price</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment">
        <h3>
          Total price <span>€</span>
        </h3>
        <button
          type="button"
          className="checkoutBtn"
          onClick={() => handleCheckout()}
        >
          <Link to="/checkout">Validate</Link>
        </button>
      </div>
    </>
  ) : (
    <div className="noItems">
      No items in your cart
      <small>
        Add new items
        {!user && (
          <>
            <span> or </span>
            <button
              type="button"
              onClick={() => {
                setTab(1);
                setShowModal(true);
              }}
            >
              sign in
            </button>
          </>
        )}
      </small>
    </div>
  );
}

Cart.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
};
