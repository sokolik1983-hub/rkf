import React from "react";
import Card from "../../../../components/Card";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";


const UserBanner = ({headliner_link}) => (
    <Card className="user-banner">
        <div
            className="user-banner__img"
            style={headliner_link ?
                {background: `url(${headliner_link}) no-repeat center / cover`} :
                {background: `url(${DEFAULT_IMG.emptyGallery}) no-repeat center / 150px`}
            }
        />
    </Card>
);

export default React.memo(UserBanner);