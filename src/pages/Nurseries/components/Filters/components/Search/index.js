import React, { useState } from "react";
import { connectFilters } from "../../../../connectors";
import './index.scss';


const NurseriesSearch = ({ string_filter, setFilters }) => {
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
        <div className="nurseries-search">
            <input
                placeholder="Поиск питомников по названию или городу"
                name="search"
                className="nurseries-search__control"
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
            />
            {searchValue &&
                <button className="nurseries-search__cancel" onClick={onCancel} />
            }
        </div>
    )
};

export default connectFilters(React.memo(NurseriesSearch));