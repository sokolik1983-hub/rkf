import React from "react";
import Card from "../../Card";
import "./index.scss";


const UserBanner = ({link, canEdit}) => (
    <Card className="user-banner">
        {link &&
            <div className="user-banner__img" style={{background: `url(${link}) no-repeat center / cover`}}/>
        }
    </Card>
);

export default React.memo(UserBanner);