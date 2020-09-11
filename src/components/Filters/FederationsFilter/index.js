import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const FederationsFilter = ({federations, federation_ids, onChange}) => {
    const handleChange = id => {
        const federationIds = federation_ids.includes(id) ?
            federation_ids.filter(item => item !== id) :
            [...federation_ids, id];

        onChange(federationIds);
    };

    return (
        <div className="federations-filter">
            <h5 className="federations-filter__title">Федерации</h5>
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
        </div>
    )
};

export default React.memo(FederationsFilter);