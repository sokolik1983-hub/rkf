import React from "react";
import Select from "react-select";
import {setFiltersToUrl} from "../../../../utils";
import "./index.scss";


const BreedsFilter = ({breeds, BreedIds}) => (
    <div className="breeds-filter">
        <h5 className="breeds-filter__title">Породы</h5>
        <Select
            name="breeds"
            className="breeds-filter__select"
            classNamePrefix="breeds-filter"
            placeholder={breeds[0].label}
            value={BreedIds && BreedIds.length ? breeds.find(breed => breed.value === BreedIds[0]) : null}
            options={breeds}
            onChange={value => setFiltersToUrl({ExhibitionName: '', BreedIds: [value.value], PageNumber: 1})}
        />
    </div>
);

export default React.memo(BreedsFilter);