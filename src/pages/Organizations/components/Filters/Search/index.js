import React, {useState} from "react";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const SearchFilter = ({filtersValue}) => {
    const [searchValue, setSearchValue] = useState(filtersValue.string_filter);

    const onCancel = () => {
        setSearchValue('');
        setFiltersToUrl({...filtersValue, string_filter: ''});
    };

    const handleKeyDown = e => {
        if (searchValue && e.key === 'Enter') {
            setFiltersToUrl({...filtersValue, string_filter: searchValue.trim()});
        } else if (e.key === 'Enter') {
            onCancel();
        }
    };

    return (
        <div className="search-filter">
            <input
                placeholder="Поиск организации по названию или городу"
                name="search"
                className="search-filter__control"
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
            />
            {searchValue &&
                <button className="search-filter__cancel" onClick={onCancel} />
            }
        </div>
    )
};

export default React.memo(SearchFilter);