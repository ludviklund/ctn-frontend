// Komponent som behandler data for alle jobber, og lager tabell for visning
// Mapper gjennom elementer i jobs, og rendrer AllJobsTableElement for hver av disse

import React, { useState, useEffect, useContext } from "react";
import FadeIn from "react-fade-in";
import { Table } from "react-bootstrap";
import AllJobsTableElement from "./AllJobsTableElement";
import EasySpinner from "../EasySpinner";
import { ApiContext } from "./../../api/ApiContext";

const AllJobsTable = () => {
    const [jobs, setJobs] = useState();
    const { getUserJobs } = useContext(ApiContext);

    useEffect(() => {
        if (!jobs) {
            getUserJobs()
                .then((res) => {
                    console.log(res);
                    setJobs(res.data);
                })
                .catch((err) => {
                    console.log(err);
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
            <FadeIn transitionDuration={200}>
                <Table>
                    {jobs.map((project) => {
                        return (
                            <tbody key={project.idProject}>
                                <tr>
                                    <td className="borderless table-header">
                                        <b>{project.caption}</b>
                                    </td>
                                </tr>
                                {project.jobs.map((job) => {
                                    return (
                                        <AllJobsTableElement
                                            key={job.idJob}
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

export default AllJobsTable;
