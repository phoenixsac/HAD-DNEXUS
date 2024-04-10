// AuthContext.js
import React, { createContext, useState, useEffect } from "react";


const AuthContext = createContext({
  isLoggedIn: false,
  contextUserType: null,
  loading: false,
  setIsLoggedIn: () => {},
  setcontextUserType: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contextUserType, setcontextUserType] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading stat
  const [actorId, setActorId] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      // Assuming the token is valid, set the authentication state
      setIsLoggedIn(true);

      const storedUserType = sessionStorage.getItem("userType");
      setcontextUserType(storedUserType);
    }

    return () => {
      setLoading(false); // Ensure loading state is set to false before unmount
    };

  }, []);

  const setIsLoggedInFn = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    // setLoading(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: setIsLoggedInFn, contextUserType, setcontextUserType, actorId, setActorId , loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

