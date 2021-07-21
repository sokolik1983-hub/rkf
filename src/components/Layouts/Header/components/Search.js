import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import history from "../../../../utils/history";
import useIsMobile from "../../../../utils/useIsMobile";

const Search = ({ withFilters }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const isMobile = useIsMobile(1080);
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
        setIsClicked(!isClicked)
    };

    const searchTitle = isClicked ? 'Закрыть' : 'Поиск';

    return (
        <form
            className={`header__search${isClicked ? ' _open' : ''}${withFilters ? ' _with-filter' : ''}`}
            onSubmit={handleSubmit}
        >
            <OutsideClickHandler onOutsideClick={handleCancel}>
                <input
                    className={`header__search-control${isClicked ? ' _open' : ''}`}
                    type="text"
                    onChange={({ target }) => setSearchValue(target.value)}
                    onClick={() => setIsClicked(true)}
                    value={searchValue}
                />
                <button type="submit" onClick={handleChecked} className="header__search-submit">
                    <svg className={isClicked ? "header__search-svg _open" : "header__search-svg"} width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7978 15.8238L11.4497 10.4757C12.3686 9.33622 12.8741 7.93027 12.8741 6.44162C12.8741 4.72324 12.2032 3.10595 10.9903 1.89297C9.7773 0.68 8.16 0 6.43243 0C4.70486 0 3.10595 0.670811 1.88378 1.88378C0.661622 3.09676 0 4.71405 0 6.44162C0 8.16 0.670811 9.7773 1.88378 10.9903C3.09676 12.2032 4.71405 12.8741 6.43243 12.8741C7.92108 12.8741 9.32703 12.3686 10.4665 11.4497L15.8146 16.7978C15.9524 16.9357 16.127 17 16.3016 17C16.4762 17 16.6508 16.9357 16.7887 16.7978C17.0643 16.5314 17.0643 16.0903 16.7978 15.8238ZM2.85784 10.0162C1.90216 9.06054 1.37838 7.79243 1.37838 6.44162C1.37838 5.09081 1.90216 3.8227 2.85784 2.86703C3.81351 1.91135 5.08162 1.37838 6.43243 1.37838C7.78324 1.37838 9.05135 1.90216 10.007 2.85784C10.9627 3.81351 11.4865 5.08162 11.4865 6.43243C11.4865 7.78324 10.9627 9.05135 10.007 10.007C9.06054 10.9719 7.79243 11.4957 6.43243 11.4957C5.07243 11.4957 3.81351 10.9719 2.85784 10.0162Z" />
                    </svg>
                </button>
                {isMobile &&
                <span onClick={handleChecked} className={`header__search-btn${isClicked ? ' _open' : ''}`}>{searchTitle}</span>
                }
                {isClicked && !isMobile &&
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