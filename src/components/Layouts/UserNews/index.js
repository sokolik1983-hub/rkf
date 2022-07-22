import React, {memo, useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Loading";
import List from "./List";
import ListFilter from './ListFilter';
import {Request} from "../../../utils/request";
import {endpointGetNews, endpointDeleteArticle} from "./config";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const UserNews = ({
    canEdit,
    alias,
    needRequest,
    setNeedRequest,
    first_name,
    last_name,
    isFederation,
    counters,
    setCounters
}) => {
    const [filters, setFilters] = useState(null);
    const [news, setNews] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const newsListRef = useRef(null);

    useEffect(() => {
        if (needRequest) {
            setStartElement(1);
            (() => getNews(1))();
        }
    }, [needRequest]);

    const getNews = async startElem => {
        setLoading(true);

        await Request({
            url: `${endpointGetNews}?alias=${alias}&start_element=${startElem}${
                filters?.is_must_read ? '&is_must_read=' + filters.is_must_read : 
                filters ?
                (filters.is_advert) ?
                    '&is_advert=' + filters.is_advert + '&advert_category_id=' + filters.advert_category_id :
                    '&is_advert=' + filters.is_advert
                : 
                ''
            }`
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

                setNews(prev => startElem === 1 ? modifiedNews : [...prev, ...modifiedNews]);
            } else {
                if (startElem === 1) {
                    setNews([]);
                }

                setHasMore(false);
            }
        }, error => {
            console.log(error.response);
        });

        setNeedRequest(false);
        setLoading(false);
    };

    const getNextNews = () => {
        if (hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10))();
        }
    };

    const deleteArticle = async id => {
        if (window.confirm('Вы действительно хотите удалить эту новость?')) {
            await Request({
                url: '/api/Article/' + id,
                method: 'DELETE'
            }, () => {
                if(setCounters) {
                    setCounters({...counters, publications_count: counters.publications_count - 1});
                }

                setLoading(true);
                getNews(1, true);
            }, error => {
                console.log(error);
                alert('Новость не удалена');
            });
        }
    };

    const closeAd = async id => {
        if (window.confirm('Вы действительно хотите закрыть объявление?')) {
            await Request({
                url: endpointDeleteArticle,
                method: 'PUT',
                data: JSON.stringify({id: id, is_closed_advert: true})
            }, () => {
                setNeedRequest(true);
            },
            error => {
                console.log(error);
                alert('Объявление не закрыто');
            });
        }
    };

    return (
        <div className="news-component" ref={newsListRef}>
            <div className="news-component__header-wrap">
                <div className="news-component__header">
                    <h4 className="news-component__title">Публикации</h4>
                    <ListFilter
                        setFilters={setFilters}
                        setNeedRequest={setNeedRequest}
                        isFederation={isFederation}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={news.length}
                next={getNextNews}
                hasMore={hasMore}
                loader={loading && <Loading centered={false} />}
                endMessage={
                    <div className="user-news__content">
                        <h4 className="user-news__text">{news.length ? 'Публикаций больше нет' : 'Публикации не найдены'}</h4>
                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt={news.length ? 'Публикаций больше нет' : 'Публикации не найдены'} />
                    </div>
                }
            >
                <List
                    list={news}
                    canEdit={canEdit}
                    className="user-news"
                    isFullDate={true}
                    removable={canEdit}
                    onAdClose={closeAd}
                    onDelete={deleteArticle}
                    first_name={first_name}
                    last_name={last_name}
                />
            </InfiniteScroll>
        </div>
    )
};

export default memo(UserNews);