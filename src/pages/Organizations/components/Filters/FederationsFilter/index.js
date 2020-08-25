import React, {useEffect, useState} from "react";
import Loading from "../../../../../components/Loading";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {Request} from "../../../../../utils/request";
import {endpointGetFederations} from "../../../config";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const FederationsFilter = ({filtersValue}) => {
    const [federations, setFederations] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetFederations
        }, data => {
            setFederations(data.sort((a,b) => a.id - b.id));
            setLoading(false);
            window.scrollTo(0,0);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
            window.scrollTo(0,0);
        }))();
    }, []);

    const handleChange = id => {
        const federationIds = filtersValue.federation_ids.includes(id) ?
            filtersValue.federation_ids.filter(item => item !== id) :
            [...filtersValue.federation_ids, id];

        setFiltersToUrl({...filtersValue, federation_ids: federationIds});
    };

    return loading ?
        <Loading centered={false}/> :
        <div className="federations-filter">
            <h5 className="federations-filter__title">Федерации</h5>
            {federations && !!federations.length &&
                <ul className="federations-filter__list">
                    {federations.map(item => (
                        <li className="federations-filter__item" key={item.id}>
                            <CustomCheckbox
                                id={item.id}
                                label={item.short_name}
                                checked={filtersValue.federation_ids.includes(item.id)}
                                onChange={() => handleChange(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            }
        </div>
};

export default React.memo(FederationsFilter);