import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"]=auth?.token

  useEffect(()=>{
    const data=localStorage.getItem('auth')
    if(auth){
        const parseData=JSON.parse(data)
        setAuth({
            ...auth,
            user:parseData?.user,
            token:parseData?.token
        })
    }
  },[])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth is Custom Hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
