// Komponent for å endre en status. Tar status-objekt, og funksjonene onClick og setUpdate som props.
// onClick er funksjonen for å toggle mellom isEditing i parent, som enten rendrer verktøyet for å endre status, eller knappen "Edit".
// setUpdate er funksjon fra SetStatusTable som trigges når bruker lagrer en endring, denne får hele komponenten til å rendres på nytt, slik at
// ny data blir hentet fra server.

import React, { useState, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { nb } from "date-fns/locale";
import moment from "moment";
import { toast } from "react-toastify";
import { ApiContext } from "./../../api/ApiContext";

import "react-datepicker/dist/react-datepicker.css";

const EditStatus = ({ status, onClick, setUpdate }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { updateStatus, deleteStatus } = useContext(ApiContext);
    const [userStatus, setUserStatus] = useState({
        resourceType: 1,
        description: status.description,
        dateStart: new Date(status.startDate),
        dateEnd: new Date(status.endDate),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const startTmp = moment(userStatus.dateStart).format(
            "YYYY-MM-DDTHH:mm:ss.SSSSSSSZ"
        );
        const endTmp = moment(userStatus.dateEnd).format(
            "YYYY-MM-DDTHH:mm:ss.SSSSSSSZ"
        );

        updateStatus(
            status.idResourceState,
            startTmp,
            endTmp,
            userStatus.resourceType,
            userStatus.description
        )
            .then(() => {
                toast.success("Success!\nThe status has been updated.");
                setUpdate(true); // Metode fra grandparent som rendrer hele komponenten på nytt
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    "Error!\nMake sure you filled out every field with the necessary information."
                );
            });
    };

    const handleOnDelete = () => {
        deleteStatus(status.idResourceState)
            .then((res) => {
                toast.success("Success!\nStatus has been deleted.");
                setUpdate(true);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserStatus((prevStatus) => ({
            ...prevStatus,
            [name]: value,
        }));
    };

    const handleOnDateChange = (date, name) => {
        setUserStatus((prevStatus) => ({
            ...prevStatus,
            [name]: date,
        }));
    };

    return (
        <tr>
            <td colSpan="2" className="borderless border-radius light-tint">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                name="resourceType"
                                as="select"
                                value="Choose..."
                                onChange={(e) => handleOnChange(e)}
                            >
                                <option>Ferie</option>
                                <option>Avspasering</option>
                                <option>Sykdom</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="9">
                            <Form.Label>Description</Form.Label>
                            <a
                                className="float-right text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={handleOnDelete}
                            >
                                Delete this status
                            </a>
                            <Form.Control
                                name="description"
                                value={userStatus.description}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>From</Form.Label>
                            <Form.Text>
                                <DatePicker
                                    selected={userStatus.dateStart}
                                    onChange={(e) =>
                                        handleOnDateChange(e, "dateStart")
                                    }
                                    dateFormat="MMMM d, yyyy"
                                />
                                <DatePicker
                                    selected={userStatus.dateStart}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="HH:mm"
                                    locale={nb}
                                    onChange={(e) =>
                                        handleOnDateChange(e, "dateStart")
                                    }
                                />
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="5">
                            <Form.Label>Until</Form.Label>
                            <Form.Text>
                                <DatePicker
                                    selected={userStatus.dateEnd}
                                    onChange={(e) =>
                                        handleOnDateChange(e, "dateEnd")
                                    }
                                    minDate={userStatus.dateStart}
                                    dateFormat="MMMM d, yyyy"
                                />
                                <DatePicker
                                    selected={userStatus.dateEnd}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="HH:mm"
                                    locale={nb}
                                    onChange={(e) =>
                                        handleOnDateChange(e, "dateEnd")
                                    }
                                />
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="4" xs="12">
                            <Form.Label></Form.Label>
                            <br />
                            <br />
                            <Form.Text>
                                <Button
                                    className="modal-button float-right"
                                    variant="outline-primary"
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ marginRight: "3px" }}
                                    className="modal-button float-right"
                                    variant="outline-secondary"
                                    type="submit"
                                    onClick={(e) => onClick(e)}
                                >
                                    Cancel
                                </Button>
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </td>
        </tr>
    );
};

export default EditStatus;
