import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../scss/modifyItem.scss";
import PropTypes from "prop-types";

export default function ModifyItem({ setItemToModify, itemToModify }) {
  const [clothesTypes, setClothesTypes] = useState([]);
  const inputRef = useRef(null);

  const [typeId, setTypeId] = useState(0);
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [price, setPrice] = useState(0.0);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/items/${itemToModify.id}`)
      .then((result) => {
        setTypeId(result.data.type_id);
        setName(result.data.name);
        setMaterial(result.data.material);
        setStockQuantity(result.data.stock_quantity);
        setColor(result.data.color);
        setDescription(result.data.description);
        setPhoto(result.data.photo);
        setIsPublic(result.data.isPublic);
        setPrice(result.data.price);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleModification = (e) => {
    e.preventDefault();
    if (inputRef.current.files[0]) {
      // POST file
      const formData = new FormData();
      formData.append("photo", inputRef.current.files[0]);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/photos`, formData)
        .then((result) => {
          if (result.status === 201) {
            // post all input data after file upload
            axios
              .put(
                `${import.meta.env.VITE_BACKEND_URL}/items/${itemToModify.id}`,
                {
                  typeId,
                  name,
                  material,
                  stockQuantity,
                  color,
                  description,
                  photo: `/uploads/${result.data}`,
                  isPublic,
                  price,
                }
              )
              .then((resp) => {
                if (resp.status === 201) {
                  setMsg("Article modified successfully !");
                  setTimeout(() => {
                    setItemToModify({});
                  }, 4000);
                }
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => {
          setMsg("An error has occured !");
          console.error(err);
        });
    } else {
      // post all input data without file upload
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/items/${itemToModify.id}`, {
          typeId,
          name,
          material,
          stockQuantity,
          color,
          description,
          photo,
          isPublic,
          price,
        })
        .then((resp) => {
          if (resp.status === 201) {
            setMsg("Article modified successfully !");
            setTimeout(() => {
              setItemToModify({});
            }, 4000);
          }
        })
        .catch((err) => {
          setMsg("An error has occured !");
          console.error(err);
        });
    }

    setTimeout(() => {
      setMsg("");
    }, 4000);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/types`)
      .then((result) => setClothesTypes(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="modifModal">
      <button
        type="button"
        className="close"
        onClick={() => setItemToModify({})}
      >
        x
      </button>
      <form
        className="form"
        encType="multipart/form-data"
        onSubmit={handleModification}
      >
        <label htmlFor="type">Type</label>
        <select
          type="text"
          id="type"
          defaultValue={typeId}
          // clothesTypes?.find((p) => p.id === typeId)?.type
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value={0} key={0} disabled>
            --Select--
          </option>
          {clothesTypes &&
            clothesTypes.map((type) => (
              <option value={type.id} key={type.id}>
                {type.type}
              </option>
            ))}
        </select>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="material">Material</label>
        <input
          type="text"
          id="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />

        <label htmlFor="quantity">Stock quantity</label>
        <input
          type="number"
          id="quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />

        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols="10"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          step="0.01"
          min="0"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <img src={`${import.meta.env.VITE_BACKEND_URL}${photo}`} alt={name} />

        <label htmlFor="photo">Change photo</label>
        <input type="file" id="photo" name="photo" ref={inputRef} />

        <label htmlFor="public">Article is public</label>
        <input
          type="checkbox"
          id="public"
          value={isPublic}
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />

        <button type="submit">Validate</button>
      </form>

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

ModifyItem.propTypes = {
  setItemToModify: PropTypes.func.isRequired,
  itemToModify: PropTypes.shape({
    id: PropTypes.number,
    type_id: PropTypes.number,
    name: PropTypes.string,
    material: PropTypes.string,
    sold_quantity: PropTypes.number,
    stock_quantity: PropTypes.number,
    color: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    isPublic: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,
};
