// Skjema for å endre brukerinformasjon. Blir forhåndsutfylt med informasjonen til brukeren.
// Bruker React Hook Form for å hente ut data, og for enkel validering av felter.
// Dokumentasjon: https://react-hook-form.com/

import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ApiContext } from "./../../api/ApiContext";
import EasySpinner from "../EasySpinner";

const PreferencesSection = () => {
    const [userData, setUserData] = useState();
    const { getUserData, updateUser } = useContext(ApiContext);
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        if (!userData) {
            getUserData().then((res) => {
                setUserData(res.data);
            });
        }
    });

    const clean = (obj) => {
        // Brukes for å renske objektet som blir sendt til API for tomme verdier.
        for (var propName in obj) {
            if (
                obj[propName] === null ||
                obj[propName] === undefined ||
                obj[propName] === ""
            ) {
                delete obj[propName];
            }
        }
    };

    const onSubmit = (data) => {
        clean(data);
        updateUser(data)
            .then(() => {
                toast.success(`Success!\nYour information has been updated.`);
                setUserData(data);
                window.scrollTo(0, 0); // For å scrolle til toppen, gir mer flyt i siden
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    if (!userData)
        return (
            <div style={{ textAlign: "center" }}>
                <EasySpinner />
            </div>
        );
    else
        return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label>
                            First name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            name="FirstName"
                            defaultValue={userData.firstName}
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /[a-åA-Å]+(?:(?:\. |[' ])[a-åA-Å]+)*/i,
                                    message: "Invalid name",
                                },
                            })}
                        />
                        {errors.FirstName && (
                            <p className="text-danger error-text">
                                {errors.FirstName.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSurname">
                        <Form.Label>
                            Surname <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            name="Surname"
                            defaultValue={userData.surname}
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /[a-åA-Å]+(?:(?:\. |[' ])[a-åA-Å]+)*/i,
                                    message: "Invalid name",
                                },
                            })}
                        />
                        {errors.Surname && (
                            <p className="text-danger error-text">
                                {errors.Surname.message}
                            </p>
                        )}
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formEmail">
                    <Form.Label>
                        Email address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        name="Email"
                        type="email"
                        defaultValue={userData.email}
                        ref={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.Email && (
                        <p className="text-danger error-text">
                            {errors.Email.message}
                        </p>
                    )}
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>
                        Phone number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        name="MobilePhone"
                        defaultValue={userData.mobilePhone}
                        ref={register({
                            required: "Required",
                            pattern: {
                                value: /^\+?((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/i,
                                message: "Invalid phone number",
                            },
                        })}
                    />
                    {errors.MobilePhone && (
                        <p className="text-danger error-text">
                            {errors.MobilePhone.message}
                        </p>
                    )}
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        name="Street"
                        defaultValue={userData.street}
                        ref={register}
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formZip">
                        <Form.Label>Zip code</Form.Label>
                        <Form.Control
                            name="Zip"
                            defaultValue={userData.zip}
                            ref={register}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            name="City"
                            defaultValue={userData.city}
                            ref={register}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formEmergencyContacts">
                    <Form.Label>Emergency Contacts</Form.Label>
                    <Form.Control
                        name="EmergencyContacts"
                        defaultValue={userData.emergencyContacts}
                        ref={register}
                    />
                </Form.Group>
                <Form.Group controlId="formDriverLicenseClasses">
                    <Form.Label>Driver license classes</Form.Label>
                    <Form.Control
                        name="DriverLicenseClasses"
                        defaultValue={userData.driverLicenseClasses}
                        ref={register}
                    />
                </Form.Group>
                <Form.Group controlId="formCurrentPassword">
                    <Form.Label>Current password</Form.Label>
                    <Form.Control
                        ref={register}
                        type="password"
                        name="Password"
                    />
                    <Form.Text className="text-muted">
                        Enter your password here if you wish to change your
                        password.
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formNewPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            ref={register}
                            type="password"
                            name="NewPassword"
                        />
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        xs={12}
                        controlId="formConfirmNewPassword"
                    >
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control
                            type="password"
                            name="NewPasswordConfirm"
                        />
                    </Form.Group>
                </Form.Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Save changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
};

export default PreferencesSection;
