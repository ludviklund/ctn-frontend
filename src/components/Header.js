// Komponent som returnerer en header med teksten som blir gitt som props.

import React from "react";

const Header = ({ text }) => {
    return <h2 className="dash-header">{text}</h2>;
};

export default Header;
