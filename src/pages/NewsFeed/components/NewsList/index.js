import React, {memo, useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ls from "local-storage";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import NewsFeedItem from "../NewsFeedItem";
import {Request} from "../../../../utils/request";
import {DEFAULT_IMG} from "../../../../appConfig";
import ControlMenu from "../ControlMenu";
import Alert from "../../../../components/Alert";

import "./styles.scss";


const NewsList = ({
                      canEdit,
                      activeCategoryId,
                      notifySuccess,
                      notifyError,
                      setCountersChanges,
}) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const profileId = ls.get('profile_id');
    const userAlias = ls.get('user_info').alias;
    const [checkedItemsIds, setCheckedItemsIds] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false)
    const [isControlCheckedAll, setIsControlCheckedAll] = useState(false);
    const [clearChecks, setClearChecks] = useState(false);
    const [isUnreadMessages, setIsUnreadMessages] = useState(false);
    const [isUpdateWithAllChecks, setIsUpdateWithAllChecks] = useState(false);
    const [zipMessage, setZipMessage] = useState('');

    const allItemsIds = [];
    news.map(n => allItemsIds.push(n.id));

    useEffect(() => {
        setLoading(true);
        setCheckedItemsIds([]);
        setCheckedAll(false);
        setIsControlCheckedAll(false);
        setClearChecks(false);
        setIsUnreadMessages(false);
        setIsUpdateWithAllChecks(false);
        setZipMessage('');

        setStartElement(1);
        (() => getNews(1, true))();
    }, [activeCategoryId]);

    useEffect(() => {
        !isControlCheckedAll && setIsUpdateWithAllChecks(false);
    },[isControlCheckedAll])

    const getNews = async (startElement = 1, reset = false, elementsCount = 10) => {
        await Request({
            url: `/api/article/articles_feed?profile_id=${profileId}&start_element=${startElement}&size=${elementsCount}&filter_type=${activeCategoryId}`
        }, data => {
            setIsControlCheckedAll(false);
            setClearChecks(false);
            setCheckedAll(false);
            setIsUnreadMessages(false);

            startElement === 1 && setCheckedItemsIds([]);
            startElement !== 1 && isControlCheckedAll && setIsUpdateWithAllChecks(true);

            setNews(reset ? data ? data.articles : [] : [...news, ...data.articles]);

            if (!data || data.articles?.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        });
    };

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
            }, error => {
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
            }, error => {
                console.log(error);
                alert('Объявление не закрыто');
            });
        }
    };

    const handleSuccess = async () => {
        setLoading(true);
        await getNews(1, true);
    };

    const handleUnsubscribe = async id => {
        if (window.confirm('Вы действительно хотите отписаться?')) {
            await Request({
                url: '/api/article/unsubscribe',
                method: 'PUT',
                data: JSON.stringify({ "subscription_profile_id": id })
            }, () => {
                getNews(1, true);
                notifySuccess && notifySuccess('Подписка отменена!')
            }, e => {
                notifyError ? notifyError(e) : alert('Произошла ошибка');
                setLoading(false);
            });
        }
    };

    const handleHaveRead = async id => {
        await Request({
            url: '/api/article/confirm_reading',
            method: 'PUT',
            data: JSON.stringify(id)
        }, () => {
            getNews(1, true);
            notifySuccess && notifySuccess('Прочитано!')
        }, e => {
            notifyError ? notifyError(e) : alert('Произошла ошибка');
            setLoading(false);
        });
    };

    const handleCheckedItemsIds = (id, action) => {
        const newCheckedItemsIds = [...checkedItemsIds];

        action === 'add'
            ? checkedItemsIds.indexOf(id) === -1 && newCheckedItemsIds.push(id)
            : checkedItemsIds.indexOf(id) !== -1 && newCheckedItemsIds.splice(checkedItemsIds.indexOf(id), 1);

        setCheckedItemsIds(newCheckedItemsIds);
        checkReadability(newCheckedItemsIds);

        (newCheckedItemsIds.length === news.length) && setIsControlCheckedAll(true);
    }

    const handleCheckAll = (all = false) => {
        !checkedAll ? setCheckedAll(true) : setCheckedAll(false);
        !isControlCheckedAll ? setIsControlCheckedAll(true) && setCheckedAll(true) : setIsControlCheckedAll(false);

        isControlCheckedAll && all && setCheckedAll(false);
        !isControlCheckedAll && all && setCheckedAll(true);

        !checkedAll || (checkedAll && !isControlCheckedAll)
            ? setCheckedItemsIds(allItemsIds) : setCheckedItemsIds([]);
    }

    const unsetCheckedAll = () => {
        setIsControlCheckedAll(false);
    }

    const unsetAllChecks = () => {
        setClearChecks(true);
        setCheckedItemsIds([]);
        setIsUpdateWithAllChecks(false);
    }

    const checkReadability = (ids) => {
        let unReadMessages = [];

        ids.forEach(id => {
            news.forEach(n => {
                (n.id === id && n.is_read === false) &&
                unReadMessages.push(id)
            })
        })

        unReadMessages.length ? setIsUnreadMessages(true) : setIsUnreadMessages(false);
    }

    return loading

        ? <Loading centered={false} />
        : news
            ?
            <>
                <ControlMenu
                    isControlCheckedAll={isControlCheckedAll}
                    isControlReadAllOn={isUnreadMessages}
                    handleCheckAll={handleCheckAll}
                    selectedItemsIds={checkedItemsIds}
                    categoryId={activeCategoryId}
                    updateNews={getNews}
                    unsetAllChecks={unsetAllChecks}
                    startElement={startElement}
                    isUpdateWithAllChecks={isUpdateWithAllChecks}
                    setZipMessage={setZipMessage}
                    setCountersChanges={setCountersChanges}
                />

                <InfiniteScroll
                    dataLength={news.length}
                    next={getNextNews}
                    hasMore={hasMore}
                    loader={<Loading centered={false} />}
                    endMessage={
                        <div className="news-list__no-news">
                            <h4>Публикаций больше нет</h4>
                            <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет" />
                        </div>
                    }
                >
                    <div>
                        {news.map(n =>
                            <NewsFeedItem
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
                                handleCheckedItemsIds={handleCheckedItemsIds}
                                checkedAll={checkedAll}
                                unsetCheckedAll={unsetCheckedAll}
                                isControlCheckedAll={isControlCheckedAll}
                                clearChecks={clearChecks}
                                photos={n.pictures}
                            />
                        )}
                    </div>

                </InfiniteScroll>

                {zipMessage &&
                    <Alert
                        text={zipMessage}
                        autoclose={2}
                        onOk={() => setZipMessage('')}
                    />
                }

            </>
            : <Card>
                <div className="news-list__no-news">
                    <h4>Публикации не найдены</h4>
                    <img src={DEFAULT_IMG.noNews} alt="Публикации не найдены" />
                </div>
            </Card>
};

export default memo(NewsList);
