import React, {useState, useEffect, useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardNewsNew from "../../../../components/CardNewsNew";
import NewsFilters from "../NewsFilters";
import {endpointGetNews} from "../../config";
import {Request} from "../../../../utils/request";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";
import { connectShowFilters } from "../../../../components/Layouts/connectors";
import ClickGuard from "../../../../components/ClickGuard";

const getLSCities = () => {
    const filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    return filters.cities || [];
};

const setLSCities = citiesIds => {
    let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    filters.cities = citiesIds;
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};

const NewsList = ({isFullDate = true, setShowFilters, isOpenFilters}) => {
    const [activeType, setActiveType] = useState('all');
    const [news, setNews] = useState([]);
    const [cities, setCities] = useState([]);
    const [filtersLoading, setFiltersLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [newsFilter, setNewsFilter] = useState({
        cities: getLSCities(),
        activeType: null,
        isAdvert: null
    });
    const newsListRef = useRef(null);

    const getNews = async (startElem, filters) => {
        setNewsLoading(true);

        await Request({
                url: `${endpointGetNews}?start_element=${startElem}${filters.cities.map(id => `&fact_city_ids=${id}`).join('')}${filters.activeType ? `&${filters.activeType}=true` : ''}${filters.isAdvert !== null ? '&is_advert=' + filters.isAdvert : ''}`
            }, data => {
                if (data.articles.length) {
                    const modifiedNews = data.articles.map(article => {
                        article.title = article.club_name;
                        article.url = `/news/${article.id}`;
                        return article;
                    });

                    if (data.articles.length < 10) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }

                    setNews(startElem === 1 ? modifiedNews : [...news, ...modifiedNews]);
                } else {
                    if (startElem === 1) {
                        setNews([]);
                    }

                    setHasMore(false);
                }
            }, error => console.log(error.response));

        setNewsLoading(false);
    };

    useEffect(() => {
        (async () => {
            await Request({url: '/api/city/article_cities'},
            data => {
                if(data) {
                    setCities(data);
                }
            },
            error => {
                console.log(error.response);
            });

            setFiltersLoading(false);

            await getNews(1, newsFilter);
        })();
    }, []);

    const getNextNews = () => {
        if (hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10, newsFilter))();
        }
    };

    const changeTypeFilters = type => {
        setActiveType(type);
        const el = newsListRef.current;
        el && window.scrollTo(0, el.offsetTop - 75);
        let newFilters = {};

        if (type !== 'all') {
            newFilters = {...newsFilter, isAdvert: type === 'advert'};
        } else {
            newFilters = {...newsFilter, isAdvert: null};
        }

        setStartElement(1);
        setNewsFilter(newFilters);
        (() => getNews(1, newFilters))();
    };

    const changeOrganizationFilters = activeFiltername => {
        const el = newsListRef.current;
        el && window.scrollTo(0, el.offsetTop - 75);
        setNewsFilter({...newsFilter, activeType: activeFiltername});

        (() => getNews(1, {...newsFilter, activeType: activeFiltername}))();
    };

    const changeCityFilter = citiesIds => {
        const el = newsListRef.current;
        el && window.scrollTo(0, el.offsetTop - 75);
        setLSCities(citiesIds);
        setNewsFilter({...newsFilter, cities: citiesIds});
        setStartElement(1);
        (() => getNews(1, {...newsFilter, cities: citiesIds}))();
    };

    return (
        <>
            <div className="NewsList" ref={newsListRef}>
                <ClickGuard value={isOpenFilters}
                            callback={() => setShowFilters({isOpenFilters: false})}
                />
                <NewsFilters
                    loading={filtersLoading}
                    cities={cities}
                    startElement={startElement}
                    activeType={activeType}
                    newsFilter={newsFilter}
                    changeOrganizationFilters={changeOrganizationFilters}
                    changeTypeFilters={changeTypeFilters}
                    changeCityFilter={changeCityFilter}
                />
                {news && !!news.length &&
                <InfiniteScroll
                    dataLength={news.length}
                    next={getNextNews}
                    hasMore={hasMore}
                    loader={newsLoading && <Loading centered={false}/>}
                    endMessage={
                        <div className="NewsList__no-news">
                            <h4>Публикаций больше нет</h4>
                            <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет"/>
                        </div>
                    }
                >
                    <ul className="NewsList__content">
                        {news && !!news.length && news.map((item, index) => (
                            <li className="NewsList__item" key={item.id}>
                                <CardNewsNew
                                    {...item}
                                    user={item.user_type}
                                    city={item.fact_city_name}
                                    date={item.create_date}
                                    isFullDate={isFullDate}
                                    small_photo={item.picture_short_link}
                                    photo={item.picture_link}
                                    text={item.content}
                                    url={`/news/${item.id}`}
                                    changeCityFilter={changeCityFilter}
                                    isAd={item.is_advert}
                                    adBreedName={item.advert_breed_name}
                                    adCode={item.advert_code}
                                    adPrice={item.advert_cost}
                                    adAmount={item.advert_number_of_puppies}
                                    adCategory={item.advert_type_name}
                                    videoLink={item.video_link}
                                />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>}
                {(!news || !news.length) && !newsLoading && <div className="NewsList__no-news">
                    <h4>Публикации не найдены</h4>
                    <img src={DEFAULT_IMG.noNews} alt="Публикации не найдены"/>

                </div>}

            </div>
        </>
        <div className="NewsList" ref={newsListRef}>
            <NewsFilters
                loading={filtersLoading}
                cities={cities}
                startElement={startElement}
                activeType={activeType}
                newsFilter={newsFilter}
                changeOrganizationFilters={changeOrganizationFilters}
                changeTypeFilters={changeTypeFilters}
                changeCityFilter={changeCityFilter}
            />
            {news && !!news.length &&
                <InfiniteScroll
                    dataLength={news.length}
                    next={getNextNews}
                    hasMore={hasMore}
                    loader={newsLoading && <Loading centered={false}/>}
                    endMessage={
                        <div className="NewsList__no-news">
                            <h4>Публикаций больше нет</h4>
                            <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет"/>
                        </div>
                    }
                >
                    <ul className="NewsList__content">
                        {news && !!news.length && news.map((item, index) => (
                            <li className="NewsList__item" key={item.id}>
                                <CardNewsNew
                                    {...item}
                                    user={item.user_type}
                                    city={item.fact_city_name}
                                    date={item.create_date}
                                    isFullDate={isFullDate}
                                    small_photo={item.picture_short_link}
                                    photo={item.picture_link}
                                    text={item.content}
                                    url={`/news/${item.id}`}
                                    changeCityFilter={changeCityFilter}
                                    isAd={item.is_advert}
                                    adBreedName={item.advert_breed_name}
                                    adCode={item.advert_code}
                                    adPrice={item.advert_cost}
                                    adAmount={item.advert_number_of_puppies}
                                    adCategory={item.advert_type_name}
                                    videoLink={item.video_link}
                                />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            }
            {(!news || !news.length) && !newsLoading &&
                <div className="NewsList__no-news">
                    <h4>Публикации не найдены</h4>
                    <img src={DEFAULT_IMG.noNews} alt="Публикации не найдены"/>
                </div>
            }
        </div>
    )
};

export default React.memo(NewsList);