import React, { useState } from "react";
import { connectFilters } from "../../../connectors";
import './index.scss';


const ClubsSearch = ({ string_filter, setFilters }) => {
    const [searchValue, setSearchValue] = useState(string_filter);

    const onCancel = () => {
        setSearchValue('');
        setFilters({ string_filter: '', page: 1 });
    };

    const handleKeyDown = e => {
        if (searchValue && e.key === 'Enter') {
            setFilters({ string_filter: searchValue, page: 1 });
        } else if (e.key === 'Enter') {
            onCancel();
        }
    };

    return (
        <div className="clubs-search">
            <input
                placeholder="Поиск клубов по названию или городу"
                name="search"
                className="clubs-search__control"
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
            />
            {searchValue &&
                <button className="clubs-search__cancel" onClick={onCancel} />
            }
        </div>
    )
};

export default connectFilters(React.memo(ClubsSearch));