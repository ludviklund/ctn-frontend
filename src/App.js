// Spesifiserer for det meste Routes. Gir også alle komponenter tilgang til Api- og UserContext.

import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { ApiProvider } from "./api/ApiContext";
import NavBar from "./components/NavBar";
import Dashboard from "./Dashboard";
import Jobs from "./Jobs";
import Login from "./Login";
import Preferences from "./Preferences";
import Status from "./Status";
import Vehicles from "./Vehicles";
import Admin from "./Admin";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * TODO-liste for videreutvikling
 * - Lag vehicles-side
 * - Gjør modal penere
 * - Legg til støtte for hurtigbooking av biler via api
 * - Legg til støtte for glemt passord
 */

const Main = withRouter(({ location }) => {
    return (
        <>
            {location.pathname !== "/login" && <NavBar />}
            <ToastContainer className="alert-container" autoClose={8000} />
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/jobs" component={Jobs} />
                <PrivateRoute
                    exact
                    path="/preferences"
                    component={Preferences}
                />
                <PrivateRoute exact path="/status" component={Status} />
                <PrivateRoute exact path="/vehicles" component={Vehicles} />
                <PrivateRoute exact path="/admin" component={Admin} />
                <PrivateRoute component={PageNotFound} />
            </Switch>
        </>
    );
});

const App = () => {
    return (
        <UserProvider>
            <ApiProvider>
                <div className="App">
                    <Main />
                </div>
            </ApiProvider>
        </UserProvider>
    );
};

export default App;
