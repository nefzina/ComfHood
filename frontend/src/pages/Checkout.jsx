import swal from "sweetalert";
import { useContext, useEffect, useState } from "react";
import getAxiosInstance from "../services/axios";
import UserContext from "../contexts/UserContext";
import "../scss/checkout.scss";

export default function Checkout() {
  const [houseNb, setHouseNb] = useState("");
  const [street, setStreet] = useState("");
  const [appart, setAppart] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("France");
  const { user, setUser } = useContext(UserContext);

  const [alert, setAlert] = useState(false);
  const axiosInstance = getAxiosInstance();

  useEffect(() => {
    if (user.address_id)
      axiosInstance
        .get(`/addresses/${user.address_id}`)
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

  const saveAddress = (e) => {
    e.preventDefault();
    if (!user.address_id)
      axiosInstance
        .post(`/addresses`, {
          house_number: houseNb,
          street_address: street,
          appartment: appart,
          zip_code: zipCode,
          region,
          country,
        })
        .then((result) => {
          if (result.status === 201)
            axiosInstance
              .put(`/users/${user.id}/addressId`, {
                address_id: result.data.id,
              })
              .then((res) => {
                if (res.status === 204)
                  setUser({ ...user, address_id: result.data.id });
              })
              .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    else
      axiosInstance
        .put(`/addresses/${user.address_id}`, {
          house_number: houseNb,
          street_address: street,
          appartment: appart,
          zip_code: zipCode,
          region,
          country,
        })
        .then((result) => console.info(result))
        .catch((err) => console.error(err));
  };

  const handleDelivery = (e) => {
    e.preventDefault();

    axiosInstance
      .get(`/carts/${user.id}`)
      .then((result) => {
        result.data.forEach((element) => {
          axiosInstance
            .get(`/items/${element.item_id}`)
            .then((res) => {
              axiosInstance
                .patch(`/items/${element.item_id}`, {
                  stockQuantity: res.data.stock_quantity - element.quantity,
                  soldQuantity: res.data.sold_quantity + element.quantity,
                })
                .then((response) => {
                  if (response.status === 204)
                    axiosInstance
                      .delete(`/carts/${user.id}/${element.item_id}`)
                      .then((answer) => console.warn(answer.status))
                      .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        });
        setAlert(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="checkout">
        <div className="contact">
          Contact
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={user?.email} />
          </fieldset>
        </div>

        <form className="addressForm" onSubmit={saveAddress}>
          Address
          <div className="line1">
            <fieldset className="field1">
              <label htmlFor="houseNB">House N°</label>
              <input
                id="houseNB"
                type="number"
                min="1"
                value={houseNb}
                onChange={(e) => setHouseNb(e.target.value)}
              />
            </fieldset>

            <fieldset className="field2">
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
          <div className="buttons">
            <button type="submit" className="greenBtn">
              Save address
            </button>
            {houseNb && street && zipCode && region && (
              <button
                type="button"
                className="greenBtn"
                onClick={handleDelivery}
              >
                Place order
              </button>
            )}
          </div>
        </form>
      </div>
      {alert &&
        swal({
          text: "Order successfully placed",
          icon: "success",
        })}
    </>
  );
}
