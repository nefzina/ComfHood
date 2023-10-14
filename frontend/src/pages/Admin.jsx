import { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";
import "../scss/admin.scss";
import Dashboard from "../components/Dashboard";
import CustomersList from "../components/CustomersList";

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [clothesTypes, setClothesTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/types`)
      .then((result) => setClothesTypes(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin">
      <div className="AdminNavBar">
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

      {tab === "dashboard" && <Dashboard />}
      {tab === "products" && <Products clothesTypes={clothesTypes} />}
      {tab === "customers" && <CustomersList />}
    </div>
  );
}
