import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import List from "components/List";
import ListFilter from './ListFilter';
import { Request } from "utils/request";
import { endpointGetNews, endpointDeleteArticle } from "./config";
import InfiniteScroll from "react-infinite-scroll-component";
import { DEFAULT_IMG } from "appConfig";
import "./index.scss";


const UserNews = ({ user, canEdit, alias, page, setPage, needRequest, setNeedRequest }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getNews = async (reset = false) => {
        setNewsLoading(true);
        await Request({
            url: `${endpointGetNews}?alias=${alias}&start_element=${page}`
        }, data => {
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
                setPage(page + 10);
                data.articles.length < 10 && setHasMore(false);
            } else {
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
            await Request({
                url: endpointDeleteArticle + id,
                method: 'DELETE'
            }, () => setNeedRequest(true),
                error => {
                    console.log(error);
                    alert('Новость не удалена');
                });
        }
    };

    useEffect(() => {
        if (needRequest) (() => getNews(true))();
    }, [needRequest]);

    return loading ?
        <Loading /> :
        <div className="news-component">
            <div className="news-component__header-wrap">
                <div className="news-component__header">
                    <h4 className="news-component__title">Публикации</h4>
                    <ListFilter />
                </div>
            </div>
            {!news || !news.length ?
                <Card className="user-news">
                    <div className="user-news__content">
                        <h4 className="user-news__text">Новости не найдены</h4>
                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей" />
                    </div>
                </Card> :
                <InfiniteScroll
                    dataLength={news.length}
                    next={getNews}
                    hasMore={hasMore}
                    loader={newsLoading && <Loading centered={false} />}
                    endMessage={
                        <div className="user-news__content">
                            <h4 className="user-news__text">Новостей больше нет</h4>
                            <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей" />
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