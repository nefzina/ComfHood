import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddWindow from "./AddWindow";
import editPencil from "../assets/edit.png";
import "../scss/products.scss";

export default function Products({ clothesTypes }) {
  const [clothesList, setClothesList] = useState([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items`)
      .then((result) => setClothesList(result.data))
      .catch((err) => console.error(err));
  }, [isShown]);

  return (
    <div className="products">
      <button
        type="button"
        className="addBtn"
        onClick={() => setIsShown(!isShown)}
      >
        Add new article
      </button>
      {clothesTypes &&
        clothesTypes.map((type) => (
          <div key={type.id} className="articleType">
            {type.type}

            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>Displayed</th>
                  <th>Price</th>
                  <th>stock</th>
                  <th>sold</th>
                </tr>
              </thead>
              <tbody>
                {clothesList &&
                  clothesList
                    .filter((item) => item.type_id === type.id)
                    .map((item) => (
                      <tr>
                        <td className="photos">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${
                              item.photo
                            }`}
                            alt=""
                          />
                        </td>
                        <td>{item.isPublic ? "Yes" : "No"}</td>
                        <td>{item.price} €</td>
                        <td>{item.stock_quantity}</td>
                        <td>{item.sold_quantity}</td>
                        <td>
                          <button type="button" className="modifyBtn">
                            <img src={editPencil} alt="modify" />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ))}
      {isShown && <AddWindow setIsShown={setIsShown} />}
    </div>
  );
}

Products.propTypes = {
  clothesTypes: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.number, PropTypes.string)
  ).isRequired,
};
