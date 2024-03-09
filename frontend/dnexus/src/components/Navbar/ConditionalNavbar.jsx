import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";

import Navbar from "./Navbar";
import LoginNav from "./LoginNav";

const ConditionalNavbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("Nav-isLoggedIn:",isLoggedIn);

  return (
    <div>
      {isLoggedIn ? <LoginNav /> : <Navbar />}
    </div>
  );
};

export default ConditionalNavbar;
