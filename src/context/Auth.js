import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();
const attryb = JSON.parse(localStorage.getItem('attryb'))||''
function AuthContextProvider({ children }) {
  const [isAuth,setIsAuth] = useState(attryb==''?false : true);
  const [user , setUser] = useState(attryb=='' ? {} : attryb)
  function toggleAuth() {
    setIsAuth(!isAuth)
  }

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuth ,user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;