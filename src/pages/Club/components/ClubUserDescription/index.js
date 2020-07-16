import React, { useState } from "react";
import Card from "components/Card";
import { Collapse } from 'react-collapse';
import "./index.scss";


const UserDescription = ({ description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }
    return <Card className="user-description">
        <h4 className="user-description__title"
            title="РКФ не несет ответственности за достоверность данных, размещаемых клубом в данном разделе"
        >Описание</h4>
        <p className="user-description__info">
            <Collapse isOpened={isOpen}>{description}</Collapse>
            {!isOpen && <a className="user-description__show-more" href="/" onClick={handleClick}> </a>}
        </p>
    </Card>
};

export default React.memo(UserDescription);