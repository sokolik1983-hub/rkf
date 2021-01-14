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
import "./styles.scss";

const defaultCategories = [
    {
        id: 2,
        name: 'Новые',
        icon: '/static/new-icons/notifications/new.svg',
        count: 0
    },
    {
        id: 3,
        name: 'Обязательные к прочтению',
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
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link, setNotificationsLength }) => {
        const [loaded, setLoaded] = useState(false);
        const [open, setOpen] = useState(false);
        const [controlsOpen, setControlsOpen] = useState(false);
        const [notifications, setNotifications] = useState([]);
        const [showDot, setShowDot] = useState(null);
        const [currentCategory, setCurrentCategory] = useState(1);
        const [categories, setCategories] = useState(defaultCategories);

        const { notification } = useContext(NotificationsContext);
        const alias = ls.get('user_info') ? ls.get('user_info')?.alias : '';
        const user_type = ls.get('user_info')?.user_type;

        useEffect(() => {
            getNotifications(currentCategory);
        }, [currentCategory]);

        useEffect(() => {

            if (notification.value.length) {
                setShowDot(true);
                getNotifications(currentCategory);
            } else {
                setShowDot(notification.hasNewMessage);
            }

            if (loaded) {
                const updated = [...notifications];
                updated?.length > 11 && updated.pop();
                updated.unshift(JSON.parse(notification.value));
                setNotifications(updated);
            }
        }, [notification]);

        const getNotifications = async (type = 1) => {
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
                setNotificationsLength(notifications.length)
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

        const getNewsFeedLink = () => {
            const buildUrl = (id = '') => user_type === 1
                ? `/user/${alias}/news-feed/${id}`
                : user_type === 3
                    ? `/${alias}/news-feed/${id}`
                    : `/kennel/${alias}/news-feed/${id}`;
            if (currentCategory === 3) {
                return buildUrl(4);
            } else if (currentCategory === 4) {
                return buildUrl(6);
            } else {
                return buildUrl();
            }
        }

        const handleOutsideClick = (e) => {
            if (e?.target.className !== 'Notifications__icon') {
                setOpen(false);
                setControlsOpen(false);
            }
        }

        return (
            <div className="Notifications">
                {isAuthenticated
                    && <>
                        <LightTooltip title="Уведомления" enterDelay={200} leaveDelay={200}>
                            <div className="Notifications__icon-wrap">
                                <div className={`Notifications__icon ${open ? ` _active` : ``}`} onClick={handleNotificationsClick} />
                                {showDot && <div className="Notifications__icon-dot" />}
                            </div>
                        </LightTooltip>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="Notifications-transition"
                            unmountOnExit
                            onExited={() => { setNotifications([]); setCurrentCategory(1); }}
                        >
                            <div className="Notifications__content">
                                <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                    <div className="Notifications__controls">
                                        <h4 onClick={() => setControlsOpen(!controlsOpen)}>
                                            {
                                                currentCategory === 1
                                                    ? 'Уведомления'
                                                    : categories.find(c => c.id === currentCategory).name
                                            }
                                        </h4>
                                        <button
                                            onClick={() => setControlsOpen(!controlsOpen)}
                                            className={`Notifications__controls-arrow ${controlsOpen ? `_widget_open` : ``}`}
                                        />
                                    </div>
                                    <CSSTransition
                                        in={controlsOpen}
                                        timeout={350}
                                        classNames="Notifications-transition"
                                        unmountOnExit
                                    >
                                        <div className="Notifications__controls-inner">
                                            <NotificationCategories
                                                categories={categories}
                                                setCurrentCategory={setCurrentCategory}
                                                setControlsOpen={setControlsOpen}
                                            />
                                        </div>
                                    </CSSTransition>
                                    {!loaded
                                        ? <Loading centered={false} />
                                        : <>
                                            <div className="Notifications__list">
                                                <div className="Notifications__list-inner">
                                                    {
                                                        notifications.length
                                                            ? notifications.map((n, key) => {
                                                                return <NotificationItem key={key} {...n} />
                                                            })
                                                            : <div className="NotificationItem nothing-found" style={{ textAlign: 'center' }}>Ничего не найдено</div>
                                                    }
                                                </div>
                                                <div className="Notifications__list-see-all">
                                                    <Link to={() => getNewsFeedLink()} >Посмотреть все</Link>
                                                </div>
                                            </div>
                                        </>}
                                </OutsideClickHandler>
                            </div>
                        </CSSTransition>
                    </>
                }
            </div >
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(Notifications)));