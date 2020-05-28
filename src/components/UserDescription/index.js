import React from "react";
import Card from "../Card";
import "./index.scss";


const UserDescription = ({description}) => (
    <Card className="user-description">
        <h4 className="user-description__title"
            title="РКФ не несет ответственности за достоверность данных, размещаемых клубом в данном разделе"
        >Описание</h4>
        <p className="user-description__info">{description}</p>
    </Card>
);

export default React.memo(UserDescription);