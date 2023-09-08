import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../scss/addWindow.scss";

export default function AddWindow() {
  const [clothesTypes, setClothesTypes] = useState([]);
  const inputRef = useRef(null);

  const [typeId, setTypeId] = useState(0);
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmission = (e) => {
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
              .post(`${import.meta.env.VITE_BACKEND_URL}/clothes`, {
                typeId,
                name,
                material,
                quantity,
                color,
                description,
                photo: `/uploads/${result.data}`,
                isPublic,
              })
              .then((resp) => {
                if (resp.status === 201) setMsg("New article was added !");
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => setMsg(err));
    } else {
      // post all input data without file upload
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/clothes`, {
          typeId,
          name,
          material,
          quantity,
          color,
          description,
          isPublic,
        })
        .then((resp) => {
          if (resp.status === 201) setMsg("New article was added !");
        })
        .catch((err) => setMsg(err));
    }

    setTimeout(() => {
      inputRef.current = null;
      setTypeId(0);
      setName("");
      setMaterial("");
      setQuantity(0);
      setColor("");
      setDescription("");
      setIsPublic(false);
    }, 500);

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
    <div>
      <form
        className="form"
        encType="multipart/form-data"
        onSubmit={handleSubmission}
      >
        <label htmlFor="type">Type</label>
        <select
          type="text"
          id="type"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value={0} key={0}>
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

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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

        <label htmlFor="photo">Upload photos</label>
        <input type="file" id="photo" name="photo" ref={inputRef} />

        <label htmlFor="public">Article is public</label>
        <input
          type="checkbox"
          id="public"
          value={isPublic}
          onClick={() => setIsPublic(!isPublic)}
        />

        <button type="submit">Add</button>
      </form>

      <p className="msg">{msg}</p>
    </div>
  );
}
