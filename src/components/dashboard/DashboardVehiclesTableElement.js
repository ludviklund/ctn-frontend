// Komponent som representerer selve raden i en tabell. Får en id, navn på bil og tidspunkt for hvor lenge den er ledig.
// Legger også til komponent for popover for hver enkelt bil, slik at man kan hurtigbooke disse.

import React from "react";
import moment from "moment";
import DashboardVehiclePopover from "./DashboardVehiclePopover";
import { environment } from "./../../api/environment";

// Rendrer et element i table per entry i parent state
const DashboardVehicleTableElement = ({ id, name, availableUntil }) => {
    const availableString = moment(
        availableUntil,
        environment.moment_format
    ).format("[Available until ] MMMM Do YYYY, hh:mm");

    return (
        <>
            <tr>
                <td className="borderless">
                    <span className="table-element-header">{name}</span>
                    <br />
                    <span className="table-element-info">
                        {availableString !== "Invalid date" ? (
                            availableString
                        ) : (
                            <i className="text-muted">
                                Vehicle has no reservations in the nearest
                                future.
                            </i>
                        )}
                    </span>
                </td>
                <td className="borderless table-button d-none d-md-table-cell">
                    <DashboardVehiclePopover vehicleId={id} userId={name} />
                </td>
            </tr>
            <tr className="d-md-none">
                <td className="borderless no-padding-top">
                    <DashboardVehiclePopover
                        vehicleId={id}
                        userId={name}
                        mobile
                    />
                </td>
            </tr>
        </>
    );
};

export default DashboardVehicleTableElement;
