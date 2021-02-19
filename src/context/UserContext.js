// Context som tar for seg alt som har med brukeren å gjøre. Henter først ut informasjonen til brukeren som
// matcher brukernavn og passord som blir oppgitt på Login. Deretter blir verdiene lagret i local storage til browser,
// så vi ikke mister det til senere. Forskjellige funksjoner for å logge ut og oppdatere tokens.
// En rerender her gjør at alle consumere rerendres, feks PrivateRoute som gjør sjekk på isAuthorized.

import React, { useState, createContext, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { environment } from "./../api/environment";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const localAuthorized = JSON.parse(localStorage.getItem("authorized"));
    const [user, setUser] = useState(localUser ? localUser : "");
    const [isAuthorized, setIsAuthorized] = useState(
        localAuthorized ? localAuthorized : false
    );

    // Kjører når brukerinfo eller autorisjonsverdien endres.
    useEffect(() => {
        if (isAuthorized) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authorized", isAuthorized);
        } else {
            localStorage.clear();
        }
    }, [user, isAuthorized]);

    const login = (username, password) => {
        const data = {
            username: username,
            password: password,
        };

        return axios.post(environment.api_login, data).then((res) => {
            if (res.status === 200) {
                setCurrentUser(res.data);
            }
        });
    };

    // Trigger useEffect så brukeren blir logget ut og tvinger rerender på komponent og alle consumers
    const logOut = () => {
        setIsAuthorized(false);
    };

    const setCurrentUser = (user) => {
        const newUser = {
            id: user.userIdMt,
            fullName: user.fullName,
            accessLevel: user.accessLevel,
            accessToken: user.accessToken,
            accessTokenExpiry: user.accessTokenExpiry,
            refreshToken: user.refreshToken,
        };
        setIsAuthorized(true);
        setUser(newUser);
    };

    const updateAccessToken = () => {
        // Oppdater accesstoken til bruker
        const data = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken.token,
        };

        axios
            .post(environment.api_refresh_token, data)
            .then((res) => {
                setUser((prevState) => ({
                    ...prevState,
                    accessToken: res.data.accessToken,
                    accessTokenExpiry: res.data.accessTokenExpiry,
                    refreshToken: res.data.refreshToken,
                }));
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

    const checkAccessToken = () => {
        if (!user) return false;

        let currentDate = moment();
        let accessTokenExpiry = moment(
            user.accessTokenExpiry,
            environment.moment_format
        );
        let refreshTokenExpiry = moment(
            user.refreshToken.expiration,
            environment.moment_format
        );

        if (refreshTokenExpiry.isBefore(currentDate)) {
            // Refreshtoken er ikke lenger gyldig. Bruker må logge inn på nytt for å få utskrevet en ny.
            setIsAuthorized(false);
        } else if (accessTokenExpiry.isBefore(currentDate)) {
            // Token er ikke gyldig, så den blir oppdatert.
            updateAccessToken();
        }
    };

    // For å få authorizationfelt til header. Skal være på format "Bearer " + token
    const getBearer = () => {
        return "Bearer " + user.accessToken;
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setCurrentUser,
                setUser,
                isAuthorized,
                setIsAuthorized,
                login,
                logOut,
                checkAccessToken,
                getBearer,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
