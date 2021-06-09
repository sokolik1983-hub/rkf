import React, { forwardRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ls from "local-storage";
import { connectLogin, connectWidgetLogin } from "pages/Login/connectors";
import OutsideClickHandler from "react-outside-click-handler";
import { Request } from "utils/request";
import LightTooltip from "components/LightTooltip";
import NotificationCategories from "./NotificationCategories";
import NotificationItem from "./NotificationItem";
import { NotificationsContext } from 'app/context';
import Loading from "components/Loading";
import { DEFAULT_IMG } from "appConfig";
import "./styles.scss";
import useIsMobile from "../../../../../utils/useIsMobile";

const defaultCategories = [
    {
        id: 2,
        name: 'Новые',
        icon: '/static/new-icons/notifications/new.svg',
        count: 0
    },
    {
        id: 3,
        name: 'Важные',
        icon: '/static/new-icons/notifications/required.svg',
        count: 0
    },
    {
        id: 4,
        name: 'Заявки',
        icon: '/static/new-icons/notifications/applications.svg',
        count: 0
    },
];

const Notifications = forwardRef(
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link, setNotificationsLength }, ref) => {
        const [loaded, setLoaded] = useState(false);
        const [open, setOpen] = useState(false);
        const [notifications, setNotifications] = useState([]);
        const [showDot, setShowDot] = useState(null);
        const [currentCategory, setCurrentCategory] = useState(2);
        const [categories, setCategories] = useState(defaultCategories);

        const { notification } = useContext(NotificationsContext);
        const alias = ls.get('user_info') ? ls.get('user_info')?.alias : '';
        const user_type = ls.get('user_info')?.user_type;

        const isMobile = useIsMobile(1025);

        useEffect(() => {
            if (isAuthenticated) {
                getNotifications(currentCategory);
            }
        }, [currentCategory, isAuthenticated]);

        useEffect(() => {
            if (notification.value.length) {
                setShowDot(true);
                getNotifications(currentCategory);
            } else {
                setShowDot(notification.hasNewMessage);
            }

            if (loaded && notification.value) {
                const updated = [...notifications];
                updated?.length > 11 && updated.pop();
                updated.unshift(JSON.parse(notification.value));
                setNotifications(updated);
            }
        }, [notification]);

        const getNotifications = async (type = 2) => {
            setLoaded(false);
            await Request({
                url: `/api/article/notifications?id=${type}`
            }, ({ notifications, counters }) => {
                const { counter_of_new, counter_of_must_to_read, counter_of_request } = counters;
                if (Object.values(counters).reduce((a, b) => a + b) === 0) {
                    setShowDot(false);
                }
                setCategories([
                    { ...categories.find(c => c.id === 2), count: counter_of_new },
                    { ...categories.find(c => c.id === 3), count: counter_of_must_to_read },
                    { ...categories.find(c => c.id === 4), count: counter_of_request }
                ]);
                setNotifications(notifications);
                setNotificationsLength && setNotificationsLength(notifications.filter(n => n.is_read === false).length);
                setLoaded(true);
            }, error => {
                console.log(error)
                setLoaded(true);
            });
        }

        const handleNotificationsClick = () => {
            !open && getNotifications();
            setOpen(!open);
        }

        const getNewsFeedLink = (noId = false) => {
            const buildUrl = (id = '') => user_type === 1
                ? `/user/${alias}/news-feed/${id}`
                : user_type === 3
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
            if (!e?.target.className.includes('Notifications__icon')) {
                setOpen(false);
            }
        }

        return (
            <div className="Notifications">
                {isAuthenticated
                    && <>
                        <LightTooltip title="Уведомления" enterDelay={200} leaveDelay={200}>
                            <div className="Notifications__icon-wrap">
                                <div
                                    className={`Notifications__icon ${open ? ` _active` : ``} ${isMobile && "__mobile"}`}
                                    onClick={handleNotificationsClick}

                                />
                                         {showDot && <div className="Notifications__icon-dot" />}
                            </div>
                        </LightTooltip>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="Notifications-transition"
                            unmountOnExit
                            onExited={() => { setNotifications([]); setCurrentCategory(2); }}
                        >
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
                                        />
                                    </div>
                                    <div className="Notifications__list-wrap">
                                        {!loaded
                                            ? <Loading centered={false} />
                                            : <>
                                                <div className="Notifications__list">
                                                    <div className="Notifications__list-inner">
                                                        {
                                                            notifications.length
                                                                ? notifications.map((n, key) => {
                                                                    return <React.Fragment key={key}>
                                                                        <NotificationItem  {...n} setOpen={setOpen} />
                                                                        {++key === notifications.length &&
                                                                            <div className="NotificationItem end-message">
                                                                                <h4>Уведомлений больше нет</h4>
                                                                                <img
                                                                                    src={DEFAULT_IMG.noNews}
                                                                                    alt="Уведомлений больше нет"
                                                                                    style={{ width: notifications.length > 2 ? '100px' : 'auto' }}
                                                                                />
                                                                            </div>}
                                                                    </React.Fragment>
                                                                })
                                                                : <div className="NotificationItem nothing-found">
                                                                    <h4>Здесь будут ваши уведомления</h4>
                                                                    <img src={DEFAULT_IMG.noNews} alt="Здесь будут ваши уведомления" />
                                                                </div>
                                                        }
                                                    </div>
                                                    <div className="Notifications__list-see-all">
                                                        <Link className="btn btn-primary" to={() => getNewsFeedLink()} onClick={() => setOpen(false)}>Посмотреть все</Link>
                                                    </div>
                                                </div>
                                            </>}
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        </CSSTransition>
                    </>
                }
            </div>
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(Notifications)));