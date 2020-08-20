import React, {useState} from "react";
import history from "../../../../utils/history";


const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setSearchValue('');
        history.push(`/search?string_filter=${searchValue.trim()}&search_type=8`);
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

export default React.memo(Search);