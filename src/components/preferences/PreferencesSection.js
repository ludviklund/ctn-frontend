// Hovedkomponent for siden som viser skjema for å endre brukerinformasjon.

import React from "react";
import { Jumbotron } from "react-bootstrap";
import Header from "./../Header";
import PreferencesForm from "./PreferencesForm";

const PreferencesSection = () => {
    return (
        <div className="container-fluid">
            <Header text="Your information" />
            <Jumbotron>
                <PreferencesForm />
            </Jumbotron>
        </div>
    );
};

export default PreferencesSection;
