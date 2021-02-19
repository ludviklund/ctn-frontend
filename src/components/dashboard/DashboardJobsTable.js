// Komponent som lager tabellen som skal vise data for alle jobbene bruker har i dag.
// Render DashboardJobsTableElement for hver enkelt jobb i jobs-state

import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import FadeIn from "react-fade-in";
import EasySpinner from "../EasySpinner";
import DashboardJobsTableElement from "./DashboardJobsTableElement";
import { ApiContext } from "./../../api/ApiContext";

const DashboardJobsTable = () => {
    const [jobs, setJobs] = useState();
    const { getUserJobsToday } = useContext(ApiContext);

    useEffect(() => {
        if (!jobs) {
            getUserJobsToday().then((res) => {
                // Legger alle jobbene inn i state
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
                    <tbody>
                        {
                            /* Mapper gjennom alle elementer i state */
                            jobs.map((project) => {
                                return project.jobs.map((job) => {
                                    return (
                                        <DashboardJobsTableElement
                                            key={job.idJob}
                                            job={job}
                                            project={project}
                                        />
                                    );
                                });
                            })
                        }
                    </tbody>
                </Table>
            </FadeIn>
        );
};

export default DashboardJobsTable;
