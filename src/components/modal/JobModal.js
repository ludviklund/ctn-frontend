// Skjelettet for modalen som viser informasjon om en jobb. Rendrer en knapp som trigger overlay.
// Har metoder hentet fra API for å godta, avslå eller kommentere jobber. Trenger en komponent som tar for seg kommentaren som skal sendes med på kommenter.
// Se dokumentasjon: https://react-bootstrap.github.io/components/modal/

import React, { Component } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import ModalContent from "./ModalContent";
import EasySpinner from "../EasySpinner";
import { ApiContext } from "./../../api/ApiContext";

class JobModal extends Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoadingAccept: false,
            isLoadingDecline: false,
            modalShow: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modalShow: !this.state.modalShow,
        });
    }

    handleAccept = (jobId) => {
        this.setState({ isLoadingAccept: true });
        this.context
            .acceptJob(jobId)
            .then((res) => {
                toast.success("Success!\nJob has been accepted.");
                this.setState({ isLoadingAccept: false });
            })
            .catch((err) => {
                toast.error(err.message);
                this.setState({ isLoadingAccept: false });
            });
    };

    handleDecline = (jobId) => {
        this.setState({ isLoadingDecline: true });
        this.context
            .declineJob(jobId)
            .then((res) => {
                toast.success("Success!\nJob has been declined.");
                this.setState({ isLoadingDecline: false });
            })
            .catch((err) => {
                toast.error(err.message);
                this.setState({ isLoadingDecline: false });
            });
    };

    handleComment = () => {
        toast.info("Sorry, this feature has not yet been implemented.");
    };

    render() {
        const { job, project } = this.props;
        const { isLoadingAccept, isLoadingDecline } = this.state;

        return (
            <>
                <Button
                    className="modal-button"
                    variant="outline-primary"
                    onClick={this.toggleModal}
                    block={this.props.mobile}
                >
                    {this.props.buttonText}
                </Button>
                <Modal
                    dialogClassName="job-modal"
                    show={this.state.modalShow}
                    onHide={this.toggleModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{job.caption}</Modal.Title>
                    </Modal.Header>
                    <ModalContent job={job} project={project} />
                    <Modal.Footer>
                        <Container>
                            <Row>
                                <Col
                                    md={4}
                                    xs={12}
                                    style={{ paddingTop: "2px" }}
                                >
                                    <Button
                                        variant="outline-success"
                                        onClick={() =>
                                            this.handleAccept(job.idJob)
                                        }
                                        block
                                        disabled={isLoadingAccept}
                                    >
                                        {isLoadingAccept ? (
                                            <EasySpinner size="sm" />
                                        ) : (
                                            "Accept"
                                        )}
                                    </Button>
                                </Col>
                                <Col
                                    md={4}
                                    xs={12}
                                    style={{ paddingTop: "2px" }}
                                >
                                    <Button
                                        variant="outline-danger"
                                        onClick={() =>
                                            this.handleDecline(job.idJob)
                                        }
                                        disabled={isLoadingDecline}
                                        block
                                    >
                                        {isLoadingDecline ? (
                                            <EasySpinner size="sm" />
                                        ) : (
                                            "Decline"
                                        )}
                                    </Button>
                                </Col>
                                <Col
                                    md={4}
                                    xs={12}
                                    style={{ paddingTop: "2px" }}
                                >
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.handleComment()}
                                        block
                                    >
                                        Comment
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default JobModal;
