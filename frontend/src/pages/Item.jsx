import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Item() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`)
      .then((result) => setItem(result.data))
      .catch((err) => console.error(err));
  }, []);

  //   useEffect(() => {
  //     axios
  //       .post(`${import.meta.env.VITE_BACKEND_URL}/card/${id}`)
  //       .then((result) => setItem(result.data))
  //       .catch((err) => console.error(err));
  //   }, []);

  return (
    item && (
      <div className="item">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${item.photo}`}
          alt={`${item.name}`}
        />
        <h3>{item.name}</h3>
        <h4>Description :</h4>
        <ul>
          <li>{item.color}</li>
          <li>{item.material}</li>
          <li>{item.description}</li>
        </ul>
        <p>{item.price} €</p>

        <button type="button">Add to cart</button>
      </div>
    )
  );
}
