// Hovedkomponten for tabellen som viser ledige ansatte

import React from "react";
import Header from "../Header";
import { Jumbotron } from "react-bootstrap";
import AvailableEmployeesTable from "./AvailableEmployeesTable";

const AvailableEmployees = () => {
    return (
        <div>
            <Header text="Available Employees" />
            <Jumbotron>
                <AvailableEmployeesTable />
            </Jumbotron>
        </div>
    );
};

export default AvailableEmployees;
