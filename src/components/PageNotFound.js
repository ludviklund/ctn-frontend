// Side som viser en egen 404 not found-melding dersom path i URL ikke finnes i noen av våre Routes.

import React from "react";

const PageNotFound = () => {
    const divStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
    };

    return (
        <div className="page-not-found text-muted" style={divStyle}>
            <h1>Error 404: Page not found.</h1>
        </div>
    );
};

export default PageNotFound;
