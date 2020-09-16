import React, { useState } from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "../../Card";
import "./index.scss";


const FederationsFilter = ({ federations, federation_ids, onChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = id => {
        const federationIds = federation_ids.includes(id) ?
            federation_ids.filter(item => item !== id) :
            [...federation_ids, id];

        onChange(federationIds);
    };

    return (
        <Card className="federations-filter">
            <div className="federations-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="federations-filter__title">Федерации</h5>
                <span className={`federations-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={350}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <>
                    {federations && !!federations.length &&
                        <ul className="federations-filter__list">
                            {federations.map(item => (
                                <li className="federations-filter__item" key={item.id}>
                                    <CustomCheckbox
                                        id={item.id}
                                        label={item.short_name}
                                        checked={federation_ids.includes(item.id)}
                                        onChange={() => handleChange(item.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    }
                </>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(FederationsFilter);