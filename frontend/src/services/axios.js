import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const getAxiosInstance = () => {
  const { token } = useContext(UserContext);
  const auth = token ? `Bearer ${token}` : "";

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: { Authorization: auth },
  });

  return axiosInstance;
};

export default getAxiosInstance;
