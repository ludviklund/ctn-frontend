// Komponent som henter data for dagens jobber for alle ansatte, og lager tabell for denne dataen.
// Hver jobb blir representert via AllJobsTableElement fra "../jobs/AllJobsTableElement"

import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import FadeIn from "react-fade-in";
import { ApiContext } from "./../../api/ApiContext";
import AllJobsTableElement from "./../jobs/AllJobsTableElement";
import EasySpinner from "../EasySpinner";

const StatusJobsTable = () => {
    const [jobs, setJobs] = useState();
    const { getAllJobsToday } = useContext(ApiContext);

    useEffect(() => {
        if (!jobs) {
            getAllJobsToday().then((res) => {
                setJobs(res.data);
            });
        }
    });

    if (!jobs)
        return (
            <div style={{ textAlign: "center" }}>
                <EasySpinner />
            </div>
        );
    else
        return (
            <FadeIn>
                <Table>
                    {jobs.map((project) => {
                        return (
                            <tbody key={project.idProject}>
                                <tr>
                                    <td className="borderless table-header">
                                        <b>{project.caption}</b>
                                    </td>
                                </tr>
                                {project.jobs.map((job, i) => {
                                    return (
                                        <AllJobsTableElement
                                            key={i}
                                            job={job}
                                            project={project}
                                        />
                                    );
                                })}
                            </tbody>
                        );
                    })}
                </Table>
            </FadeIn>
        );
};

export default StatusJobsTable;
