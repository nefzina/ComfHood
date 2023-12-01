import { useContext, useEffect, useState } from "react";
import getAxiosInstance from "../services/axios";
import UserContext from "../contexts/UserContext";
import "../scss/profile.scss";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  // user properties
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [password, setPassword] = useState("");

  // address properties
  const [houseNb, setHouseNb] = useState("");
  const [street, setStreet] = useState("");
  const [appart, setAppart] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("France");
  const [updateAddress, setUpdateAddress] = useState(false);

  const [container, setContainer] = useState(0);
  const [infoToDisplay, setInfoToDisplay] = useState("");
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
  }, [updateAddress, setUser]);

  const changeFirstname = () => {
    axiosInstance
      .put(`/users/${user.id}/firstname`, {
        firstname,
      })
      .then((res) => {
        if (res.status === 204)
          setUser((previousData) => ({
            ...previousData,
            firstname,
          }));
      })
      .catch((err) => console.error(err));
  };

  const changeLastname = () => {
    axiosInstance
      .put(`/users/${user.id}/lastname`, {
        lastname,
      })
      .then((res) => {
        if (res.status === 204)
          setUser((previousData) => ({
            ...previousData,
            lastname,
          }));
      })
      .catch((err) => console.error(err));
  };

  const changePassword = () => {
    axiosInstance
      .put(`/users/${user.id}/password`, {
        password,
      })
      .then((res) => {
        if (res.status === 204) {
          setPassword("");
          setUser(null);
        }
      })
      .catch((err) => console.error(err));
  };

  const changeAddress = () => {
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
        .then((result) => {
          console.info(result);
          setUpdateAddress(!updateAddress);
        })
        .catch((err) => console.error(err));
  };

  const deleteAccount = () => {
    axiosInstance
      .delete(`/users/${user.id}`)
      .then((result) => {
        if (result.status === 204) {
          if (user.address_id) {
            axiosInstance
              .delete(`/addresses/${user.address_id}`)
              .then((res) => {
                if (res.status === 204) console.info(res);
              })
              .catch((err) => console.error(err));
          }
          setTimeout(() => {
            setUser(null);
          }, 3000);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="profilePage">
      <h2 className="title">Profile details</h2>
      <div className="firstname">
        {(!infoToDisplay || container !== 1) && (
          <div className="actualFirstname">
            <p className="label">Firstname</p>
            <p>{user.firstname}</p>
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                setInfoToDisplay("firstname");
                setContainer(1);
              }}
            >
              Change
            </button>
          </div>
        )}
        {infoToDisplay === "firstname" && (
          <div className="newFirstname">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                changeFirstname();
                setInfoToDisplay("");
                setContainer(0);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="lastname">
        {(!infoToDisplay || container !== 2) && (
          <div className="actualLastname">
            <p className="label">Lastname</p>
            <p>{user.lastname}</p>
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                setInfoToDisplay("lastname");
                setContainer(2);
              }}
            >
              Change
            </button>
          </div>
        )}
        {infoToDisplay === "lastname" && (
          <div className="newLastname">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                changeLastname();
                setInfoToDisplay("");
                setContainer(0);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="password">
        {(!infoToDisplay || container !== 3) && (
          <div className="actualPassword">
            <p className="label">Password</p>
            <p>{user.password}</p>
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                setInfoToDisplay("password");
                setContainer(3);
              }}
            >
              Change
            </button>
          </div>
        )}
        {infoToDisplay === "password" && (
          <div className="newPassword">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                changePassword();
                setInfoToDisplay("");
                setContainer(0);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="address">
        {(!infoToDisplay || container !== 4) && (
          <div className="actualAddress">
            <p className="label">Address</p>
            <div>
              <p>
                {houseNb} {street}
              </p>
              <p>{appart}</p>
              {zipCode && region && (
                <p>
                  {zipCode}, {region}
                </p>
              )}
              <p>{country}</p>
            </div>
            <button
              type="button"
              className="greenBtn"
              onClick={() => {
                setInfoToDisplay("address");
                setContainer(4);
              }}
            >
              Change
            </button>
          </div>
        )}

        {infoToDisplay === "address" && (
          <form
            className="addressForm"
            onSubmit={() => {
              changeAddress();
              setInfoToDisplay("");
              setContainer(0);
            }}
          >
            Address
            <div className="line1">
              <div>
                <label htmlFor="houseNB">House N°</label>
                <input
                  id="houseNB"
                  type="number"
                  min="1"
                  value={houseNb}
                  onChange={(e) => setHouseNb(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="streetAddress">Street</label>
                <input
                  id="streetAddress"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="appartment">Appartement</label>
              <input
                id="appartment"
                type="text"
                value={appart}
                onChange={(e) => setAppart(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zip code</label>
              <input
                id="zipCode"
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="region">Region</label>
              <input
                id="region"
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <button type="submit" className="greenBtn">
              Save
            </button>
          </form>
        )}
      </div>

      <button
        type="button"
        className="deleteBtn"
        onClick={() => deleteAccount()}
      >
        Delete account
      </button>
    </div>
  );
}
