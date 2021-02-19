// Tabell for komponenten som viser ledige ansatte.
// Løkker gjennom eployees, og genererer HTML-kode ut i fra dette på en litt uortodoks måte. Bør fikses.

import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import FadeIn from "react-fade-in";
import { ApiContext } from "./../../api/ApiContext";
import EasySpinner from "../EasySpinner";

const AvailableEmployeesTable = () => {
    const [employees, setEmployees] = useState();
    const { getAvailableEmployees } = useContext(ApiContext);

    useEffect(() => {
        if (!employees) {
            getAvailableEmployees().then((res) => {
                setEmployees(res.data);
            });
        }
    });

    const createTable = () => {
        // Løkker gjennom employees. Idéen er at hvert tredje element skal avslutte rekken i tabellen, <tr><td><td><td></tr>
        let content = [`<tr>`];

        if (employees) {
            employees.forEach((person, i) => {
                let name =
                    person.firstname === null
                        ? "Unknown User"
                        : person.firstname + " " + person.surname;
                if ((i + 1) % 3 === 0)
                    content.push(
                        `<td class="borderless">${name}</td></tr><tr>`
                    );
                else content.push(`<td class="borderless">${name}</td>`);
            });
        }

        return content.join("");
    };

    if (!employees)
        return (
            <div style={{ textAlign: "center" }}>
                <EasySpinner />
            </div>
        );
    else
        return (
            <FadeIn>
                <Table>
                    <tbody>{ReactHtmlParser(createTable())}</tbody>
                </Table>
            </FadeIn>
        );
};

export default AvailableEmployeesTable;
