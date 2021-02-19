// Gir info som representerer en ansatt. Tar person-objekt som props

import React from "react";
import moment from "moment";
import { environment } from "../../api/environment";

const ResourceElement = ({ person }) => {
    const dateStart = moment(
        person.dateStart,
        environment.moment_format
    ).format("DD.MM.YYYY");
    const dateEnd = moment(person.dateEnd, environment.moment_format).format(
        "DD.MM.YYYY"
    );

    return (
        <tr>
            <td className="borderless">
                <span
                    style={{
                        fontSize: "18px",
                        paddingBottom: "0",
                    }}
                >
                    {person.firstname
                        ? `${person.firstname} ${person.surname} `
                        : "Unknown User "}
                </span>
                <span style={{ fontSize: "14px" }}>
                    {"  "}
                    {person.resourceFunction}
                </span>
                <br />
                <p style={{ fontSize: "12px" }}>
                    {dateStart} - {dateEnd} / {person.phoneMobile} /{" "}
                    {person.email}
                </p>
            </td>
        </tr>
    );
};

export default ResourceElement;
