import React, {memo, useState, useEffect, useContext, useRef} from "react";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import OutsideClickHandler from "react-outside-click-handler";
import ls from "local-storage";
import Loading from "../../../../Loading";
import PopupModal from '../../../../PopupModal';
import NotificationCategories from './NotificationCategories';
import NotificationItem from './NotificationItem';
import {blockContent} from '../../../../../utils/blockContent';
import {Request} from "../../../../../utils/request";
import {NotificationsContext} from "../../../../../app/context";
import {connectWidgetLogin} from "../../../../../pages/Login/connectors";
import {DEFAULT_IMG} from "../../../../../appConfig";
import "./styles.scss";


const defaultCategories = [
    {
        id: 2,
        name: 'Новые',
        icon: '/static/new-icons/notifications/new.svg'
    },
    {
        id: 3,
        name: 'Важные',
        icon: '/static/new-icons/notifications/required.svg'
    },
    {
        id: 4,
        name: 'Заявки',
        icon: '/static/new-icons/notifications/applications.svg'
    }
];

const Notifications = ({isAuthenticated}) => {
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [notificationsList, setNotificationsList] = useState([]);
    const [showDot, setShowDot] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(2);
    const [categories, setCategories] = useState(defaultCategories);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const {notification} = useContext(NotificationsContext);
    const alias = ls.get('user_info') ? ls.get('user_info')?.alias : '';
    const user_type = ls.get('user_info')?.user_type;

    const notificationsRef = useRef();

    useEffect(() => {
        if (notification.value.length) {
            setShowDot(true);
            getNotifications(currentCategory, startElement);
        } else {
            setShowDot(notification.hasNewMessage);
        }

        if (loaded && notification.value) {
            const updated = [...notificationsList];
            updated?.length > 11 && updated.pop();
            updated.unshift(JSON.parse(notification.value));
            setNotificationsList(updated);
        }
    }, [notification]);

    useEffect(() => {
        if(open) {
            blockContent(true);
        } else {
            blockContent(false);
        }
    }, [open]);

    const getNotifications = async (currentCategory, startElement) => {
        if(startElement === 1) setLoaded(false);

        await Request({
            url: `/api/article/notifications?type=${currentCategory}&start_element=${startElement}`,
        }, ({notifications, counters}) => {
            const {counter_of_new, counter_of_must_to_read, counter_of_request} = counters;

            if (Object.values(counters).reduce((a, b) => a + b) === 0) {
                setShowDot(false);
            }

            setCategories([
                { ...categories.find(category => category.id === 2), count: counter_of_new },
                { ...categories.find(category => category.id === 3), count: counter_of_must_to_read },
                { ...categories.find(category => category.id === 4), count: counter_of_request }
            ]);

            setNotificationsList(startElement === 1 ? [...notifications] : [...notificationsList, ...notifications]);

            if (!notifications || notifications.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        }, error => {
            console.log(error)
        });

        if(startElement === 1) setLoaded(true);
    };

    const getNextNotifications = async () => {
        if (hasMore) {
            setStartElement(startElement + 10);
            await getNotifications(currentCategory, startElement + 10);
        }
    };

    const handleIconClick = async () => {
        setOpen(!open);
        if(!open) await getNotifications(currentCategory, startElement);
    };

    const handleTabClick = async categoryId => {
        setCurrentCategory(categoryId);
        setStartElement(1);

        await getNotifications(categoryId, 1);
    };

    const buildUrl = (id = '') => {
        return user_type === 1 ? `/user/${alias}/news-feed/${id}` :
            user_type === 3 ? `/club/${alias}/news-feed/${id}` :
            user_type === 5 ? `/${alias}/news-feed/${id}` :
            user_type === 7 ? `/nbc/${alias}/news-feed/${id}` :
            `/kennel/${alias}/news-feed/${id}`
    };

    const getNewsFeedLink = (noId = false) => {
        if (noId) return buildUrl();

        if (currentCategory === 3) {
            return buildUrl(5);
        } else if (currentCategory === 5) {
            return buildUrl(6);
        } else if (currentCategory === 2) {
            return buildUrl(7);
        } else {
            return buildUrl();
        }
    };

    const handleOutsideClick = e => {
        if (!e?.target.classList.contains('Notifications__icon')) {
            setOpen(false);
        }
    };

    return (
        <div className="Notifications">
            {isAuthenticated &&
                <>
                    <div className="Notifications__icon-wrap">
                        <div className={`Notifications__icon ${open ? ` _active` : ``}`}
                             onClick={handleIconClick}
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
                        onExited={() => {
                            setNotificationsList([]);
                            setCurrentCategory(2);
                        }}
                    >
                        <PopupModal
                            showModal={open}
                            handleClose={(e) => {
                                if(!notificationsRef.current.contains(e.target)) {
                                    setOpen(false);
                                }
                            }}
                        >
                            <div className="Notifications__inner">
                                <div className="Notifications__content">
                                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                        <div className="Notifications__title">
                                            <Link
                                                to={() => getNewsFeedLink(true)}
                                                onClick={() => setOpen(false)}
                                            >
                                                Уведомления
                                            </Link>
                                        </div>
                                        <div className="Notifications__tabs">
                                            <NotificationCategories
                                                categories={categories}
                                                currentCategory={currentCategory}
                                                onClick={handleTabClick}
                                            />
                                        </div>
                                        <div className="Notifications__list-wrap">
                                            {!loaded ?
                                                <Loading centered={false} /> :
                                                <div className="Notifications__list">
                                                    <div
                                                        className="Notifications__list-inner"
                                                        id="mobileNotificationsContainer"
                                                    >
                                                        {notificationsList.length ?
                                                            <InfiniteScroll
                                                                dataLength={notificationsList.length}
                                                                next={getNextNotifications}
                                                                hasMore={hasMore}
                                                                loader={<Loading centered={false} />}
                                                                scrollableTarget="mobileNotificationsContainer"
                                                                endMessage={
                                                                    <div className="NotificationItem nothing-found">
                                                                        <h4>Уведомлений больше нет</h4>
                                                                        <img src={DEFAULT_IMG.noNews} alt="Уведомлений больше нет" />
                                                                    </div>
                                                                }
                                                            >
                                                                {notificationsList.map((notification, i) =>
                                                                    <NotificationItem
                                                                        key={i}
                                                                        setOpen={setOpen}
                                                                        {...notification}
                                                                    />
                                                                )}
                                                            </InfiniteScroll> :
                                                            <div className="NotificationItem nothing-found">
                                                                <h4>Здесь будут ваши уведомления</h4>
                                                                <img src={DEFAULT_IMG.noNews} alt="Здесь будут ваши уведомления" />
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="Notifications__list-see-all">
                                                        <Link
                                                            className="btn btn-primary"
                                                            to={() => getNewsFeedLink()}
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            {currentCategory === 3 ? 'Все важные' :
                                                                currentCategory === 2 ? 'Все новые' :
                                                                'Все заявки'
                                                            }
                                                        </Link>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </OutsideClickHandler>
                                </div>
                            </div>
                        </PopupModal>
                    </CSSTransition>
                </>
            }
        </div>
    )
};

export default connectWidgetLogin(memo(Notifications));
