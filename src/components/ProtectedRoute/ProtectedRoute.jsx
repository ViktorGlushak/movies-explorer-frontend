import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({element: Component, ...props}) {
  const loggedIn = props.loggedIn || Boolean(localStorage.getItem("token"));
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRouteElement;