import { useEffect, useState } from "react";
import "../scss/dashboard.scss";
import axios from "axios";

export default function CustomersList() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((result) => setUsersList(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table className="customers">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {usersList &&
          usersList.map((user) => (
            <tr>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
