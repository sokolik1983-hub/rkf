import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const FormatFilter = ({format_ids = [], onChange}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = id => {
        const formatIds = format_ids.includes(id) ? format_ids.filter(item => item !== id) : [...format_ids, id];
        onChange(formatIds);
    };

    return (
        <Card className="format-filter">
            <div className="format-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="format-filter__title">Формат</h5>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <ul className="format-filter__list">
                    <li>
                        <CustomCheckbox
                            id="format-filter-1"
                            label="Очное"
                            checked={format_ids.includes(1)}
                            onChange={() => handleChange(1)}
                        />
                    </li>
                    <li>
                        <CustomCheckbox
                            id="format-filter-2"
                            label="Заочное"
                            checked={format_ids.includes(2)}
                            onChange={() => handleChange(2)}
                        />
                    </li>
                </ul>
            </CSSTransition>
        </Card>
    )
};

export default memo(FormatFilter);