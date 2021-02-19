// Komponent som plasserer innhold midt på siden. Hvor bred denne boksen med innhold skal være kan spesifiseres via props.
// En typisk rad i Bootstrap har 12 kolonner, for å midtstille må man ta 12 - antall kolonner innholdet tar, også dele det på to
// slik at man får jevnt antall tomme kolonner på hver side.

import React from "react";
import FadeIn from "react-fade-in";
import { Container, Row, Col } from "react-bootstrap";

const PageSection = ({ span, children }) => {
    const offset = (12 - span) / 2;
    return (
        <FadeIn transitionDuration={200}>
            <Container>
                <Row>
                    <Col md={{ span: span, offset: offset }}>{children}</Col>
                </Row>
            </Container>
        </FadeIn>
    );
};

PageSection.defaultProps = {
    span: 8,
};

export default PageSection;
