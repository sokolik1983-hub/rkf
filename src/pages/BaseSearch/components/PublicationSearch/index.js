import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request, { getHeaders } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
// import BreedsFilter from "../../../../pages/Exhibitions/components/Filters/components/BreedsFilter";
// import CitiesFilter from "../../../../pages/Exhibitions/components/Filters/components/CitiesFilter";
import { DEFAULT_IMG } from "../../../../appConfig";
import '../FoundInfo/index.scss';


const PublicationSearch = () => {
    const [min_price, setMinPrice] = useState('');
    const [max_price, setMaxPrice] = useState('');
    const [breedsList, setBreeds] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { min_amount, max_amount } = useParams();

    useEffect(() => {
        setLoading(true);
        Request({
            url: `/api/dog/Breed`,
            options: {
                method: "GET",
                headers: getHeaders(),
            }
        }).then(data => {
            if (data) {
                let breedsList = [];
                data.result.forEach((item) => {
                    breedsList.push(item.name);
                });
                setBreeds(breedsList);
                console.log(breedsList);
            } else {
                setBreeds([]);
                setAlert(true);
            }
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (min_amount) {
            setMinPrice(min_amount);
        }
    }, [min_amount]);

    useEffect(() => {
        if (max_amount) {
            setMaxPrice(max_amount);
        }
    }, [max_amount]);

    const handleSubmit = e => {
        e.preventDefault();
        requestPublication(min_price, max_price);
    };

    const handleReset = e => {
        e.preventDefault();
        setStatus(false);
        setMinPrice('');
        setMaxPrice('');
    };

    const handleMinPriceClear = e => {
        e.preventDefault();
        setMinPrice('');
    };

    const handleMaxPriceClear = e => {
        e.preventDefault();
        setMaxPrice('');
    };

    const requestPublication = (min_price, max_price) => {
        setLoading(true);
        Request({
            url: ``,
            options: {
                method: "GET",
                headers: getHeaders(),
            }
        }).then(data => {
            if (data) {
                setStatus(data);
            } else {
                setStatus(false);
                setAlert(true);
            }
            setLoading(false);
        });
    };

    return (
        <Card>
            <div className="search-form__icon" />
            <h3>Поиск по объявлениям</h3>
            <p>Для поиска подходящего Вам объявления о продаже щенков, выберете породу, город и укажите приемлемый диапазон цен.</p>
            <form className="search-form" onSubmit={handleSubmit}>
                {/* <BreedsFilter breeds={breedsList} />
                <CitiesFilter cities={breedsList} /> */}
                <div className="search-form__wrap">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="^[0-9]+$"
                        onChange={({ target }) => setMinPrice(target.value)}
                        value={min_price}
                        title="Цена от"
                        placeholder="от"
                        disabled={loading || status ? true : false}
                    />
                    {min_price &&
                        <button type="button" className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleMinPriceClear} />}
                </div>
                <div className="search-form__wrap">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="^[0-9]+$"
                        onChange={({ target }) => setMaxPrice(target.value)}
                        value={max_price}
                        title="Цена до"
                        placeholder="до"
                        disabled={loading || status ? true : false}
                    />
                    {max_price &&
                        <button type="button" className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleMaxPriceClear} />}
                </div>
                {status ? <div className="search-form__button--clear">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleReset}
                    >
                        <span></span>
                    </button>
                </div>
                    :
                    <div className="search-form__button">
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            <svg width="20" height="20" viewBox="0 0 18 18" fill="#90999e" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z" />
                            </svg>
                        </button>
                    </div>}
            </form>
            {
                loading
                    ? <Loading centered={false} />
                    : status && <div className="search-form__result">
                        {status.status === 1 ? <></> : ``}
                        {status.status === 2 ? <></> : ``}
                        {status.status === 3 ? <></> : ``}
                        {status.status === 4 ? <div className="search-form__default-content">
                            <h3>Ничего не найдено</h3>
                            <img src={DEFAULT_IMG.noNews} alt="Ничего не найдено" />
                        </div> : ``}
                    </div>
            }
            {alert &&
                <Alert
                    text="Судья не найден"
                    autoclose={1.5}
                    onOk={() => setAlert(false)}
                />
            }
        </Card>
    );
}

export default React.memo(PublicationSearch);