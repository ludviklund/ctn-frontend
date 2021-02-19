// Hovedkomponent for siden som viser alle jobber.

import React from "react";
import { Jumbotron, Row, Col } from "react-bootstrap";
import Header from "../Header";
import AllJobsTable from "./AllJobsTable";

const AllJobs = () => {
    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <Header text="All jobs" />
                </Col>
            </Row>

            <Jumbotron>
                <AllJobsTable />
            </Jumbotron>
        </div>
    );
};

export default AllJobs;
