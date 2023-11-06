import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import bannerImg from "../assets/homePage-welcomeSection.jpg";
import UserContext from "../contexts/UserContext";
import "../scss/home.scss";
import changeQuantity from "../services/changeQuantity";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const { user, cartItems, setCartItems } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items`)
      .then((result) => setProductsList(result.data))
      .catch((err) => console.error(err));
  }, []);

  const AddToCart = (e, newProductId) => {
    e.preventDefault();
    if (user) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/carts/${user.id}/${
            e.target.value
          }`
        )
        .then((result) => {
          // item doesn't exist
          if (result.data.message === "not found") {
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                item_id: parseInt(e.target.value, 10),
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
            // item exists already
            axios
              .put(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
                item_id: parseInt(e.target.value, 10),
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
      // local storage
      !localStorage.getItem("cartItems") ||
      !JSON.parse(localStorage.getItem("cartItems"))?.filter(
        (element) => element.id === newProductId
      ).length
    ) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { id: newProductId, quantity: 1 }])
      );
      setCartItems([...cartItems, { id: newProductId, quantity: 1 }]);
    } else {
      const data = JSON.parse(localStorage.getItem("cartItems"));
      const newData = changeQuantity(data, newProductId, "add");
      localStorage.setItem("cartItems", JSON.stringify(newData));
      setCartItems(newData);
    }
  };

  return (
    <div className="home">
      <div className="banner">
        <img src={bannerImg} alt="male in hoodie" />
        <h1 className="slogan">Wear more of what makes you Comfy</h1>
      </div>
      <h2 className="title">Products list</h2>
      <div className="products">
        {productsList &&
          productsList.map((product) => (
            <Link className="card" key={product.id} to={`/items/${product.id}`}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${product.photo}`}
                alt={product.name}
              />
              <div className="info">
                <h3>{product.name}</h3>
                <p>{product.price} €</p>
                <button
                  type="button"
                  value={product.id}
                  onClick={(e) => AddToCart(e, product.id)}
                >
                  Add to card
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
