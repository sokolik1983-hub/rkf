import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "components/Card";
import Loading from "components/Loading";
import NewsFeedItem from "../NewsFeedItem";
import { Request } from "utils/request";
import { DEFAULT_IMG } from "appConfig";
import ls from "local-storage";
import './styles.scss';

const NewsList = ({ canEdit, activeCategoryId, notifySuccess, notifyError }) => {
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
                setNews(reset ? data ? data.articles : [] : [...news, ...data.articles]);
                setLoading(false);
                if (!data || data.articles?.length < 10) {
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

    const onAdClose = async (id) => {
        if (window.confirm('Вы действительно хотите закрыть это объявление?')) {
            await Request({
                url: '/api/Article/',
                method: 'PUT',
                data: JSON.stringify({ "id": id, "is_closed_advert": true })
            }, () => {
                setLoading(true);
                getNews(1, true);
            },
                error => {
                    console.log(error);
                    alert('Объявление не закрыто');
                });
        }
    };

    const handleSuccess = () => {
        setLoading(true);
        getNews(1, true);
    };

    const handleUnsubscribe = id => {
        if (window.confirm('Вы действительно хотите отписаться?')) {
            Request({
                url: '/api/article/unsubscribe',
                method: 'PUT',
                data: JSON.stringify({ "subscription_profile_id": id })
            }, () => {
                getNews(1, true);
                notifySuccess && notifySuccess('Подписка отменена!')
            },
                e => {
                    notifyError ? notifyError(e) : alert('Произошла ошибка');
                    setLoading(false);
                });
        }
    };

    const handleHaveRead = id => {
        Request({
            url: '/api/article/confirm_reading',
            method: 'PUT',
            data: JSON.stringify(id)
        }, () => {
            getNews(1, true);
            notifySuccess && notifySuccess('Прочитано!')
        },
            e => {
                notifyError ? notifyError(e) : alert('Произошла ошибка');
                setLoading(false);
            });
    };

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
                        onAdClose={onAdClose}
                        handleSuccess={handleSuccess}
                        userAlias={userAlias}
                        handleUnsubscribe={handleUnsubscribe}
                        handleHaveRead={handleHaveRead}
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