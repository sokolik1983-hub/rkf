import React from "react";
import {withRouter} from "react-router-dom";
import UploadedDocuments from "components/UploadedDocuments";

import "./styles.scss";

const Content = ({ location, match, canEdit }) => {

    return (
        <>
            <div className="UploadedDocuments">
                <UploadedDocuments location={location} match={match} canEdit={canEdit} />
            </div>
        </>
    )
};

export default withRouter(React.memo(Content));