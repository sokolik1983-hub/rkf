import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "components/Card";
import Loading from "components/Loading";
import NewsFeedItem from "../NewsFeedItem";
import { Request } from "utils/request";
import { DEFAULT_IMG } from "appConfig";
import ls from "local-storage";
import './styles.scss';

const NewsList = ({ canEdit, activeCategoryId }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const profileId = ls.get('profile_id');
    const userAlias = ls.get('user_info').alias;

    useEffect(() => {
        setLoading(true);
        getNews(1, true);
    }, [activeCategoryId]);

    const getNews = (startElement = 1, reset = false) => {
        Request({
            url: `/api/article/articles_feed?profile_id=${profileId}&start_element=${startElement}&size=10&filter_type=${activeCategoryId}`
        },
            data => {
                setNews(reset ? data.articles : [...news, ...data.articles]);
                setLoading(false);
                if (data.articles.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            },
            error => {
                console.log(error.response);
                setLoading(false);
            });
    }

    const getNextNews = () => {
        if (hasMore) {
            setStartElement(startElement + 10);
            (() => getNews(startElement + 10))();
        }
    };

    const deleteNewsItem = async id => {
        if (window.confirm('Вы действительно хотите удалить эту новость?')) {
            await Request({
                url: '/api/Article/' + id,
                method: 'DELETE'
            }, () => {
                setLoading(true);
                getNews(1, true);
            },
                error => {
                    console.log(error);
                    alert('Новость не удалена');
                });
        }
    };

    const handleSuccess = () => {
        setLoading(true);
        getNews(1, true);
    }

    return loading
        ? <Loading centered={false} />
        : news
            ? <InfiniteScroll
                dataLength={news.length}
                next={getNextNews}
                hasMore={hasMore}
                loader={<Loading centered={false} />}
                endMessage={
                    <div className="NewsList__no-news">
                        <h4>Публикаций больше нет</h4>
                        <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет" />
                    </div>
                }
            >
                {
                    news.map(n => <NewsFeedItem
                        key={n.id}
                        {...n}
                        canEdit={canEdit}
                        profileId={profileId}
                        deleteNewsItem={deleteNewsItem}
                        handleSuccess={handleSuccess}
                        userAlias={userAlias}
                    />)
                }
            </InfiniteScroll>
            : <Card>
                <div className="NewsList__no-news">
                    <h4>Публикации не найдены</h4>
                    <img src={DEFAULT_IMG.noNews} alt="Публикации не найдены" />
                </div>
            </Card>
};

export default React.memo(NewsList);