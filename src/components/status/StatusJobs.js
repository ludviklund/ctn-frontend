// Hovedkomponent for verktøy som viser alle jobber for alle brukere

import React from "react";
import Header from "../Header";
import { Jumbotron } from "react-bootstrap";
import StatusJobsTable from "./StatusJobsTable";

const StatusJobs = () => {
    return (
        <div>
            <Header text="Jobs today for all employees" />
            <Jumbotron>
                <StatusJobsTable />
            </Jumbotron>
        </div>
    );
};

export default StatusJobs;
