import React, { useState, useEffect, useRef } from "react";
import Card from "components/Card";
import { Collapse } from 'react-collapse';
import "./index.scss";


const UserDescription = ({ description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const CollapseDescrRef = useRef(null);

    useEffect(() => {
        if (isHidden && CollapseDescrRef && CollapseDescrRef.current) {
            CollapseDescrRef.current.content.offsetHeight > 72 && setIsHidden(false);
        }
    }, [CollapseDescrRef]);

    const handleClick = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }
    return <Card className="user-description">
        <h4 className="user-description__title"
            title="РКФ не несет ответственности за достоверность данных, размещаемых клубом в данном разделе"
        >Описание</h4>
        <section className="user-description__info">
            <Collapse isOpened={isOpen} ref={CollapseDescrRef}>{description}</Collapse>
            {!isHidden && <a className={`user-description__show-more${isOpen ? ' opened' : ''}`} href="/" onClick={handleClick}></a>}
        </section>
    </Card>
};

export default React.memo(UserDescription);