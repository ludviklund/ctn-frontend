// Hovedkomponent for verktøyet som viser tabell over ledige kjøretøy

import React from "react";
import Header from "../Header";
import DashboardVehiclesTable from "./DashboardVehiclesTable";
import { Jumbotron } from "react-bootstrap";

const DashboardVehicles = () => {
    return (
        <div className="container-fluid">
            <Header text="Available Vehicles" />
            <Jumbotron>
                <DashboardVehiclesTable />
            </Jumbotron>
        </div>
    );
};

export default DashboardVehicles;
