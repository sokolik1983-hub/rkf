import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import history from '../../../../utils/history';

const Search = ({ withFilters, hideSideMenu }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsClicked(true);
        if (searchValue) {
            setSearchValue('');
            setIsClicked(false);
            history.push(`/search?string_filter=${searchValue.trim()}&search_type=8`);
        }
    };

    const handleCancel = () => {
        setSearchValue('');
        setIsClicked(false);
    };
    const handleChecked = () => {
        setIsClicked(!isClicked);
    };
    const strokeColor = isClicked ? '#3366FF' : '#90999E';

    const searchTitle = isClicked ? 'Закрыть' : 'Поиск';

    return (
        <div className="form-search__wrap">
            <form
                className={`header__search${isClicked ? ' _open' : ''}${withFilters ? ' _with-filter' : ''}`}
                onSubmit={handleSubmit}
                onClick={hideSideMenu}
            >
                <OutsideClickHandler onOutsideClick={handleCancel}>

                    <input
                        className={`header__search-control${isClicked ? ' _open' : ''}`}
                        type='text'
                        onChange={({ target }) => setSearchValue(target.value)}
                        onClick={() => setIsClicked(true)}
                        value={searchValue}
                    />
                    <div>
                        <button type='submit' onClick={handleChecked}
                                className={isClicked ? 'header__search-submit __hide' : 'header__search-submit'}>
                            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M7.62594 14.2519C11.2853 14.2519 14.2519 11.2853 14.2519 7.62594C14.2519 3.96653 11.2853 1 7.62594 1C3.96653 1 1 3.96653 1 7.62594C1 11.2853 3.96653 14.2519 7.62594 14.2519Z'
                                    stroke={strokeColor} strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
                                <path d='M12.3023 12.3024L19 19.0001' stroke={strokeColor} strokeWidth='1.32'
                                      strokeMiterlimit='10' strokeLinejoin='round' />
                            </svg>
                        </button>
                        <span onClick={handleChecked}
                              className={`header__search-btn${isClicked ? ' _open' : ''}`}>{searchTitle}</span>
                    </div>
                </OutsideClickHandler>
            </form>
        </div>
    );
};

export default React.memo(Search);