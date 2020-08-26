import React, {useState} from "react";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const SearchFilter = ({string_filter}) => {
    const [searchValue, setSearchValue] = useState(string_filter);

    const onCancel = () => {
        setSearchValue('');
        setFiltersToUrl({string_filter: ''});
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter' && searchValue) {
            setFiltersToUrl({string_filter: searchValue.trim()});
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