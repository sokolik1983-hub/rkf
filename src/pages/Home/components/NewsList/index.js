import React, {useState, useEffect, useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardNewsNew from "../../../../components/CardNewsNew";
import NewsFilters from "../NewsFilters";
import {endpointGetNews} from "../../config";
import {Request} from "../../../../utils/request";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";


const getLSCities = () => {
    const filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    return filters.cities || [];
};

const NewsList = ({isFullDate = true, citiesDict}) => {
    const [activeType, setActiveType] = useState('all');
    const [news, setNews] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [newsLoading, setNewsLoading] = useState(false);
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
            },
            data => {
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
            },
            error => console.log(error.response));

        setNewsLoading(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        (() => getNews(1, newsFilter))();
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

        setNewsFilter({...newsFilter, cities: citiesIds});
        setStartElement(1);
        (() => getNews(1, {...newsFilter, cities: citiesIds}))();
    };

    return (
        <div className="NewsList" ref={newsListRef}>
            <NewsFilters
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
                                citiesDict={citiesDict}
                                isAd={item.is_advert}
                                adBreedName={item.advert_breed_name}
                                adCode={item.advert_code}
                                adPrice={item.advert_cost}
                                adAmount={item.advert_number_of_puppies}
                                adCategory={item.advert_type_name}
                                videoLink={item.video_link}
                            />
                            {/* {
                                    banner!=null && (index + 1) % 20 === 0 ? <Banner inputBanner = {banner}/> : ''
                                } */}
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>}
            {(!news || !news.length) && !newsLoading && <div className="NewsList__no-news">
                <h4>Публикации не найдены</h4>
                <img src={DEFAULT_IMG.noNews} alt="Публикации не найдены"/>
            </div>}
        </div>
    )
};

export default React.memo(NewsList);