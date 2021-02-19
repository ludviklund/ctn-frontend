// Hovedkomponent for adminpanelet.

import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Header from "../Header";
import AllUsers from "./AllUsers";
import UsersWithoutWebAccess from "./UsersWithoutWebAccess";

const AdminPanel = () => {
    const [update, setUpdate] = useState(false);
    return (
        <div>
            <Header text="All users" />
            <Jumbotron>
                <AllUsers update={update} setUpdate={setUpdate} />
            </Jumbotron>
            <Header text="Users without web access" />
            <Jumbotron>
                <UsersWithoutWebAccess update={update} setUpdate={setUpdate} />
            </Jumbotron>
        </div>
    );
};

export default AdminPanel;
