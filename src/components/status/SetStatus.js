// Hovedkomponten for verktøy som lar bruker se alle statuser som ligger inne, endre statuser og også legge til nye

import React from "react";
import Header from "../Header";
import { Jumbotron } from "react-bootstrap";
import SetStatusTable from "./SetStatusTable";

const SetStatus = () => {
    return (
        <div>
            <Header text="Your status" />
            <Jumbotron>
                <SetStatusTable />
            </Jumbotron>
        </div>
    );
};

export default SetStatus;
