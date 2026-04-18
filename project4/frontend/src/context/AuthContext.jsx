import { createContext, useState, useContext } from "react";

/*
this file allows all the components and pages to access the auth state.
this is used to check if the user has a saved session and keeps users logged in.
*/
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //checks if the user has a saved session
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null, //logged out
  );

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); //save the user to localStorage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user"); //remove the user from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); //cleaner when importing
