// Komponent som gir en knapp med popover, her kan man hurtigleie en bil.
// Trenger støtte for at tabellen rendres på nytt når en bil bookes.

import React, { useState, useContext } from "react";
import TimePicker from "react-bootstrap-time-picker";
import { toast } from "react-toastify";
import { ApiContext } from "./../../api/ApiContext";
import {
    Popover,
    Button,
    OverlayTrigger,
    Col,
    Row,
    Spinner,
} from "react-bootstrap";

// Enkel meny for å leie bil fra dashboard. Aktiveres på button mouseclick.
const DashboardVehiclePopover = ({ vehicleId, userId, mobile }) => {
    const [time, setTime] = useState(1800);
    const [isLoading, setIsLoading] = useState(false);
    const { quickBookVehicle } = useContext(ApiContext);

    const handleTimeChange = (time) => {
        setTime(time);
    };

    const handleSubmit = () => {
        // TimePicker bruker av default sekunder. Gjør om til timer ved presentasjon.
        const timeInHours = time / 3600;

        // Http request som skal hurtigbooke bilen.
        setIsLoading(true);
        quickBookVehicle(vehicleId, time)
            .then((res) => {
                console.log(res);
                document.body.click(); // Enkel løsning for å lukke popover ved suksess
                toast.success(
                    `Success!\nVehicle ${userId} has been booked for the next ${timeInHours} hours.`
                );
                setTimeout(() => {
                    // Vent litt med å endre state så popover lukker seg før knappen går tilbake til vanlig
                    setIsLoading(false);
                }, 200);
            })
            .catch((e) => {
                console.log(e);
                toast.error(`${e}`, { autoClose: 10000 });
                setIsLoading(false);
            });
    };

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Quick rental</Popover.Title>
            <Popover.Content>
                <Row>
                    <Col>
                        <p>
                            Please enter how many hours you would like to rent
                            this vehicle. If you require rental longer than two
                            hours, you can do so from the vehicle page.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TimePicker
                            start="00:30"
                            end="02:00"
                            step={30}
                            format={24}
                            value={time}
                            onChange={handleTimeChange}
                        />
                    </Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                            onClick={!isLoading ? handleSubmit : undefined}
                            block
                        >
                            {!isLoading ? (
                                "Book vehicle"
                            ) : (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )}
                        </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={popover}
            rootClose={true}
        >
            <Button
                className="modal-button"
                variant="outline-primary"
                block={mobile}
            >
                Book
            </Button>
        </OverlayTrigger>
    );
};

export default DashboardVehiclePopover;
