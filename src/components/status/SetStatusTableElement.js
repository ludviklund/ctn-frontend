// Et element som representerer en status. Rendrer EditStatus og sender med handleOnClick, status og setUpdate som props.

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import EditStatus from "./EditStatus";
import { environment } from "./../../api/environment";

// Rendrer et element i table per entry i parent state
const DashboardJobsTableElement = ({ status, setUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const startDate = moment(
        status.startDate,
        environment.moment_format
    ).format("DD.MM.YYYY, HH:mm");
    const endDate = moment(status.endDate, environment.moment_format).format(
        "DD.MM.YYYY, HH:mm"
    );

    const handleOnClick = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    if (isEditing)
        return (
            <EditStatus
                status={status}
                setUpdate={setUpdate}
                onClick={handleOnClick}
            />
        );
    else
        return (
            <>
                <tr>
                    <td className="borderless">
                        <span className="table-element-header">
                            {status.resourceStateType} - {status.description}
                        </span>
                        <br />
                        <span className="table-element-info">
                            {startDate} - {endDate}
                        </span>
                    </td>
                    <td className="borderless table-button d-none d-md-table-cell">
                        <Button
                            className="modal-button"
                            variant="outline-primary"
                            onClick={(e) => handleOnClick(e)}
                        >
                            Edit
                        </Button>
                    </td>
                </tr>
                <tr className="d-md-none">
                    <td className="borderless no-padding-top">
                        <Button
                            className="modal-button"
                            variant="outline-primary"
                            onClick={(e) => handleOnClick(e)}
                            block
                        >
                            Edit
                        </Button>
                    </td>
                </tr>
            </>
        );
};

export default DashboardJobsTableElement;
