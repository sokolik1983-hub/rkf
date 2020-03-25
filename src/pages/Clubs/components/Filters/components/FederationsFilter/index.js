import React, {useEffect, useState} from "react";
import Loading from "components/Loading";
import CustomCheckbox from "components/Form/CustomCheckbox";
import {Request} from "utils/request";
import {endpointGetFederations} from "../../../../config";
import {connectFilters} from "../../../../connectors";
import "./index.scss";


const FederationsFilter = ({federation_ids, setFilters}) => {
    const [federations, setFederations] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetFederations
        }, data => {
            setFederations(data.sort((a,b) => a.id - b.id));
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    const handleChange = (id) => {
        const federationIds = federation_ids.includes(id) ?
            federation_ids.filter(item => item !== id) :
            [...federation_ids, id];

        setFilters({federation_ids: federationIds, page: 1});
    };

    return loading ?
        <Loading/> :
        <div className="federations-filter">
            <h4 className="federations-filter__title">Федерации</h4>
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
};

export default connectFilters(React.memo(FederationsFilter));
