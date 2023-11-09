import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import totalPrice from "../services/totalPrice";
import changeQuantity from "../services/changeQuantity";
import UserContext from "../contexts/UserContext";
import "../scss/cart.scss";

export default function Cart({ setTab, setShowModal }) {
  const { user } = useContext(UserContext);
  const [bddItems, setBddItems] = useState([]);

  useEffect(() => {
    let ignore = false;

    if (user) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/carts/${user.id}`)
        .then((result) => {
          if (result.data.length)
            result.data.forEach((element) => {
              axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/items/${element.id}`)
                .then((res) => {
                  if (!ignore)
                    setBddItems([
                      ...bddItems,
                      { ...res.data, quantity: element.quantity },
                    ]);
                })
                .catch((err) => console.error(err));
            });
        })
        .catch((err) => console.error(err));
    } else {
      JSON.parse(localStorage.getItem("cartItems"))?.forEach((element) => {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/items/${element.id}`)
          .then((result) => {
            if (!ignore)
              setBddItems((previousValues) => [
                ...previousValues,
                { ...result.data, quantity: element.quantity },
              ]);
          })
          .catch((err) => console.error(err));
      });
    }
    return () => (ignore = true); // eslint-disable-line
  }, []);

  return bddItems.length ? (
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
          {bddItems.map((item) => (
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
                  <p>Size: one size</p>
                  <div className="mobile">
                    <button
                      type="button"
                      onClick={() =>
                        setBddItems(
                          changeQuantity(bddItems, item.id, "substract")
                        )
                      }
                    >
                      -
                    </button>
                    <p className="quantity">{item.quantity}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setBddItems(changeQuantity(bddItems, item.id, "add"))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>
              <td className="desktop">
                <button
                  type="button"
                  onClick={() =>
                    setBddItems(changeQuantity(bddItems, item.id, "substract"))
                  }
                >
                  -
                </button>
                <p className="quantity">{item.quantity}</p>
                <button
                  type="button"
                  onClick={() =>
                    setBddItems(changeQuantity(bddItems, item.id, "add"))
                  }
                >
                  +
                </button>
              </td>
              <td>{totalPrice([item])} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment">
        <h3>
          Total price : <span>{totalPrice(bddItems)} €</span>
        </h3>
        <button
          type="button"
          className="checkoutBtn"
          onClick={() => {
            if (!user) {
              setShowModal(true);
            }
          }}
        >
          {user ? <Link to="/checkout">Validate</Link> : <span>validate</span>}
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
