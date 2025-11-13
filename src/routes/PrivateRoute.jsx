import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import { Navigate, useLocation } from "react-router";
import { PacmanLoader } from "react-spinners";
import Loading from "../pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
