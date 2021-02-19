// Returnerer en loading-indikator fra Bootstrap

import React from "react";
import { Spinner } from "react-bootstrap";

const EasySpinner = ({ size }) => {
    return <Spinner animation="border" size={size} role="status" />;
};

export default EasySpinner;
