import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddWindow from "./AddWindow";
import ModifyItem from "./ModifyItem";

import editPencil from "../assets/edit.png";
import deleteImg from "../assets/delete.png";
import "../scss/products.scss";

export default function Products({ clothesTypes }) {
  const [clothesList, setClothesList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [itemToModify, setItemToModify] = useState({});

  const [msg, setMgs] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items`)
      .then((result) => setClothesList(result.data))
      .catch((err) => console.error(err));
  }, [showAddModal, msg, itemToModify]);

  const deleteItem = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`)
      .then((result) => {
        if (result.status === 204) {
          setMgs("Item deleted successfully !");
        } else {
          setMgs("An error has occured !");
        }
      })
      .catch((err) => {
        console.error(err);
        setMgs("An error has occured !");
      });
  };

  return (
    <div className="products">
      <button
        type="button"
        className="addBtn"
        onClick={() => setShowAddModal(!showAddModal)}
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
                  <th>Modify</th>
                  <th>Delete</th>
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
                            alt={item.name}
                          />
                        </td>
                        <td>{item.isPublic ? "Yes" : "No"}</td>
                        <td>{item.price} €</td>
                        <td>{item.stock_quantity}</td>
                        <td>{item.sold_quantity}</td>
                        <td className="btns">
                          <button
                            type="button"
                            className="modifyBtn"
                            onClick={() => {
                              setItemToModify(item);
                            }}
                          >
                            <img src={editPencil} alt="modify" />
                          </button>
                        </td>
                        <td className="btns">
                          <button
                            type="button"
                            className="deleteBtn"
                            onClick={() => deleteItem(item.id)}
                          >
                            <img src={deleteImg} alt="delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ))}
      {showAddModal && <AddWindow setShowAddModal={setShowAddModal} />}
      {Object.keys(itemToModify).length && (
        <ModifyItem
          setItemToModify={setItemToModify}
          itemToModify={itemToModify}
        />
      )}
      <div>
        {msg === "An error has occured !" ? (
          <p className="error">{msg}</p>
        ) : (
          <p className="success">{msg}</p>
        )}
      </div>
    </div>
  );
}

Products.propTypes = {
  clothesTypes: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.number, PropTypes.string)
  ).isRequired,
};
