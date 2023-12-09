import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../../components/Form/CustomCheckbox";
import "./index.scss";

const AllBbreedsFilter = ({ setAllBreeder, allBreeder}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card className="breed-groups-filter">
            <div className="breeds-filter-input-wrap">
            <div className="breed-groups-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breed-groups-filter__title">Дополнительные</h5>
                <span className={`breed-groups-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <CustomCheckbox checked={allBreeder} name="allBreeder" id="allBreeder" label='Все породы' onChange={() => setAllBreeder(prevState => !prevState)}/>
            </CSSTransition>
            </div>
        </Card>
    )
};

export default memo(AllBbreedsFilter);