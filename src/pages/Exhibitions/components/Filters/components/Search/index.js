import React, {useEffect, useState} from "react";
import {getEmptyFilters, setFiltersToUrl} from "../../../../utils";
import "./index.scss";


const ExhibitionsSearch = ({ExhibitionName}) => {
    const [searchValue, setSearchValue] = useState(ExhibitionName);

    useEffect(() => {
        setSearchValue(ExhibitionName ? ExhibitionName : '');
    }, [ExhibitionName]);

    const onCancel = () => {
        setSearchValue('');
        setFiltersToUrl({ExhibitionName: '', PageNumber: 1});
    };

    const handleKeyDown = e => {
        if (searchValue && e.key === 'Enter') {
            setFiltersToUrl({...getEmptyFilters(), ExhibitionName: searchValue});
        } else if (e.key === 'Enter') {
            onCancel();
        }
    };

    return (
        <div className="ExhibitionsSearch">
            <input
                placeholder="Поиск мероприятий по названию или городу"
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

export default React.memo(ExhibitionsSearch);