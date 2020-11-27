import React from "react";
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({component: Component, isLogged, ...rest}) => {
    console.log("PR logged ", isLogged )
    return (
        <Route {...rest} render={
        props => isLogged ? <Component {...rest} {...props} /> : <Redirect to="/login" />

        }/>
    )
}

export default ProtectedRoute;