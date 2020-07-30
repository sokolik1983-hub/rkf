import React, { useState, useEffect, useRef } from "react";
import Card from "../../../../components/Card";
import CitySelect from "../../../../components/CitySelect";
import ListFilter from './ListFilter';
import ListItem from "../../../../components/ListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { endpointGetNews } from "../../config";
import Loading from "components/Loading";
import { DEFAULT_IMG } from "appConfig";
import { Request } from "utils/request";
import './index.scss';

function getCity() {
    const l = localStorage.getItem('GLOBAL_CITY');
    return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
}

const NewsList = ({
    isFullDate = true,
    currentActiveType,
    citiesDict
}) => {
    const [activeType, setActiveType] = useState(false);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [newsFilter, setNewsFilter] = useState({
        city: getCity(),
        activeType: currentActiveType
    });

    useEffect(() => {
        getNews(true);
        setPage(1);
    }, [newsFilter]);

    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
    };

    const getNews = async (reset = false) => {
        setNewsLoading(true);
        const buildUrl = () => {
            return `${endpointGetNews}?start_element=${reset ? 1 : page}${newsFilter.city && newsFilter.city.value ? `&fact_city_ids=${newsFilter.city.value}` : ''}${newsFilter.activeType ? `&${newsFilter.activeType}=true` : ''}`
        };
        const handleData = data => {
            let modifiedNews = [];
            let currentNews = reset ? [] : news;

            if (data.articles.length) {
                modifiedNews = currentNews.concat(
                    data.articles.map(article => {
                        article.title = article.club_name;
                        article.url = `/news/${article.id}`;
                        return article;
                    })
                );
                setNews(modifiedNews);
                setPage(reset ? 11 : page + 10);
                reset ? setHasMore(true) : (data.articles.length < 10 && setHasMore(false));
            } else {
                reset ? setNews([]) : setHasMore(false);
            }
        };

        await Request({ url: buildUrl() }, data => handleData(data), error => console.log(error.response));
        setNewsLoading(false);
    };

    const newsListRef = useRef(null);
    const handleFilterUpdate = (data) => {
        const el = newsListRef.current;
        el && window.scrollTo(0, el.offsetTop - 50);
        setNewsFilter(data);
    }

    return <div className="NewsList" ref={newsListRef}>
        <div className="NewsList__head">
            <div className="NewsList__head-wrap">
                <div className="Homepage__news-title">
                    <h3>Публикации</h3>
                    <div className="Homepage__news-mobile-only">
                        <CitySelect
                            currentCity={newsFilter.city}
                            cityFilter={city => {
                                if (city !== newsFilter.city) {
                                    handleFilterUpdate({ city: city });
                                    setPage(1);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="NewsList__filters">
                    <div className="Homepage__news-title-wrap">
                        <ul className="ListFilter">
                            <li><a href="/" onClick={handleClick} className={!activeType ? 'active' : undefined}>Все</a></li>
                            <li><a href="/" onClick={handleClick} name="news" className={activeType === 'news' ? 'active' : undefined}>Новости</a></li>
                            <li style={{ opacity: '0.5' }}><span>Объявления</span></li>
                        </ul>
                        <CitySelect
                            currentCity={newsFilter.city}
                            cityFilter={city => {
                                if (city !== newsFilter.city) {
                                    handleFilterUpdate({ city: city });
                                    setPage(1);
                                }
                            }}
                        />
                    </div>
                    <ListFilter
                        setNewsFilter={handleFilterUpdate}
                        setPage={setPage}
                        currentActiveType={currentActiveType}
                        currentCity={newsFilter.city}
                    />
                </div>
            </div>
        </div>
        {news && !!news.length &&
            <InfiniteScroll
                dataLength={news.length}
                next={getNews}
                hasMore={hasMore}
                loader={newsLoading && <Loading centered={false} />}
                endMessage={
                    <div className="NewsList__no-news">
                        <h4>Новостей больше нет</h4>
                        <img src={DEFAULT_IMG.noNews} alt="У вас нет новостей" />
                    </div>
                }
            >
                <ul className="NewsList__content">
                    {news && !!news.length && news.map(item => (
                        <li className="NewsList__item" key={item.id}>
                            {
                                <Card>
                                    <ListItem
                                        user={item.user_type}
                                        id={item.id}
                                        name={item.name}
                                        city={item.fact_city_name}
                                        date={item.create_date}
                                        isFullDate={isFullDate}
                                        photo={item.picture_link}
                                        text={item.content}
                                        url={`/news/${item.id}`}
                                        alias={item.alias}
                                        logo_link={item.logo_link}
                                        setNewsFilter={handleFilterUpdate}
                                        setPage={setPage}
                                        citiesDict={citiesDict}
                                        currentActiveType={currentActiveType}
                                    />
                                </Card>
                            }
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>}
        {(!news || !news.length) && !newsLoading && <div className="NewsList__no-news">
            <h4>Ничего не найдено</h4>
            <img src={DEFAULT_IMG.noNews} alt="У вас нет новостей" />
        </div>}
    </div>
};

export default React.memo(NewsList);