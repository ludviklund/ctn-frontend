// Komponent som representerer selve raden i en tabell. Får en jobb og et prosjekt som props, viser data ut i fra dette.
// Legger også til jobb-modalen for hver enkelt jobb, slik at man kan åpne opp og se all info om en jobb

import React from "react";
import moment from "moment";
import JobModal from "../modal/JobModal";
import { environment } from "./../../api/environment";

const AllJobsTableElement = ({ job, project }) => {
    const startHour = moment(job.dateStart, environment.moment_format).format(
        "hh:mm"
    );
    const endHour = moment(job.dateEnd, environment.moment_format).format(
        "hh:mm"
    );

    return (
        <>
            <tr>
                <td className="borderless">
                    <span className="table-element-header">{job.caption}</span>
                    <br />
                    <span className="table-element-info">
                        {startHour}
                        {" - "}
                        {endHour}
                        {", "}
                        {job.jobState}
                        {", "}
                        {job.jobServiceType}
                    </span>
                </td>
                <td className="borderless table-button d-none d-md-table-cell">
                    <JobModal
                        buttonText="Show job"
                        job={job}
                        project={project}
                    />
                </td>
            </tr>
            <tr className="d-md-none">
                <td className="borderless no-padding-top">
                    <JobModal
                        job={job}
                        project={project}
                        buttonText="Show job"
                        mobile
                    />
                </td>
            </tr>
        </>
    );
};

export default AllJobsTableElement;
