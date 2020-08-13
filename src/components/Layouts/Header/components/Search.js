import React, {useState} from "react";
import history from "../../../../utils/history";


const Search = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search?s=${searchValue}`);
    };

    return (
        <form className="header__search" onSubmit={handleSubmit}>
            <input
                className="header__search-control"
                type="text"
                placeholder="Поиск"
                onChange={({target}) => setSearchValue(target.value)}
                required
            />
        </form>
    )
};

export default React.memo(Search);