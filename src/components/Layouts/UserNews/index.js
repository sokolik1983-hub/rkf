import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Loading";
import List from "./List";
import ListFilter from './ListFilter';
import {Request} from "../../../utils/request";
import {endpointGetNews, endpointDeleteArticle} from "./config";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const UserNews = ({canEdit, alias, needRequest, setNeedRequest, setProfileInfo, profileInfo, first_name, last_name}) => {
    const [filters, setFilters] = useState(null);
    const [news, setNews] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const newsListRef = useRef(null);

    const getNews = async startElem => {
        setLoading(true);

        await Request({
            url: `${endpointGetNews}?alias=${alias}&start_element=${startElem}${filters ? '&is_advert=' + filters.is_advert : ''}`
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
        }, error => {
            console.log(error.response);
        });

        setNeedRequest(false);
        setLoading(false);
    };

    const deleteArticle = async id => {
        if (window.confirm('Вы действительно хотите удалить эту новость?')) {
            const el = newsListRef.current;
            el && window.scrollTo(0, el.offsetTop - 44);

            await Request({
                url: endpointDeleteArticle + id,
                method: 'DELETE'
            }, () => {
                setNeedRequest(true);
                setProfileInfo({...profileInfo, 
                    counters: {
                        ...profileInfo.counters,
                        publications_count: profileInfo.counters.publications_count - 1
                    }});
            },
            error => {
                console.log(error);
                alert('Новость не удалена');
            });
        }
    };

    const closeAd = async (id, setIsOpenControls) => {
        if (window.confirm('Вы действительно хотите закрыть объявление?')) {
            await Request({
                url: endpointDeleteArticle,
                method: 'PUT',
                data: JSON.stringify({ "id": id, "is_closed_advert": true })
            }, () => { setNeedRequest(true); setIsOpenControls(false) },
            error => {
                console.log(error);
                alert('Объявление не закрыто');
            });
        }
    };

    const getNextNews = () => {
        if (hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10))();
        }
    };

    useEffect(() => {
        if (needRequest) {
            setStartElement(1);
            (() => getNews(1))();
        }
    }, [needRequest]);

    return (
        <div className="news-component" ref={newsListRef}>
            <div className="news-component__header-wrap">
                <div className="news-component__header">
                    <h4 className="news-component__title">Публикации</h4>
                    <ListFilter
                        setFilters={setFilters}
                        setNeedRequest={setNeedRequest}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={news.length}
                next={getNextNews}
                hasMore={hasMore}
                loader={loading && <Loading centered={false}/>}
                endMessage={
                    <div className="user-news__content">
                        <h4 className="user-news__text">{news.length ? 'Публикаций больше нет' : 'Публикации не найдены'}</h4>
                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt={news.length ? 'Публикаций больше нет' : 'Публикации не найдены'} />
                    </div>
                }
            >
                <List
                    list={news}
                    listNotFound="Публикации не найдены"
                    listClass="user-news"
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

export default React.memo(UserNews);