// Rent innhold til modalen. Moment behandler datoer. Tar jobb- og prosjekt-objekt som props.

import React from "react";
import { Modal, Table } from "react-bootstrap";
import moment from "moment";
import { environment } from "../../api/environment";
import ResourceElement from "./ResourceElement";

const ModalContent = ({ job, project }) => {
    const dateStart = moment(job.dateStart, environment.moment_format).format(
        "DD.MM.YYYY"
    );
    const dateEnd = moment(job.dateEnd, environment.moment_format).format(
        "DD.MM.YYYY"
    );

    return (
        <div>
            <Modal.Body>
                <Table className="modal-table">
                    <tbody>
                        <tr>
                            <td className="borderless bold-font">
                                Project date
                            </td>
                            <td className="borderless">
                                {dateStart} - {dateEnd}
                            </td>
                        </tr>
                        <tr>
                            <td className="borderless bold-font">Job leader</td>
                            <td className="borderless">
                                {job.projectLeader.firstname}{" "}
                                {job.projectLeader.surname}
                            </td>
                        </tr>
                        <tr>
                            <td className="borderless bold-font">Status</td>
                            <td className="borderless">{job.jobState}</td>
                        </tr>
                        <tr>
                            <td className="borderless bold-font">
                                Service Type
                            </td>
                            <td className="borderless">{job.jobServiceType}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Body>
                <Table className="modal-table">
                    <tbody>
                        <tr>
                            <td className="boldt-font modal-table-header borderless">
                                <h5>Customer</h5>
                            </td>
                        </tr>
                        <tr>
                            <td className="borderless">
                                {project.customer.companyName && (
                                    <>
                                        {project.customer.companyName} <br />
                                    </>
                                )}
                                {job.deliveryAddress && (
                                    <>
                                        {job.deliveryAddress} <br />
                                    </>
                                )}
                                {job.deliveryNote && (
                                    <>
                                        {job.deliveryNote} <br />
                                    </>
                                )}
                                {project.customer.email && (
                                    <>
                                        {project.customer.email} <br />
                                    </>
                                )}
                                {project.customer.phoneMobile && (
                                    <>
                                        {project.customer.phoneMobile} <br />
                                    </>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Body style={{ maxHeight: "200px", overflowY: "scroll" }}>
                <Table className="modal-table">
                    <tbody>
                        <tr>
                            <td className="boldt-font modal-table-header borderless">
                                <h5>Resources</h5>
                            </td>
                        </tr>
                        {job.persons.map((person, i) => {
                            return (
                                <ResourceElement
                                    person={person}
                                    key={person.idAddress + i}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </div>
    );
};

export default ModalContent;
