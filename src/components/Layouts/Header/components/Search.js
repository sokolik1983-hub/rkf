import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import history from '../../../../utils/history';
import PopupModal from "../../../PopupModal";
import {blockContent} from "../../../../utils/blockContent";

const Search = ({ withFilters, hideSideMenu }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const location = useLocation();

    const getSearchTypeId = () => {
        const urlPath = location.pathname;

        return urlPath === '/organizations' ? 100 :
                (urlPath === '/' || urlPath === '/base-search') ? 200 :
                urlPath === '/exhibitions' ? 300 :
                urlPath === '/specialists' ? 400 : getSearchTypeIdFromUrl();
    }

    const getSearchTypeIdFromUrl = () => {
        if (!!location.search.match(/search_type=\d{3}/)) {
            return `${location.search
                .match(/search_type=\d{3}/)[0]
                .match(/\d/)[0]}00`;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (searchValue) {
            setSearchValue('');
            setIsClicked(false);
            history.push(`/search?string_filter=${searchValue.trim()}&search_type=${getSearchTypeId()}`);
        }
    };

    const handleChecked = () => {
        setIsClicked(!isClicked)
    };

    const strokeColor = isClicked ? '#3366FF' : '#90999E';

    const searchTitle = isClicked ? 'Закрыть' : 'Поиск';

    const handleOutsideClick = (e) => {
        if (!e?.target.classList.contains('__hide')) {
            setIsClicked(false);
            setSearchValue('');
        }
    }

    const searchRef = useRef();

    useEffect(() => {
            blockContent(isClicked);
        return () => blockContent(false);

    }, [isClicked])

    return (
        <div className="form-search__wrap">
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                <form
                    className={`header__search${isClicked ? ' _open' : ''}${withFilters ? ' _with-filter' : ''}`}
                    onSubmit={handleSubmit}
                    onClick={hideSideMenu}
                >
                    { isClicked &&
                        <input
                            className={ `header__search-control${ isClicked ? ' _open' : '' }` }
                            type="text"
                            onChange={ ({ target }) => setSearchValue(target.value) }
                            onClick={ () => setIsClicked(true) }
                            value={ searchValue }
                            autoFocus={ true }
                        />
                    }

                    <div className="search-icon__wrap" onClick={handleChecked}>
                        <button type='submit'
                                className={isClicked ? 'header__search-submit __hide' : 'header__search-submit'}
                                ref={searchRef}
                        >
                            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.78711 2.13225C5.06683 2.13225 2.05095 5.14813 2.05095 8.86841C2.05095 12.5887 5.06683 15.6046 8.78711 15.6046C10.5845 15.6046 12.2175 14.9006 13.4253 13.7534C13.4572 13.7093 13.4931 13.6671 13.5328 13.6275C13.5728 13.5876 13.6152 13.5517 13.6596 13.5198C14.8142 12.3106 15.5233 10.6723 15.5233 8.86841C15.5233 5.14813 12.5074 2.13225 8.78711 2.13225ZM15.6764 14.3235C16.8646 12.8249 17.5742 10.9295 17.5742 8.86841C17.5742 4.01542 13.6401 0.0812988 8.78711 0.0812988C3.93412 0.0812988 0 4.01542 0 8.86841C0 13.7214 3.93412 17.6555 8.78711 17.6555C10.84 17.6555 12.7284 16.9516 14.2242 15.7718L21.2487 22.8098C21.6488 23.2106 22.2981 23.2112 22.699 22.8112C23.0998 22.4111 23.1004 21.7618 22.7003 21.3609L15.6764 14.3235Z" fill={strokeColor} />
                            </svg>
                            <span className={`header__search-btn${isClicked ? ' _open' : ''}`}>{searchTitle}</span>
                        </button>
                    </div>


                </form>

                <PopupModal
                    showModal={isClicked}
                    handleClose={(e) => {
                        if (!e?.target.classList.contains('header__search-control')) {
                            if (e?.target.classList.contains('form-search__wrap')) {
                                setIsClicked(false);
                            }
                        }
                    }}
                    zIndexStyle
                >
                </PopupModal>


            </OutsideClickHandler>
        </div>
    );
};

export default React.memo(Search);