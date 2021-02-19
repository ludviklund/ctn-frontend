// Komponent for å hente ut liste over alle brukere, og enten fjerne web access eller oppdatere tilgangsnivåf for en gitt bruker.

import React, { useState, useEffect, useContext, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import EasySpinner from "../EasySpinner";
import { ApiContext } from "../../api/ApiContext";

import "react-bootstrap-typeahead/css/Typeahead.css";

const AllUsers = ({ update, setUpdate }) => {
    const [allUsers, setAllUsers] = useState();
    const [activeUser, setActiveUser] = useState();
    const ref = useRef();
    const { getUsers, updateAccessLevel, revokeWebAccess } = useContext(
        ApiContext
    );

    useEffect(() => {
        if (!allUsers || update) {
            getUsers().then((res) => {
                setAllUsers(res.data);
                if (update) setUpdate(false);
            });
        }
    }, [update]);

    const handleOnSelect = (e) => {
        e.map((user) => {
            setActiveUser(user);
            ref.current.blur();
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { idAddress, accessLvl } = activeUser;
        updateAccessLevel(idAddress, parseInt(accessLvl))
            .then((res) => {
                toast.success("Success!\nUser has been updated.");
                setActiveUser("");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const handleOnRevoke = (e) => {
        e.preventDefault();
        const { idAddress, accessLvl } = activeUser;
        revokeWebAccess(idAddress, accessLvl)
            .then(() => {
                toast.success(
                    "Success!\nWeb access for user has been revoked."
                );
                setUpdate(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const handleOnAccessLevelSelect = (e) => {
        const value = e.target.value;
        setActiveUser((prevStatus) => ({
            ...prevStatus,
            accessLvl: value,
        }));
    };

    if (!allUsers || update)
        return (
            <div style={{ textAlign: "center" }}>
                <EasySpinner />
            </div>
        );
    else
        return (
            <Form>
                <Form.Row>
                    <Col md="8">
                        <Form.Label>Find user</Form.Label>
                        <Typeahead
                            id="allUsersHead"
                            ref={ref}
                            clearButton
                            onChange={(e) => handleOnSelect(e)}
                            labelKey={(u) =>
                                u.firstname
                                    ? `${u.firstname} ${u.surname}`
                                    : u.company
                            }
                            options={allUsers}
                            placeholder="Search user"
                        />
                    </Col>
                    <Form.Group as={Col} md="4" controlId="formGridState">
                        <Form.Label>Access level</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => handleOnAccessLevelSelect(e)}
                            value={
                                !activeUser
                                    ? "Select user"
                                    : activeUser.accessLvl
                                    ? activeUser.accessLvl
                                    : 1
                            }
                            disabled={!activeUser}
                        >
                            <option>Select user</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <Button
                            style={{ marginLeft: "3px" }}
                            className="modal-button float-right"
                            variant="outline-primary"
                            type="submit"
                            onClick={(e) => handleOnSubmit(e)}
                        >
                            Save
                        </Button>
                        <Button
                            className="modal-button float-right"
                            variant="outline-danger"
                            type="submit"
                            onClick={(e) => handleOnRevoke(e)}
                            disabled={activeUser && !activeUser.accessLvl}
                        >
                            Revoke Access
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
};

export default AllUsers;
