import React from "react";
import Card from "../../../../components/Card";
import './index.scss';


const ClubDescription = ({description}) => (
    <Card className="club-page__description">
        <h4 className="club-page__description-title"
            title="РКФ не несет ответственности за достоверность данных, размещаемых клубом в данном разделе"
        >Описание</h4>
        <p className="club-page__description-info">{description}</p>
    </Card>
);

export default React.memo(ClubDescription);