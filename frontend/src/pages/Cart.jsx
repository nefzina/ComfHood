import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import changeQuantity from "../services/changeQuantity";
import getAxiosInstance from "../services/axios";
import totalPrice from "../services/totalPrice";
import UserContext from "../contexts/UserContext";
import "../scss/cart.scss";

export default function Cart({ setTab, setShowModal }) {
  const { user } = useContext(UserContext);
  const [bddItems, setBddItems] = useState([]);
  const axiosInstance = getAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    if (user) {
      axiosInstance
        .get(`/carts/${user.id}`)
        .then((result) => {
          if (result.data.length)
            result.data.forEach((element) => {
              axiosInstance
                .get(`/items/${element.item_id}`)
                .then((res) => {
                  if (!ignore)
                    setBddItems((previousValue) => [
                      ...previousValue,
                      { ...res.data, quantity: element.quantity },
                    ]);
                })
                .catch((err) => console.error(err));
            });
        })
        .catch((err) => console.error(err));
    } else if (localStorage.getItem("cartItems")) {
      JSON.parse(localStorage.getItem("cartItems"))?.forEach((element) => {
        axiosInstance
          .get(`/items/${element.id}`)
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
  }, [user]);

  return bddItems.length ? (
    <>
      <table className="cartItems">
        <thead>
          <tr>
            <th className="productHeader">Products in cart</th>
            <th className="quantityHeader desktop">Quantity</th>
            <th className="priceHeader">Total</th>
          </tr>
        </thead>
        <tbody>
          {bddItems.map((item) => (
            <tr key={item.id} className="row">
              <td className="productData">
                <Link to={`/items/${item.id}`} className="imgLink">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.photo}`}
                    alt={item.name}
                  />
                </Link>
                <div className="data">
                  <Link to={`/items/${item.id}`}>{item.name}</Link>
                  <p>{item.price} €</p>
                  <p>Color: {item.color}</p>
                  <p>Size: one size</p>
                  <div className="mobile">
                    Quantity:
                    <div className="quantityContainer">
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
                </div>
              </td>
              <td className="desktop">
                <div className="quantityContainer">
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
              </td>
              <td>{totalPrice([item])} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment">
        <h3>
          Total price : <span>{totalPrice(bddItems).toFixed(2)} €</span>
        </h3>
        <button
          type="button"
          className="greenBtn"
          onClick={() => {
            if (!user) {
              setShowModal(true);
            } else {
              navigate("/checkout");
            }
          }}
        >
          Validate
          {/* {user ? <Link to="/checkout">Validate</Link> : <span>validate</span>} */}
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
