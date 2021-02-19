import React from "react";
import PageSection from "./components/PageSection";
import PreferencesSection from "./components/preferences/PreferencesSection";

const Preferences = () => {
    return (
        <div>
            <PageSection>
                <PreferencesSection />
            </PageSection>
        </div>
    );
};

export default Preferences;
