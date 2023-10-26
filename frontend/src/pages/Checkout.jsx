import { useContext, useState } from "react";
import "../scss/checkout.scss";
import UserContext from "../contexts/UserContext";

export default function Checkout() {
  const [houseNb, setHouseNb] = useState("");
  const [street, setStreet] = useState("");
  const [appart, setAppart] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("France");
  const { user } = useContext(UserContext);

  const payment = () => {};

  return (
    <div className="checkout">
      <div className="contact">
        Contact
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={user?.email} />
        </fieldset>
      </div>

      <form className="addressForm" onSubmit={() => payment()}>
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
        <button type="submit">Place order</button>
      </form>
    </div>
  );
}
