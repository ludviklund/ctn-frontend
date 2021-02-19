// Komponent hvor alle statuser som ligger inne på bruker blir hentet, og lager en tabell av dette.
// Alle statuser blir lagt i status. Update blir brukt for å sjekke om komponenten må rendres på nytt,
// dette skal skje når en bruker lager en ny status eller endrer en som eksisterer.
// Effect Hook kjører på inital render, og deretter kun hvis status eller update endrer verdi.
// Hvis status blir satt til true rendrer komponenten på nytt, og den blir satt tilbake til false.

import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import FadeIn from "react-fade-in";
import { ApiContext } from "./../../api/ApiContext";
import SetStatusTableElement from "./SetStatusTableElement";
import AddStatus from "./AddStatus";
import EasySpinner from "../EasySpinner";

const SetStatusTable = () => {
    const [status, setStatus] = useState();
    const [update, setUpdate] = useState(false);
    const { getUserStatus } = useContext(ApiContext);

    useEffect(() => {
        if (!status || update) {
            getUserStatus().then((res) => {
                setStatus(res.data);
                if (update) {
                    // Fake lag så det ikke skal se så hakkete ut
                    setTimeout(() => {
                        // Sett tilbake til false etter oppdatering
                        setUpdate(false);
                    }, 1000);
                }
            });
        }
    }, [status, update]);

    if (!status || update)
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
                        {status.map((status, i) => {
                            return (
                                <SetStatusTableElement
                                    key={i}
                                    status={status}
                                    setUpdate={setUpdate}
                                />
                            );
                        })}
                    </tbody>
                </Table>
                <AddStatus setUpdate={setUpdate} />
            </FadeIn>
        );
};

export default SetStatusTable;
