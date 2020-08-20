import React, {useState} from "react";
import history from "../../../../utils/history";
import {connectFilters} from "../../../../pages/Search/connectors";


const Search = ({setFilters}) => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setSearchValue('');
        setFilters({string_filter: searchValue});
        history.push(`/search?s=${searchValue}`);
    };

    return (
        <form className="header__search" onSubmit={handleSubmit}>
            <input
                className={`header__search-control ${isClicked ? '_open' : ''}`}
                type="text"
                placeholder="Поиск"
                onChange={({target}) => setSearchValue(target.value)}
                onClick={() => setIsClicked(true)}
                value={searchValue}
                required
            />
        </form>
    )
};

export default connectFilters(React.memo(Search));