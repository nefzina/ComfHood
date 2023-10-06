import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/home.scss";
import axios from "axios";
import bannerImg from "../assets/homePage-welcomeSection.jpg";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items`)
      .then((result) => setProductsList(result.data))
      .catch((err) => console.error(err));
  }, []);
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
              <h3>{product.name}</h3>
              <p>{product.price} €</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
