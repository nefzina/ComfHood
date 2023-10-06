import { createContext, useMemo, useState } from "react";
import { PropTypes } from "prop-types";

const UserContext = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const contextValue = useMemo(
    () => ({ user, setUser, token, setToken }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default UserContext;
