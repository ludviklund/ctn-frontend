import React, { useContext } from "react";
import PageSection from "./components/PageSection";
import SetStatus from "./components/status/SetStatus";
import StatusJobs from "./components/status/StatusJobs";
import AvailableEmployees from "./components/status/AvailableEmployees";
import { UserContext } from "./context/UserContext";

const Preferences = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <PageSection>
                <SetStatus />
                {user.accessLevel > 2 && <StatusJobs />}
                {user.accessLevel > 2 && <AvailableEmployees />}
            </PageSection>
        </div>
    );
};

export default Preferences;
