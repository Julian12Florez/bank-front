import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoutes = ({ component, ...props }) => {
    const Component = component;
    const isAuthenticated = localStorage.getItem("token") ? true : false;
    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: "/login" }} />
    );
};

export default ProtectedRoutes;
