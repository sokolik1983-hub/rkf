import React, {useState} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import history from "../../../../utils/history";


const Search = ({withFilters}) => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsClicked(true);
        if(searchValue) {
            setSearchValue('');
            setIsClicked(false);
            history.push(`/search?string_filter=${searchValue.trim()}&search_type=8`);
        }
    };

    const handleCancel = () => {
        setSearchValue('');
        setIsClicked(false);
    };

    return (
        <form
            className={`header__search${isClicked ? ' _open' : ''}${withFilters ? ' _with-filter' : ''}`}
            onSubmit={handleSubmit}
        >
            <OutsideClickHandler onOutsideClick={handleCancel}>
                <input
                    className={`header__search-control${isClicked ? ' _open' : ''}`}
                    type="text"
                    placeholder="Поиск"
                    onChange={({target}) => setSearchValue(target.value)}
                    onClick={() => setIsClicked(true)}
                    value={searchValue}
                />
                <button type="submit" className="header__search-submit">
                    <svg className="header__search-svg" width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z"/>
                    </svg>
                </button>
                {isClicked &&
                    <button type="button" className="header__search-cancel" onClick={handleCancel}>
                        <svg className="header__search-svg" width="16" height="16" viewBox="0 0 14 14" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
                        </svg>
                    </button>
                }
            </OutsideClickHandler>
        </form>
    )
};

export default React.memo(Search);