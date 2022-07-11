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
        cities: getLSCities(),
        regions: getLSRegions(),
        activeType: null,
        isAdvert: null
    });

    const scrollRef = useRef();

    useEffect(() => {
        console.log('NewsList useEffect');
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

            // await getNews(1, newsFilter);
        })();
    }, []);

    useEffect(() => {
        const currentRegions = getLSRegions();
        (() => Request({
            url: `${endpointNewsCity}?${currentRegions.map(reg => `regionIds=${reg}`).join('&')}`
        }, data => {
            setCities(data);
            doTheFilter(data);
        },error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, [newsFilter.regions]);

    const getNews = async (startElem, filters) => {
        setNewsLoading(true);

        console.log('NewsList getNews');

        await Request({
            url: `${endpointGetNews}?start_element=
                ${startElem}
                ${filters.cities.length > 0 ? filters.cities.map(id => `&fact_city_ids=${id}`).join('') : ''}
                ${filters.regions.length > 0 ? filters.regions.map(id => `&fact_region_ids=${id}`).join('') : ''}
                ${filters.activeType ? `&${filters.activeType}=true` : ''}
                ${filters.isAdvert !== null
                ?
                filters.isAdvert
                    ?
                    '&is_advert=' + filters.isAdvert +'&advert_category_id=' + filters.advert_category_id
                    :
                    '&is_advert=false'
                : ''}
                ${filters.is_popular ? '&is_popular='+ filters.is_popular : '&is_popular=false'}`
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

    const getNextNews = () => {
        if (hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10, newsFilter))();
        }
    };

    const doTheFilter = (currentCities) => {
        if(newsFilter.regions.length === 0) {
            setNewsFilter({...newsFilter, regions: newsFilter.regions,  cities: []});
            console.log('doTheFilter if');
            (() => getNews(1, {...newsFilter, regions: [], cities: []}))();
        } else {
            const newArr = [];
            currentCities.forEach(item => {
                newsFilter.cities.forEach(elem => {
                    if(item.value === elem) {
                        newArr.push(elem);
                    }
                })
            });
            setNewsFilter({...newsFilter, cities: newArr});
            console.log('doTheFilter else');
            (() => getNews(
                1,
                {
                    ...newsFilter,
                    regions: newsFilter.regions,
                    cities: newArr
                }))();
        }
        setUntouchableMode(false);
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
        (() => getNews(1, newFilters))();
        scrollFunc(scrollRef);
    };

    const changeOrganizationFilters = activeFiltername => {
        setNewsFilter({...newsFilter, activeType: activeFiltername});

        (() => getNews(1, {...newsFilter, activeType: activeFiltername}))();
        scrollFunc(scrollRef);
    };

    const changeCityFilter = citiesIds => {
        setLSCities(citiesIds);
        setNewsFilter({...newsFilter, cities: citiesIds});
        setStartElement(1);
        (() => getNews(1, {...newsFilter, cities: citiesIds}))();
        scrollFunc(scrollRef);
    };

    const changeRegionFilter = regionIds => {
        setUntouchableMode(true);
        setLSRegions(regionIds);
        setNewsFilter({...newsFilter, regions: regionIds});
        setStartElement(1);
        (() => getNews(1, {...newsFilter, regions: regionIds}))();
        scrollFunc(scrollRef);
    };

    const changeIsPopular = mostLiked => {
        setNewsFilter({...newsFilter, is_popular: mostLiked});
        (() => getNews(1, {...newsFilter, is_popular: mostLiked}))();
        scrollFunc(scrollRef);
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
                    changeIsPopular={changeIsPopular}
                />
                <ul className="news-list__content">
                    {news && !!news.length && news.map((item, index) => (
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
                changeIsPopular={changeIsPopular}
                untouchableMode={untouchableMode}
            />
        </div>
    )
};

export default memo(NewsList);