import React, { useState } from "react";
import { setFiltersToUrl } from "../../../../utils";
import "./index.scss";


const SearchFilter = ({ StringFilter }) => {
    const [searchValue, setSearchValue] = useState(StringFilter);

    const onCancel = () => {
        setSearchValue('');
        setFiltersToUrl({ StringFilter: '' });
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter' && searchValue) {
            setFiltersToUrl({ StringFilter: searchValue.trim() });
        }
    };

    return (
        <div className="search-filter-specialists">
            <input
                placeholder="Поиск судьи по имени, дисциплине или городу"
                name="search"
                className={`search-filter-specialists__control _no_border`}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
            />
            {searchValue &&
                <button className="search-filter-specialists__cancel" onClick={onCancel} />
            }
        </div>
    )
};

export default React.memo(SearchFilter);