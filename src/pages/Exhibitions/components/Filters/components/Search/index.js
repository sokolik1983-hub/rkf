import React, { useEffect, useState } from "react";
import { connectFilters } from "pages/Exhibitions/connectors";
import './index.scss';


const ExhibitionsSearch = ({ ExhibitionName, setFiltersSuccess }) => {
    const [searchValue, setSearchValue] = useState(ExhibitionName);

    const onCancel = () => {
        setSearchValue('');
        setFiltersSuccess({ ExhibitionName: '', PageNumber: 1 });
    };

    const handleKeyDown = e => {
        if (searchValue && e.key === 'Enter') {
            setFiltersSuccess({ ExhibitionName: searchValue, PageNumber: 1 });
        } else if (e.key === 'Enter') {
            onCancel();
        }
    };

    useEffect(() => {
        setSearchValue(ExhibitionName ? ExhibitionName : '');
    }, [ExhibitionName]);

    return (
        <div className="ExhibitionsSearch">
            <input
                placeholder="Поиск выставок по названию или городу"
                name="search"
                className="ExhibitionsSearch__control"
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
            />
            {searchValue &&
                <button className="ExhibitionsSearch__cancel" onClick={onCancel} />
            }
        </div>
    )
};

export default connectFilters(React.memo(ExhibitionsSearch));