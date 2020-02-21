import React from "react";
import Select from "react-select";
import { connectFilters } from "../../../../connectors";
import "./index.scss";

const BreedsFilter = ({ setFiltersSuccess, BreedIds, breeds }) => {

    const handleChange = value => {
        setFiltersSuccess({ BreedIds: [value.value], PageNumber: 1 });
    };

    return <div className="breeds-filter">
        <h5 className="breeds-filter__title">Породы</h5>
        <Select
            name="breeds"
            className="breeds-filter__select"
            classNamePrefix="breeds-filter"
            placeholder={breeds[0].label}
            value={BreedIds && BreedIds.length ? breeds.find(breed => breed.value === BreedIds[0]) : null}
            options={breeds}
            onChange={handleChange}
        />
    </div>
};

export default connectFilters(BreedsFilter);