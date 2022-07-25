import React, { memo, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../../../components/Card";
import List from "../../../../components/List";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import Loading from "../../../../components/Loading";
import BreedsFilterKendo from "../../../../components/kendo/Filters/BreedsFilter";
import CitiesFilterKendo from "../../../../components/kendo/Filters/CitiesFilter";
import { PromiseRequest } from "../../../../utils/request";
import { DEFAULT_IMG } from "../../../../appConfig";

import "./index.scss";


const PublicationSearch = ({ cardClicked }) => {
    const [items, setItems] = useState([]);
    const [min_price, setMinPrice] = useState(undefined);
    const [max_price, setMaxPrice] = useState(undefined);
    const [breeds, setBreeds] = useState([]);
    const [breedIds, setBreedIds] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityIds, setCityIds] = useState([]);
    const [status, setStatus] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            PromiseRequest({ url: '/api/dog/Breed' }),
            PromiseRequest({ url: '/api/city' })
        ]).then(
            data => {
                setBreeds(data[0].map(d => ({ value: d.id, label: d.name })));
                setCities(data[1].map(d => ({ value: d.id, label: d.name })));
                setLoading(false);
            }).catch(
                error => {
                    console.log(error.response);
                    setLoading(false);
                })
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setItems([]);
        requestPublication();
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

    const arrToParams = (arr, param) => {
        return arr ? arr.map(a => `${param}=${a}`).join('') : ''
    }

    const requestPublication = (startElem = 1) => {
        setNewsLoading(true);
        const url = `/api/article/public_all_v2${(breedIds.length || cityIds.length)
            ? '?' + arrToParams(breedIds, '&article_ad_breed_ids') + arrToParams(cityIds, '&fact_city_ids')
            : ''}`
            .replace('?&', '?');

        PromiseRequest({
            url: url,
            params: {
                is_advert: true,
                article_ad_cost_from: min_price,
                article_ad_cost_to: max_price,
                start_element: startElem
            }
        })
            .then(data => {
                let modifiedItems = [];
                if (data.articles.length) {
                    modifiedItems = data.articles.map(article => {
                        article.title = article.name;
                        article.url = `/news/${article.id}`;
                        return article;
                    });
                    if (data.articles.length < 10) {
                        setHasMore(false);
                        setStartElement(1);
                    } else {
                        setHasMore(true);
                    }
                    setItems(startElem === 1 ? modifiedItems : [...items, ...modifiedItems]);
                } else {
                    if (startElement === 1) {
                        setItems([]);
                    }
                    setHasMore(false);
                }
                setNewsLoading(false);
            });
    };

    const getNextResults = () => {
        if (hasMore) {
            (() => requestPublication(startElement + 10))();
            setStartElement(startElement + 10);
        }
    };

    return (
        <Card className={`publication-search${cardClicked === 6 ? ' _active_card' : ''}`} id="publication-search-anchor">
            <div className="search-form__image publication-search"/>
            <div className="publication-search__text_wrap">
            <h3>Поиск по объявлениям</h3>
            <p>Для поиска подходящего Вам объявления о продаже щенков, выберете породу, город и укажите приемлемый диапазон цен.</p>
            <p className="publication-search__price">Цена</p>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__wrap">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="^[0-9]+$"
                        onChange={({ target }) => setMinPrice(target.value.slice(0,10).replace(/[^0-9]/g, ''))}
                        value={min_price}
                        title="Цена от"
                        placeholder="от"
                        disabled={loading || status}
                        required
                    />
                    {min_price &&
                        <button
                            className={`search-form__cancel${status ? ' _hide' : ''}`}
                            type="button"
                            onClick={handleMinPriceClear}
                        />
                    }
                </div>
                <div className="search-form__wrap search-form__wrap-with_but">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="^[0-9]+$"
                        onChange={({ target }) => setMaxPrice(target.value.slice(0,10).replace(/[^0-9]/g, ''))}
                        value={max_price}
                        title="Цена до"
                        placeholder="до"
                        disabled={loading || status}
                        required
                    />
                    {max_price &&
                        <button
                            className={`search-form__cancel${status ? ' _hide' : ''}`}
                            type="button"
                            onClick={handleMaxPriceClear}
                        />
                    }
                    {status ?
                        <div className="search-form__button--clear">
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
                            <Button
                                className="btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                Поиск
                            </Button>
                        </div>}
                </div>
            </form>
            <div className="publication-search__filters">
                <div>
                    <p className="publication-search__filters-title">Породы</p>
                    <BreedsFilterKendo
                        data={breeds}
                        onChange={ids => setBreedIds(ids)}
                        className="publication-search__breeds-filter"
                    />
                </div>
                <div>
                    <p className="publication-search__filters-title">Города</p>
                    <CitiesFilterKendo
                        data={cities}
                        onChange={ids => setCityIds(ids)}
                        className="publication-search__cities-filter"
                    />
                </div>
            </div>
            {loading || (newsLoading && !items.length) ?
                <Loading centered={false} />
                :
                <div className="search-form__result">
                    <InfiniteScroll
                        dataLength={items.length}
                        next={items.length && getNextResults}
                        hasMore={hasMore}
                        loader={newsLoading && <Loading centered={false} />}
                        endMessage={!newsLoading && <div className="user-news__content">
                            <h4 className="user-news__text">Публикаций больше нет</h4>
                            <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="Публикаций больше нет" />
                        </div>
                        }
                    >
                        <List
                            list={items}
                            listNotFound={false}
                            listClass="user-news"
                            isFullDate={true}
                        />
                    </InfiniteScroll>
                </div>
            }
            {alert &&
                <Alert
                    text="Объявления не найдены"
                    autoclose={1.5}
                    onOk={() => setAlert(false)}
                />
            }
            </div>
        </Card>
    );
}

export default memo(PublicationSearch);
