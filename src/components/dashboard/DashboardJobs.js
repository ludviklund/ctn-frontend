// Hovedkomponent for verktøy som viser dagens jobber for en ansatt

import React from "react";
import Header from "../Header";
import DashboardJobsTable from "./DashboardJobsTable";
import { Jumbotron } from "react-bootstrap";

const DashboardJobs = () => {
    return (
        <div className="container-fluid">
            <Header text="Today" />
            <Jumbotron>
                <DashboardJobsTable />
            </Jumbotron>
        </div>
    );
};

export default DashboardJobs;
