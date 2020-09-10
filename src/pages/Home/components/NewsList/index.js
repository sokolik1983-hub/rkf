import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CitySelect from "../../../../components/CitySelect";
import ListFilter from './ListFilter';
import CardNews from "../../../../components/CardNews";
import { endpointGetNews } from "../../config";
import { Request } from "../../../../utils/request";
import { DEFAULT_IMG } from "../../../../appConfig";
import './index.scss';


function getCity() {
    const l = localStorage.getItem('GLOBAL_CITY');
    return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
};

const NewsList = ({ isFullDate = true, citiesDict }) => {
    const [activeType, setActiveType] = useState('all');
    const [news, setNews] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [newsFilter, setNewsFilter] = useState({
        city: getCity(),
        activeType: null,
        isAdvert: null
    });

    const newsListRef = useRef(null);

    const getNews = async (startElem, filters) => {
        setNewsLoading(true);

        await Request({
            url: `${endpointGetNews}?start_element=${startElem}${filters.city && filters.city.value ? `&fact_city_ids=${filters.city.value}` : ''}${filters.activeType ? `&${filters.activeType}=true` : ''}${filters.isAdvert !== null ? '&is_advert=' + filters.isAdvert : ''}`
        },
        data => {
            if (data.articles.length) {
                const modifiedNews = data.articles.map(article => {
                    article.title = article.club_name;
                    article.url = `/news/${article.id}`;
                    return article;
                });

                if(data.articles.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setNews(startElem === 1 ? modifiedNews : [...news, ...modifiedNews]);
            } else {
                if(startElem === 1) {
                    setNews([]);
                }

                setHasMore(false);
            }
        },
        error => console.log(error.response));

        setNewsLoading(false);
    };

    useEffect(() => {
        (() => getNews(1, newsFilter))();
    }, []);

    const getNextNews = () => {
        if(hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10, newsFilter))();
        }
    };

    const changeTypeFilters = type => {
        setActiveType(type);
        const el = newsListRef.current;
        el && window.scrollTo(0, el.offsetTop - 75);
        let newFilters = {};

        if(type !== 'all') {
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

    const changeCityFilter = city => {
        const el = newsListRef.current;
        el && window.scrollTo(0, el.offsetTop - 75);
        setNewsFilter({...newsFilter, city});
        setStartElement(1);
        (() => getNews(1, {...newsFilter, city}))();
    };

    return (
        <div className="NewsList" ref={newsListRef}>
            <div className="NewsList__head">
                <div className="NewsList__head-wrap">
                    <div className="Homepage__news-title">
                        <h3>Публикации</h3>
                        <div className="Homepage__news-mobile-only">
                            <CitySelect
                                currentCity={newsFilter.city}
                                cityFilter={city => {
                                    if (!city || city.value !== (newsFilter.city && newsFilter.city.value)) {
                                        changeCityFilter(city);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="NewsList__filters">
                        <div className="Homepage__news-title-wrap">
                            <ul className="ListFilter">
                                <li>
                                    <span
                                        className={`ListFilter__item${activeType === 'all' ? ' _active' : ''}`}
                                        onClick={() => changeTypeFilters('all')}
                                    >Все</span>
                                </li>
                                <li>
                                    <span
                                        className={`ListFilter__item${activeType === 'news' ? ' _active' : ''}`}
                                        onClick={() => changeTypeFilters('news')}
                                    >Новости</span>
                                </li>
                                <li>
                                    <span
                                        className={`ListFilter__item${activeType === 'advert' ? ' _active' : ''}`}
                                        onClick={() => changeTypeFilters('advert')}
                                    >Объявления</span>
                                </li>
                            </ul>
                            <CitySelect
                                currentCity={newsFilter.city}
                                cityFilter={city => {
                                    if (!city || city.value !== (newsFilter.city && newsFilter.city.value)) {
                                        changeCityFilter(city);
                                    }
                                }}
                            />
                        </div>
                        <ListFilter
                            changeFilter={changeOrganizationFilters}
                        />
                    </div>
                </div>
            </div>
            {news && !!news.length &&
                <InfiniteScroll
                    dataLength={news.length}
                    next={getNextNews}
                    hasMore={hasMore}
                    loader={newsLoading && <Loading centered={false} />}
                    endMessage={
                        <div className="NewsList__no-news">
                            <h4>Публикаций больше нет</h4>
                            <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет" />
                        </div>
                    }
                >
                    <ul className="NewsList__content">
                        {news && !!news.length && news.map(item => (
                            <li className="NewsList__item" key={item.id}>
                                <CardNews
                                    user={item.user_type}
                                    id={item.id}
                                    name={item.name}
                                    city={item.fact_city_name}
                                    date={item.create_date}
                                    isFullDate={isFullDate}
                                    small_photo={item.picture_short_link}
                                    photo={item.picture_link}
                                    text={item.content}
                                    url={`/news/${item.id}`}
                                    alias={item.alias}
                                    logo_link={item.logo_link}
                                    changeCityFilter={changeCityFilter}
                                    citiesDict={citiesDict}
                                    isAd={item.is_advert}
                                    adBreedName={item.advert_breed_name}
                                    adCode={item.advert_code}
                                    adPrice={item.advert_cost}
                                    adAmount={item.advert_number_of_puppies}
                                    adCategory={item.advert_type_name}
                                />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>}
            {(!news || !news.length) && !newsLoading && <div className="NewsList__no-news">
                <h4>Публикации не найдены</h4>
                <img src={DEFAULT_IMG.noNews} alt="Публикации не найдены" />
            </div>}
        </div>
    )
};

export default React.memo(NewsList);