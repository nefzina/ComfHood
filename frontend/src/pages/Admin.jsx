import { useEffect, useState } from "react";
import CustomersList from "../components/CustomersList";
import Dashboard from "../components/Dashboard";
import getAxiosInstance from "../services/axios";
import openImg from "../assets/open-caret.png";
import Products from "../components/Products";
import returnImg from "../assets/back.png";
import "../scss/admin.scss";

export default function Admin() {
  const [tab, setTab] = useState("products");
  const [showAdminNavBar, setShowAdminNavBar] = useState(false);
  const [clothesTypes, setClothesTypes] = useState([]);
  const axiosInstance = getAxiosInstance();

  useEffect(() => {
    axiosInstance
      .get(`/types`)
      .then((result) => setClothesTypes(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin">
      <div className={showAdminNavBar ? "showAdminNavBar" : "hideAdminNavBar"}>
        <button
          type="button"
          className="returnBtn"
          onClick={() => setShowAdminNavBar(false)}
        >
          <img src={returnImg} alt="return arrow" />
        </button>
        <button type="button" onClick={() => setTab("dashboard")}>
          Dashboard
        </button>

        <button type="button" onClick={() => setTab("products")}>
          Products
        </button>

        <button type="button" onClick={() => setTab("customers")}>
          Customers
        </button>
      </div>

      <button
        type="button"
        className="openMenuBtn"
        onClick={() => setShowAdminNavBar(true)}
      >
        <img src={openImg} alt="open menu" />
      </button>

      {tab === "dashboard" && <Dashboard />}
      {tab === "products" && <Products clothesTypes={clothesTypes} />}
      {tab === "customers" && <CustomersList />}
    </div>
  );
}
