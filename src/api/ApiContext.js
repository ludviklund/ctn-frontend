import React, { useContext, createContext } from "react";
import axios from "axios";
import { environment } from "./environment";
import { UserContext } from "../context/UserContext";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const { checkAccessToken, getBearer } = useContext(UserContext);

    const getHeaders = () => {
        checkAccessToken();
        return {
            headers: {
                Authorization: getBearer(),
            },
        };
    };

    // preferences

    const getUserData = () => {
        // Hent ut data om brukeren, for å brukes på brukerinfo-side
        return axios.get(environment.api_get_user_data, getHeaders());
    };

    const updateUser = (newInfo) => {
        // Oppdater bruker med ny informasjon. Tar et objekt med verdier fra skjema
        const data = newInfo;
        return axios.post(environment.api_post_update_user, data, getHeaders());
    };

    // dashboard

    const getUserJobsToday = () => {
        // Hent ut liste for alle jobber en bruker er involvert med i dag
        return axios.get(environment.api_get_user_jobs_today, getHeaders());
    };

    const getAvailableVehicles = () => {
        // Hent ut liste med alle ledige kjøretøy
        return axios.get(environment.api_get_available_vehicles, getHeaders());
    };

    const quickBookVehicle = (idVehicle, hours) => {
        // Hurtigbooking av kjøretøy.
        const data = {
            idVehicle: idVehicle,
            hours: hours,
        };

        return axios.post(
            environment.api_post_book_vehicle,
            data,
            getHeaders()
        );
    };

    // jobs

    const getUserJobs = () => {
        // Hent ut liste for jobber bruker er involvært med i all fremtid
        return axios.get(environment.api_get_user_jobs, getHeaders());
    };

    const acceptJob = (jobId) => {
        // Godta jobbforespørsel
        return axios.get(
            environment.api_accept_job,
            {
                params: {
                    ResourceAllocationId: jobId,
                },
            },
            getHeaders()
        );
    };

    const declineJob = (jobId) => {
        // Avslå jobbforespørsel
        return axios.get(
            environment.api_decline_job,
            {
                params: {
                    ResourceAllocationId: jobId,
                },
            },
            getHeaders()
        );
    };

    const commentJob = (jobId, comment) => {
        // Legg til kommentar på jobb
        const data = {
            ResourceAllocationId: jobId,
            comment: comment,
        };

        return axios.post(environment.api_comment_job, data, getHeaders());
    };

    // status

    const getUserStatus = () => {
        // Hent ut alle statuser en bruker har registrert på seg selv
        return axios.get(environment.api_get_user_status, getHeaders());
    };

    const updateStatus = (
        // Oppdater en status med nye verdier
        IdResourceState,
        StartDate,
        EndDate,
        IdResourceStateType,
        Description
    ) => {
        const data = {
            IdResourceState: IdResourceState,
            StartDate: StartDate,
            EndDate: EndDate,
            IdResourceStateType: IdResourceStateType,
            Description: Description,
        };
        return axios.post(environment.api_update_status, data, getHeaders());
    };

    const addStatus = (
        // Legg til ny status
        StartDate,
        EndDate,
        IdResourceStateType,
        Description
    ) => {
        const data = {
            StartDate: StartDate,
            EndDate: EndDate,
            IdResourceStateType: IdResourceStateType,
            Description: Description,
        };
        return axios.post(environment.api_add_status, data, getHeaders());
    };

    const deleteStatus = (IdResourceState) => {
        // Slett en status
        const config = {
            headers: getHeaders().headers,
            params: {
                IdResourceState: IdResourceState,
            },
        };
        return axios.delete(environment.api_delete_status, config);
    };

    const getAllJobsToday = () => {
        // Hent ut alle jobber for i dag for alle ansatte
        return axios.get(environment.api_get_all_jobs_today, getHeaders());
    };

    const getAvailableEmployees = () => {
        // Hent ut liste med alle ledige ansatte
        return axios.get(environment.api_get_available_employees, getHeaders());
    };

    // admin

    const getUsers = () => {
        // Hent liste for alle brukere
        return axios.get(environment.api_get_users, getHeaders());
    };

    const getUsersWithoutWebAccess = () => {
        // Hent liste for alle brukere uten web access
        return axios.get(
            environment.api_get_users_without_web_access,
            getHeaders()
        );
    };

    const updateAccessLevel = (addressId, accessLevel) => {
        // Oppdater brukernivået for en bruker
        const data = {
            addressId: addressId,
            accessLevel: accessLevel,
        };

        return axios.post(
            environment.api_update_access_level,
            data,
            getHeaders()
        );
    };

    const grantWebAccess = (addressId) => {
        // Gi en bruker web access
        const config = {
            headers: getHeaders().headers,
            params: {
                addressId: addressId,
            },
        };

        return axios.get(environment.api_grant_web_access, config);
    };

    const revokeWebAccess = (addressId) => {
        // Fjern web access for en bruker
        let headers = getHeaders();
        const config = {
            headers: headers.headers,
            params: {
                addressId: addressId,
            },
        };
        return axios.get(environment.api_revoke_web_access, config);
    };

    return (
        <ApiContext.Provider
            value={{
                updateUser,
                getUserData,
                getUserJobs,
                getUserJobsToday,
                getAvailableVehicles,
                getUserStatus,
                getAllJobsToday,
                getAvailableEmployees,
                getUsers,
                getUsersWithoutWebAccess,
                acceptJob,
                declineJob,
                commentJob,
                updateStatus,
                updateAccessLevel,
                grantWebAccess,
                revokeWebAccess,
                addStatus,
                deleteStatus,
                quickBookVehicle,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;
