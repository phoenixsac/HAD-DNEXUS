// ProtectedRoute.js
import React, { useContext, useEffect, useState } from "react";
import { Navigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, userType }) => {
  const { isLoggedIn, userType: contextUserType, loading} = useContext(AuthContext);


  // Handle potential null/undefined values from props and context
  const resolvedUserType = userType ;


  console.log("isLoggedIn",isLoggedIn);
  console.log("resolvedUserType", resolvedUserType);
  console.log("contextUserType", userType);
  console.log("loading", loading);


  if (loading) {
    return <div>Loading...</div>; // Display a loading state while data is fetched
  }

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />; // Redirect to login
  }

  if (resolvedUserType && resolvedUserType !== userType) {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page if user type doesn't match
  }

  return children; // Render the route content if authenticated and permitted
};

export default ProtectedRoute;
