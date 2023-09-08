import { useEffect, useState } from "react";
import axios from "axios";
import AddWindow from "../components/AddWindow";

export default function Admin() {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/clothes`);
  }, []);
  return (
    <>
      <button type="button" onClick={() => setIsShown(!isShown)}>
        Add article
      </button>
      {isShown && <AddWindow />}
    </>
  );
}
