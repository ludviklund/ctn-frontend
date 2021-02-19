import React, { useContext } from "react";
import PageSection from "./components/PageSection";
import DashboardJobs from "./components/dashboard/DashboardJobs";
import DashboardVehicles from "./components/dashboard/DashboardVehicles";
import { UserContext } from "./context/UserContext";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    return (
        <PageSection>
            <DashboardJobs />
            {user.accessLevel > 2 && <DashboardVehicles />}
        </PageSection>
    );
};

export default Dashboard;
