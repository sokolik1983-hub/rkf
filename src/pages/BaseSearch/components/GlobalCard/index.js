import React, { useState } from 'react';
import Card from "../../../../components/Card";
import history from '../../../../utils/history';

import './index.scss';

const GlobalCard = ({cardClicked}) => {
    // const [stamp_code, setStampCode] = useState('');
    // const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [alert, setAlert] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setIsClicked(true);
        if (searchValue) {
            setSearchValue('');
            setIsClicked(false);
            history.push(`/search?string_filter=${searchValue.trim()}&search_type=8`);
        }
    };

    return (
        <Card id="global-search-anchor" className={cardClicked === 8 && `_active_card`}>
            <div className="search-form__icon global-search" />
            <div className="search-form__text_wrap">
            <h3>ГЛОБАЛЬНЫЙ ПОИСК</h3>
            <p className="search-form__text">Для осуществления поиска по всему порталу РКФ.Онлайн, пожалуйста, введите необходимый поисковый запрос. После ввода нажмите на кнопку "Поиск".</p>

            <form className="search-form" onSubmit={handleSubmit}>

                <div className="global-search-form__wrap">
                    <input
                        id="global-search-anchor-mark"
                        className="global-search-form__input"
                        type="text"
                        onChange={({ target }) => setSearchValue(target.value)}
                        onClick={() => setIsClicked(true)}
                        value={searchValue}
                        title="Введите 3 латинских символа"
                        placeholder=""
                        required
                    />

                </div>

                    <div className="search-form__button">
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            <svg width="20" height="20" viewBox="0 0 18 18" fill="#90999e" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z" />
                            </svg>
                        </button>
                    </div>
            </form>
            </div>

        </Card>
    );
}

export default React.memo(GlobalCard);