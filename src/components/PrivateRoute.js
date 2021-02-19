// En egen Route hvor vi kan legge til egne regler.
// Fungerer akkurat som en vanlig Route, hvor man kan spesifisere en path og komponent,
// men sjekker i tillegg om bruker er autorisert og om tokens har gått ut.

import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthorized, checkAccessToken } = useContext(UserContext);

    if (isAuthorized) checkAccessToken();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            // Sende med informasjon om hvilken side de ble omdirigert fra
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
