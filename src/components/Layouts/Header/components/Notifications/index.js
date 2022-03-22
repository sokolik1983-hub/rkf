import React, { forwardRef, useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import InfiniteScroll from "react-infinite-scroll-component";

import ls from 'local-storage';
import { connectLogin, connectWidgetLogin } from 'pages/Login/connectors';
import OutsideClickHandler from 'react-outside-click-handler';
import { Request } from 'utils/request';
import NotificationCategories from './NotificationCategories';
import NotificationItem from './NotificationItem';
import { NotificationsContext } from 'app/context';
import Loading from 'components/Loading';
import { DEFAULT_IMG } from 'appConfig';
import PopupModal from '../../../../PopupModal';
import useIsMobile from '../../../../../utils/useIsMobile';
import {blockContent} from '../../../../../utils/blockContent';

import "./styles.scss";


const defaultCategories = [
    {
        id: 2,
        name: 'Новые',
        icon: '/static/new-icons/notifications/new.svg',
    },
    {
        id: 3,
        name: 'Важные',
        icon: '/static/new-icons/notifications/required.svg',
    },
    {
        id: 4,
        name: 'Заявки',
        icon: '/static/new-icons/notifications/applications.svg',
    },
];

const Notifications = forwardRef(
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link }, ref) => {
        const {notificationLength, setNotificationsLength} = useState(0);
        const [loaded, setLoaded] = useState(false);
        const [open, setOpen] = useState(false);
        const [notificationsList, setNotificationsList] = useState([]);
        const [showDot, setShowDot] = useState(null);
        const [currentCategory, setCurrentCategory] = useState(2);
        const [categories, setCategories] = useState(defaultCategories);
        const { notification } = useContext(NotificationsContext);
        const alias = ls.get('user_info') ? ls.get('user_info')?.alias : '';
        const user_type = ls.get('user_info')?.user_type;
        const isMobile = useIsMobile(1080);
        const [startElement, setStartElement] = useState(1);
        const [hasMore, setHasMore] = useState(false);

        useEffect(() => {
            console.log('hasMore', hasMore)
        }, [hasMore])

        useEffect(() => {
            console.log('notificationsList in useEffect', notificationsList)
        }, [notificationsList])

        useEffect(() => {
            if (isAuthenticated) {
                open && getNotifications(currentCategory);
            }
        }, [currentCategory, isAuthenticated]);

        useEffect(() => {
            /*if (notification.value.length) {
                setShowDot(true);
                open && getNotifications(currentCategory);
            } else {
                setShowDot(notification.hasNewMessage);
            }

            if (loaded && notification.value) {
                const updated = [...notificationsList];
                updated?.length > 11 && updated.pop();
                updated.unshift(JSON.parse(notification.value));
                setNotificationsList(updated);
            }*/
        }, [notification]);

        const getNotifications = async (startElement = 1 ) => {
            console.log('getNotifications', getNotifications)
            console.log('startElement', startElement)
            setLoaded(false);
            await Request({
                url: `/api/article/notifications?type=${currentCategory}&start_element=${startElement}`,
            }, ({ notifications, counters }) => {
                console.log('notifications in data', notifications)
                const { counter_of_new, counter_of_must_to_read, counter_of_request } = counters;

                if (Object.values(counters).reduce((a, b) => a + b) === 0) {
                    setShowDot(false);
                }

                setCategories([
                    { ...categories.find(category => category.id === 2), count: counter_of_new },
                    { ...categories.find(category => category.id === 3), count: counter_of_must_to_read },
                    { ...categories.find(category => category.id === 4), count: counter_of_request }
                ]);


                setNotificationsList([...notificationsList, ...notifications]);
                setNotificationsLength && setNotificationsLength(notifications.filter(notification => notification.is_read === false).length);
                setLoaded(true);

                if (!notifications || notifications.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            }, error => {
                console.log(error)
                setLoaded(true);
            });
        }

        const getNextNotifications = () => {
            console.log('getNextNotifications')
            if (hasMore) {
                setStartElement(startElement + 10);
                (() => getNotifications(startElement + 10))();
            }
        };

        const handleNotificationsClick = () => {
            !open && getNotifications();
            setOpen(!open);
        }

        const getNewsFeedLink = (noId = false) => {
            const buildUrl = (id = '') => user_type === 1
                ? `/user/${alias}/news-feed/${id}`
                : user_type === 3 || 5
                    ? `/${alias}/news-feed/${id}`
                    : `/kennel/${alias}/news-feed/${id}`;
            if (noId) return buildUrl();
            if (currentCategory === 3) {
                return buildUrl(4);
            } else if (currentCategory === 4) {
                return buildUrl(6);
            } else if (currentCategory === 2) {
                return buildUrl(7);
            } else {
                return buildUrl();
            }
        }

        const handleOutsideClick = (e) => {
            if (!e?.target.classList.contains('Notifications__icon')) {
                setOpen(false);
            }
        }

        const notificationsRef = useRef();

        const newNotifications = currentCategory === 3 ? 'Все важные' : currentCategory === 2 ? 'Все новые' : 'Все заявки';

        useEffect(() => {
            if (open && isMobile) {
                blockContent(true)
            } else {
                blockContent(false)
            }
        }, [open])

        return (
            <div className="Notifications">
                {isAuthenticated
                && <>
                    <div className="Notifications__icon-wrap">
                        <div className={`Notifications__icon ${open ? ` _active` : ``}`}
                             onClick={handleNotificationsClick}
                             ref={notificationsRef}
                        >
                            Уведомления
                        </div>
                        {showDot && <div className="Notifications__icon-dot" />}
                    </div>
                    <CSSTransition
                        in={open}
                        timeout={350}
                        classNames="Notifications-transition"
                        unmountOnExit
                        onExited={() => { setNotificationsList([]); setCurrentCategory(2); }}
                    >
                        {isMobile ?
                            <PopupModal showModal={open}
                                        handleClose={(e) => {
                                            !notificationsRef.current.contains(e.target) && setOpen(false)
                                        }}
                            >
                                <div className="Notifications__inner">
                                    <div className="Notifications__content">
                                        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                            <div className="Notifications__title">
                                                <Link to={() => getNewsFeedLink(true)} onClick={() => setOpen(false)}>Уведомления</Link>
                                            </div>
                                            <div className="Notifications__tabs">
                                                <NotificationCategories
                                                    categories={categories}
                                                    currentCategory={currentCategory}
                                                    setCurrentCategory={setCurrentCategory}
                                                    setStartElement={setStartElement}
                                                />
                                            </div>
                                            <div className="Notifications__list-wrap">
                                                {!loaded
                                                    ? <Loading centered={false} />
                                                    : <>
                                                        <div className="Notifications__list">
                                                            <div className="Notifications__list-inner">
                                                                { notificationsList.length ?
                                                                <InfiniteScroll
                                                                    dataLength={notificationsList.length}
                                                                    next={getNextNotifications}
                                                                    hasMore={hasMore}
                                                                    loader={<Loading centered={false} />}
                                                                    endMessage={
                                                                        <div className="news-list__no-news">
                                                                            <h4>Уведомлений больше нет</h4>
                                                                            <img src={DEFAULT_IMG.noNews} alt="Публикаций больше нет" />
                                                                        </div>
                                                                    }
                                                                >
                                                                    { notificationsList.map((n, key) => {
                                                                        return <React.Fragment key={ key }>
                                                                            <NotificationItem  { ...n } setOpen={ setOpen }/>
                                                                        </React.Fragment>
                                                                    }) }

                                                                </InfiniteScroll>
                                                                 : <div className="NotificationItem nothing-found">
                                                                <h4>Здесь будут ваши уведомления</h4>
                                                                <img src={DEFAULT_IMG.noNews} alt="Здесь будут ваши уведомления" />
                                                            </div>
                                                                }




                                                            </div>
                                                            <div className="Notifications__list-see-all">
                                                                <Link className="btn btn-primary" to={() => getNewsFeedLink()} onClick={() => setOpen(false)}>{newNotifications}</Link>
                                                            </div>
                                                        </div>
                                                    </>}
                                            </div>
                                        </OutsideClickHandler>
                                    </div>
                                </div>
                            </PopupModal>
                            :
                            <div className="Notifications__content">
                                <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                    <div className="Notifications__title">
                                        <Link to={() => getNewsFeedLink(true)} onClick={() => setOpen(false)}>Уведомления</Link>
                                    </div>
                                    <div className="Notifications__tabs">
                                        <NotificationCategories
                                            categories={categories}
                                            currentCategory={currentCategory}
                                            setCurrentCategory={setCurrentCategory}
                                            setStartElement={setStartElement}
                                        />
                                    </div>
                                    <div className="Notifications__list-wrap">
                                        {!loaded
                                            ? <Loading centered={false} />
                                            : <>
                                                <div className="Notifications__list">
                                                    <div className="Notifications__list-inner" id="notificationsList">
                                                        { notificationsList.length ?
                                                                <InfiniteScroll
                                                                    dataLength={notificationsList.length}
                                                                    next={getNextNotifications}
                                                                    hasMore={hasMore}
                                                                    loader={<Loading centered={false} />}
                                                                    scrollableTarget="notificationsList"
                                                                    endMessage={
                                                                        <div className="news-list__no-news">
                                                                            <h4>Уведомлений больше нет</h4>
                                                                            <img src={DEFAULT_IMG.noNews} alt="Уведомлений больше нет" />
                                                                        </div>
                                                                    }
                                                                >
                                                                    { notificationsList.map((n, key) => {
                                                                        return <React.Fragment key={ key }>
                                                                            <NotificationItem  { ...n } setOpen={ setOpen }/>
                                                                        </React.Fragment>
                                                                    }) }
                                                                    </InfiniteScroll>
                                                                : <div className="NotificationItem nothing-found">
                                                                    <h4>Здесь будут ваши уведомления</h4>
                                                                    <img src={DEFAULT_IMG.noNews} alt="Здесь будут ваши уведомления" />
                                                                </div>
                                                        }
                                                    </div>
                                                    <div className="Notifications__list-see-all">
                                                        <Link className="btn btn-primary" to={() => getNewsFeedLink()} onClick={() => setOpen(false)}>{newNotifications}</Link>
                                                    </div>
                                                </div>
                                            </>}
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        }
                    </CSSTransition>
                </>
                }
            </div>

        )
    }
)

export default connectWidgetLogin(connectLogin(React.memo(Notifications)));
