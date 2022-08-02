import React, {memo, useState, useEffect, useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardNewsNew from "../../../../components/CardNewsNew";
import NewsFilters from "../NewsFilters";
import PublicationFilter from "./PublicationFilter";
import {endpointGetNews, endpointNewsCity} from "../../config";
import {Request} from "../../../../utils/request";
import {DEFAULT_IMG} from "../../../../appConfig";
import {getLSRegions, getLSCities, setLSRegions, setLSCities} from "../../../../utils/LSFilters";
import {scrollFunc} from "../../../../utils/scrollToContent";
import "./index.scss";


const NewsList = ({isFullDate = true}) => {
    const [activeType, setActiveType] = useState('all');
    const [news, setNews] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [filtersLoading, setFiltersLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [untouchableMode, setUntouchableMode] = useState(false);
    const [newsFilter, setNewsFilter] = useState({
        regions: getLSRegions(), //есть ли смысл писать города и регионы в localstorage, если при обновлении страницы они оттуда стираются?
        cities: getLSCities(),
        activeType: null,
        isAdvert: null,
        sortType: 1,
    });

    const scrollRef = useRef();

    useEffect(() => {
        (async () => {
            await Request({url: 'api/city/article_regions'},
            data => {
                if(data) {
                    setRegions(data);
                }
            },
            error => {
                console.log(error.response);
            });

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
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getNews();

            if(startElement === 1) scrollFunc(scrollRef);
        })();
    }, [startElement, newsFilter]);

    const getUrlPath = () => {
        let path = `${endpointGetNews}?start_element=${startElement}`;

        if(newsFilter.regions.length) {
            path += newsFilter.regions.map(id => `&fact_region_ids=${id}`).join('');
        }

        if(newsFilter.cities.length) {
            path += newsFilter.cities.map(id => `&fact_city_ids=${id}`).join('');
        }

        if(newsFilter.activeType) {
            path += `&${newsFilter.activeType}=true`;
        }

        if(newsFilter.isAdvert) {
            path += `&is_advert=${newsFilter.isAdvert}&advert_category_id=${newsFilter.advert_category_id}`;
        } else if(newsFilter.isAdvert !== null) {
            path += '&is_advert=false';
        }

        path += `&sortType=${newsFilter.sortType}`;

        return path;
    };

    const getNews = async () => {
        setNewsLoading(true);

        await Request({
            url: getUrlPath()
        }, data => {
            if (data.articles.length) {
                if (data.articles.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setNews(prev => startElement === 1 ? data.articles : [...prev, ...data.articles]);
            } else {
                if (startElement === 1) {
                    setNews([]);
                }

                setHasMore(false);
            }
        }, error => console.log(error.response));

        setNewsLoading(false);
    };

    const getNextNews = () => {
        if (hasMore) {
            setStartElement(startElement + 10);
        }
    };

    const changeTypeFilters = type => {
        setActiveType(type);
        let newFilters = {};

        if (type === 'all') {
            newFilters = {...newsFilter, isAdvert: null};
        } else if ( type === 'news') {
            newFilters = {...newsFilter, isAdvert: false};
        } else if (type === 'advert') {
            newFilters = {...newsFilter, isAdvert: true, advert_category_id: 1};
        } else if(type === 'articles') {
            newFilters = {...newsFilter, isAdvert: true, advert_category_id: 2};
        }

        setStartElement(1);
        setNewsFilter(newFilters);
    };

    const changeOrganizationFilters = activeFiltername => {
        setNewsFilter({...newsFilter, activeType: activeFiltername});
    };

    const changeRegionFilter = async regionIds => {
        setUntouchableMode(true);
        setLSRegions(regionIds);

        await Request({
            url: `${endpointNewsCity}?${regionIds.map(id => `regionIds=${id}`).join('&')}`
        }, data => {
            setCities(data);

            let citiesIds = [];

            if(regionIds.length) {
                data.forEach(item => {
                    newsFilter.cities.forEach(id => {
                        if(item.value === id) {
                            citiesIds.push(id);
                        }
                    });
                });
            }

            setNewsFilter({...newsFilter, regions: regionIds, cities: citiesIds});
            setStartElement(1);
        },error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });

        setUntouchableMode(false);
    };

    const changeCityFilter = citiesIds => {
        setLSCities(citiesIds);
        setNewsFilter({...newsFilter, cities: citiesIds});
        setStartElement(1);
    };

    const changeSortType = value => {
        setNewsFilter({...newsFilter, sortType: value});
    };

    return (
        <div className="news-list" ref={scrollRef}>
            <InfiniteScroll
                dataLength={news.length}
                next={getNextNews}
                hasMore={hasMore}
                loader={newsLoading && <Loading centered={false}/>}
                endMessage={
                    <div className="news-list__no-news">
                        <h4>Публикаций больше нет</h4>
                        <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет"/>
                    </div>
                }
            >
                <PublicationFilter
                    changeTypeFilters={changeTypeFilters}
                    activeType={activeType}
                    changeSortType={changeSortType}
                />
                <ul className="news-list__content">
                    {news && !!news.length && news.map(item => (
                        <li className="news-list__item" key={item.id}>
                            <CardNewsNew
                                {...item}
                                user={item.user_type}
                                city={item.fact_city_name}
                                date={item.create_date}
                                isFullDate={isFullDate}
                                pictures={item.pictures}
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
            <NewsFilters
                loading={filtersLoading}
                cities={cities}
                regions={regions}
                startElement={startElement}
                activeType={activeType}
                newsFilter={newsFilter}
                changeOrganizationFilters={changeOrganizationFilters}
                changeTypeFilters={changeTypeFilters}
                changeCityFilter={changeCityFilter}
                changeRegionFilter={changeRegionFilter}
                untouchableMode={untouchableMode}
            />
        </div>
    )
};

export default memo(NewsList);