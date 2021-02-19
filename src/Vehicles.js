import React from "react";
import PageSection from "./components/PageSection";
import VehiclesCalendar from "./components/vehicles/VehiclesCalendar";
import VehiclesBooking from "./components/vehicles/VehiclesBooking";

const Vehicles = () => {
    return (
        <div>
            <PageSection>
                <VehiclesCalendar />
                <VehiclesBooking />
            </PageSection>
        </div>
    );
};

export default Vehicles;
