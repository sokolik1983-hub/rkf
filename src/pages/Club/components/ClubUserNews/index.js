import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import List from "../../../../components/List";
import ListFilter from './ListFilter';
import { Request } from "../../../../utils/request";
import { endpointGetNews, endpointDeleteArticle } from "./config";
import { DEFAULT_IMG } from "../../../../appConfig";
import "./index.scss";


const UserNews = ({ canEdit, alias, needRequest, setNeedRequest }) => {
    const [filters, setFilters] = useState(null);
    const [news, setNews] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [loading, setLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const newsListRef = useRef(null);

    const getNews = async startElem => {
        setNewsLoading(true);

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
        }, error => {
            console.log(error.response);
        });

        setNeedRequest(false);
        setNewsLoading(false);
        setLoading(false);
    };

    const deleteArticle = async id => {
        if (window.confirm('Вы действительно хотите удалить эту новость?')) {
            const el = newsListRef.current;
            el && window.scrollTo(0, el.offsetTop - 44);

            await Request({
                url: endpointDeleteArticle + id,
                method: 'DELETE'
            },
            () => setNeedRequest(true),
            error => {
                console.log(error);
                alert('Новость не удалена');
            });
        }
    };

    const getNextNews = () => {
        if(hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10))();
        }
    };

    useEffect(() => {
        if (needRequest) {
            const el = newsListRef.current;
            el && window.scrollTo(0, el.offsetTop - 44);

            setStartElement(1);
            (() => getNews(1))();
        }
    }, [needRequest]);

    return loading ?
        <Loading /> :
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
            {!news || !news.length ?
                <Card className="user-news">
                    <div className="user-news__content">
                        <h4 className="user-news__text">{`${filters && filters.is_advert ? 'Объявления' : 'Новости'} не найдены`}</h4>
                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей" />
                    </div>
                </Card> :
                <InfiniteScroll
                    dataLength={news.length}
                    next={getNextNews}
                    hasMore={hasMore}
                    loader={newsLoading && <Loading centered={false} />}
                    endMessage={
                        <div className="user-news__content">
                            <h4 className="user-news__text">{`${filters && filters.is_advert ? 'Объявлений' : 'Новостей'} больше нет`}</h4>
                            <img className="user-news__img" src={DEFAULT_IMG.noNews} alt={`У вас нет ${filters && filters.is_advert ? 'объявлений' : 'новостей'}`} />
                        </div>
                    }
                >
                    <List
                        list={news}
                        listNotFound="Новости не найдены"
                        listClass="user-news"
                        isFullDate={true}
                        removable={canEdit}
                        onDelete={deleteArticle}
                    />
                </InfiniteScroll>
            }
        </div>
};

export default React.memo(UserNews);