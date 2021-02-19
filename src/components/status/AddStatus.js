// Komponent som lar bruker legge til en ny status. Rendres i SetStatusTable.js

import React, { useState, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { nb } from "date-fns/locale";
import moment from "moment";
import { ApiContext } from "./../../api/ApiContext";

import "react-datepicker/dist/react-datepicker.css";

const AddStatus = ({ setUpdate }) => {
    // Datoer som brukes i forbindelse med kalenderne
    const today = new Date();
    today.setHours(12, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { addStatus } = useContext(ApiContext);
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState({
        resourceType: 1,
        description: "",
        dateStart: today,
        dateEnd: tomorrow,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addStatus(
            moment(status.dateStart).format("YYYY-MM-DDTHH:mm:ss.SSSSSSSZ"),
            moment(status.dateEnd).format("YYYY-MM-DDTHH:mm:ss.SSSSSSSZ"),
            status.resourceType,
            status.description
        )
            .then((res) => {
                console.log(res);
                handleOnClick(e);
                setUpdate(true);
            })
            .catch((e) => console.log(e));
    };

    // Gi status relevant verdi etter hvilket felt den blir kalt fra
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setStatus((prevStatus) => ({
            ...prevStatus,
            [name]: value,
        }));
    };

    // Gir dato relevant verdi
    const handleOnDateChange = (date, name) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [name]: date,
        }));
    };

    // Toggle mellom "Click here to add new status" og selve statusen
    const handleOnClick = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    if (!isEditing)
        return (
            <p onClick={handleOnClick} className="new-status">
                Click here to add a new status
            </p>
        );
    else
        return (
            <Form
                className="border-radius light-tint"
                style={{ padding: "12px" }}
            >
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
                        <Form.Control
                            name="description"
                            placeholder=""
                            onChange={(e) => handleOnChange(e)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="3">
                        <Form.Label>From</Form.Label>
                        <Form.Text>
                            <DatePicker
                                selected={status.dateStart}
                                onChange={(e) =>
                                    handleOnDateChange(e, "dateStart")
                                }
                                dateFormat="MMMM d, yyyy"
                            />
                            <DatePicker
                                selected={status.dateStart}
                                onChange={(e) =>
                                    handleOnDateChange(e, "dateStart")
                                }
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                locale={nb}
                            />
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} md="5">
                        <Form.Label>Until</Form.Label>
                        <Form.Text>
                            <DatePicker
                                selected={status.dateEnd}
                                onChange={(e) =>
                                    handleOnDateChange(e, "dateEnd")
                                }
                                minDate={status.dateStart}
                                dateFormat="MMMM d, yyyy"
                            />
                            <DatePicker
                                selected={status.dateEnd}
                                onChange={(e) =>
                                    handleOnDateChange(e, "dateEnd")
                                }
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="hh:mm"
                                locale={nb}
                            />
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} md="4" xs="12">
                        <Form.Label></Form.Label>
                        <br />
                        <br />
                        <Form.Text>
                            <Button
                                className="modal-button float-right btn-xs-block"
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
                                onClick={(e) => handleOnClick(e)}
                            >
                                Cancel
                            </Button>
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
};

export default AddStatus;
