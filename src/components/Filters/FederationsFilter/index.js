import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Loading from "../../Loading";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const FederationsFilter = ({federations = [], federation_ids, onChange, loading = false}) => {
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
                <span className={`federations-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            {loading ?
                <Loading centered={false}/> :
                <CSSTransition
                    in={isOpen}
                    timeout={50}
                    unmountOnExit
                    classNames="dropdown__filters"
                >
                    {federations.length ?
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
                        </ul> :
                        <p className="federations-filter__no-options">Федераций не найдено</p>
                    }
                </CSSTransition>
            }
        </Card>
    )
};

export default memo(FederationsFilter);