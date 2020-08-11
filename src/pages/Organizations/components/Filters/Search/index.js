import React, {useState} from "react";
import {connectFilters} from "../../../connectors";
import './index.scss';


const SearchFilter = ({string_filter, setFilters}) => {
    const [searchValue, setSearchValue] = useState(string_filter);

    const onCancel = () => {
        setSearchValue('');
        setFilters({string_filter: ''});
    };

    const handleKeyDown = e => {
        if (searchValue && e.key === 'Enter') {
            setFilters({string_filter: searchValue});
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

export default connectFilters(React.memo(SearchFilter));