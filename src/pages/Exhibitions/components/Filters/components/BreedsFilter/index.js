import React, { useEffect, useState } from "react";
import Select from "react-select";
import Loading from "components/Loading";
import { Request } from "utils/request";
import { endpointExhibitionsBreeds } from "pages/Exhibitions/config";
import { connectFilters } from "pages/Exhibitions/connectors";
import "./index.scss";


const BreedsFilter = ({ setFiltersSuccess, BreedIds }) => {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({ url: endpointExhibitionsBreeds },
            data => {
                setBreeds(data.map(item => ({ value: item.id, label: item.name })));
                setLoading(false);
            }, error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
                setLoading(false);
            }))();
    }, []);

    const handleChange = value => {
        setFiltersSuccess({ BreedIds: [value.value], PageNumber: 1 });
    };

    return loading ?
        <Loading /> :
        <div className="breeds-filter">
            <h5 className="breeds-filter__title">Породы</h5>
            {!!breeds.length &&
                <Select
                    name="breeds"
                    className="breeds-filter__select"
                    classNamePrefix="breeds-filter"
                    placeholder={breeds[0].label}
                    value={BreedIds && BreedIds.length ? breeds.find(breed => breed.value === BreedIds[0]) : null}
                    options={breeds}
                    onChange={handleChange}
                />
            }
        </div>
};

export default connectFilters(BreedsFilter);