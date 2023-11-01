import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import bannerImg from "../assets/homePage-welcomeSection.jpg";
import UserContext from "../contexts/UserContext";
import "../scss/home.scss";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const { user, cartItems, setCartItems } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items`)
      .then((result) => setProductsList(result.data))
      .catch((err) => console.error(err));
  }, []);

  const AddToCart = (e, newProduct) => {
    e.preventDefault();
    if (user)
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
          item_id: e.target.value,
          user_id: user.id,
        })
        .then((result) => {
          if (result.status === 201) {
            console.info("Done !");
          } else console.error("Error occured !");
        })
        .catch((err) => console.error(err));
    else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newProduct])
      );
      setCartItems([...cartItems, newProduct]);
    }
  };

  return (
    <div className="home">
      <div className="banner">
        <img src={bannerImg} alt="male in hoodie" />
        <h1 className="slogan">Wear more of what makes you Comfy</h1>
      </div>
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
                  onClick={(e) => AddToCart(e, product)}
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
