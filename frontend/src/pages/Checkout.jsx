import { useContext, useEffect, useState } from "react";
import "../scss/checkout.scss";
import axios from "axios";
import swal from "sweetalert";
import UserContext from "../contexts/UserContext";

export default function Checkout() {
  const [houseNb, setHouseNb] = useState("");
  const [street, setStreet] = useState("");
  const [appart, setAppart] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("France");
  const { user, setUser } = useContext(UserContext);

  const [alert, setAlert] = useState(false);

  if (user.address_id)
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/addresses/${user.address_id}`)
        .then((result) => {
          setHouseNb(result.data.house_number);
          setStreet(result.data.street_address);
          setAppart(result.data.appartment);
          setZipCode(result.data.zip_code);
          setRegion(result.data.region);
          setCountry(result.data.country);
        })
        .catch((err) => console.error(err));
    }, []);

  const saveAddress = () => {
    if (!user.address_id)
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/addresses`, {
          house_number: houseNb,
          street_address: street,
          appartment: appart,
          zip_code: zipCode,
          region,
          country,
        })
        .then((result) => {
          if (result.status === 201)
            axios
              .put(
                `${import.meta.env.VITE_BACKEND_URL}/users/${
                  user.id
                }/addressId`,
                {
                  address_id: result.data.id,
                }
              )
              .then((res) => {
                if (res.status === 204)
                  setUser({ ...user, address_id: result.data.id });
              })
              .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    else
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/addresses/${user.address_id}`,
          {
            house_number: houseNb,
            street_address: street,
            appartment: appart,
            zip_code: zipCode,
            region,
            country,
          }
        )
        .then((result) => console.info(result))
        .catch((err) => console.error(err));
  };

  const handleDelivery = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/carts/${user.id}`)
      .then((result) => {
        result.data.forEach((element) => {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/items/${element.item_id}`)
            .then((res) => {
              axios
                .put(
                  `${import.meta.env.VITE_BACKEND_URL}/items/${
                    element.item_id
                  }`,
                  {
                    type_id: res.data.type_id,
                    name: res.data.name,
                    material: res.data.material,
                    stock_quantity: res.data.stock_quantity - element.quantity,
                    sold_quantity: res.data.sold_quantity + element.quantity,
                    color: res.data.color,
                    description: res.data.description,
                    photo: res.data.photo,
                    isPublic: res.data.isPublic,
                    price: res.data.price,
                  }
                )
                .then((response) => {
                  if (response.status === 204)
                    axios
                      .delete(
                        `${import.meta.env.VITE_BACKEND_URL}/carts/${user.id}/${
                          element.item_id
                        }`
                      )
                      .then((answer) => console.warn(answer.status))
                      .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="checkout">
      <div className="contact">
        Contact
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={user?.email} />
        </fieldset>
      </div>

      <form
        className="addressForm"
        onSubmit={() => {
          setAlert(true);
          handleDelivery();
        }}
      >
        Address
        <div className="line1">
          <fieldset>
            <label htmlFor="houseNB">House N°</label>
            <input
              id="houseNB"
              type="number"
              min="1"
              value={houseNb}
              onChange={(e) => setHouseNb(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="streetAddress">Street</label>
            <input
              id="streetAddress"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </fieldset>
        </div>
        <fieldset>
          <label htmlFor="appartment">Appartement</label>
          <input
            id="appartment"
            type="text"
            value={appart}
            onChange={(e) => setAppart(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="zipCode">Zip code</label>
          <input
            id="zipCode"
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="region">Region</label>
          <input
            id="region"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </fieldset>
        <button type="button" onClick={saveAddress}>
          Save address
        </button>
        <button type="submit">Place order</button>
      </form>

      {alert &&
        swal({
          text: "Order successfully placed",
          icon: "success",
        })}
    </div>
  );
}
