import { createContext, useMemo, useState } from "react";
import { PropTypes } from "prop-types";

const UserContext = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const contextValue = useMemo(
    () => ({ user, setUser, token, setToken, cartItems, setCartItems }),
    [user, setUser, cartItems, setCartItems]
  );

  // const contextCartItems = useMemo(
  //   () => ({ cartItems, setCartItems }),
  //   [cartItems, setCartItems]
  // );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default UserContext;
