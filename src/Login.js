// Tar for seg bruker-login.

import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";
import EasySpinner from "./components/EasySpinner";
import { UserContext } from "./context/UserContext";
import PageSection from "./components/PageSection";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, isAuthorized } = useContext(UserContext);
    const buttonRef = React.createRef(); // Referanse til login-knapp så man kan logge inn med enter.

    const divStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    const validateForm = () => {
        // Veldig enkel validering av skjema, endrer til mer omfattende regex senere.
        return username.length > 0 && password.length > 0;
    };

    const handleOnKeyDown = (event) => {
        // For å koble "enter" til handleSubmit
        const buttonNode = buttonRef.current;
        if (event.keyCode === 13) buttonNode.click();
    };

    const handleSubmit = (event) => {
        // Logikk for login
        event.preventDefault();
        toast.dismiss();
        setIsLoading(true);

        login(username, password).catch((e) => {
            setIsLoading(false);
            if (e.response.status === 400) {
                toast.error(e.response.data);
            }
        });
    };

    if (isAuthorized) return <Redirect push to="/" />;
    return (
        <PageSection>
            <div style={divStyle}>
                <Form
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => handleOnKeyDown(e)}
                    onChange={validateForm}
                >
                    <Form.Group controlId="email">
                        <Form.Label>User</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button
                                variant={
                                    validateForm()
                                        ? "primary"
                                        : "outline-primary"
                                }
                                type="submit"
                                disabled={!validateForm() || isLoading}
                                ref={buttonRef}
                                block
                            >
                                {!isLoading ? (
                                    "Login"
                                ) : (
                                    <EasySpinner size="sm" />
                                )}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Text
                                className="text-muted"
                                style={{ textAlign: "center", display: "none" }}
                            >
                                Forgotten password?
                            </Form.Text>
                        </Col>
                    </Row>
                </Form>
            </div>
        </PageSection>
    );
};

export default Login;
