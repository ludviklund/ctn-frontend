// Komponent som behandler data for ledige biler, og lager tabell for visning
// Mapper gjennom elementer i vehicles, og rendrer DashboardVehicleTableElement for hver av disse

import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import FadeIn from "react-fade-in";
import EasySpinner from "../EasySpinner";
import DashboardVehiclesTableElement from "./DashboardVehiclesTableElement";
import { ApiContext } from "./../../api/ApiContext";

const DashboardVehiclesTable = () => {
    const [vehicles, setVehicles] = useState();
    const { getAvailableVehicles } = useContext(ApiContext);

    useEffect(() => {
        if (!vehicles) {
            getAvailableVehicles().then((res) => {
                setVehicles(res.data);
            });
        }
    });

    if (!vehicles)
        return (
            <div style={{ textAlign: "center" }}>
                <EasySpinner />
            </div>
        );
    else
        return (
            <FadeIn>
                <Table>
                    <tbody>
                        {vehicles.map((vehicle) => {
                            return (
                                <DashboardVehiclesTableElement
                                    key={vehicle.idVehicle}
                                    id={vehicle.idVehicle}
                                    name={vehicle.caption}
                                    availableUntil={vehicle.availableUntil}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            </FadeIn>
        );
};

export default DashboardVehiclesTable;
