// Komponent for å hente ut liste over alle brukere uten web access, og gir mulighet for å gi web access til en gitt bruker.

import React, { useState, useEffect, useContext, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button, FormGroup, InputGroup } from "react-bootstrap";
import EasySpinner from "../EasySpinner";
import { ApiContext } from "../../api/ApiContext";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { toast } from "react-toastify";

const UsersWithoutWebAccess = ({ update, setUpdate }) => {
    const [allUsers, setAllUsers] = useState();
    const [activeUser, setActiveUser] = useState();
    const ref = useRef();
    const { getUsersWithoutWebAccess, grantWebAccess } = useContext(ApiContext);

    useEffect(() => {
        if (!allUsers || update) {
            getUsersWithoutWebAccess().then((res) => {
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
        grantWebAccess(idAddress, accessLvl)
            .then(() => {
                toast.success("Success!\nUser has been granted web access.");
                setUpdate(true);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    if (!allUsers || update)
        return (
            <div style={{ textAlign: "center" }}>
                <EasySpinner />
            </div>
        );
    else
        return (
            <FormGroup>
                <InputGroup>
                    <Typeahead
                        ref={ref}
                        id="usersWithoutWebAccessHead"
                        onChange={(e) => handleOnSelect(e)}
                        labelKey={(u) =>
                            u.firstname
                                ? `${u.firstname} ${u.surname}`
                                : u.company
                        }
                        options={allUsers}
                        placeholder="Search user"
                    />
                    <InputGroup.Append className="input-group-append">
                        <Button onClick={handleOnSubmit}>Grant Access</Button>
                    </InputGroup.Append>
                </InputGroup>
            </FormGroup>
        );
};

export default UsersWithoutWebAccess;
