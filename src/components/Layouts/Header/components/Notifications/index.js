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
import NotificationsContext from 'app/context';
import Loading from "components/Loading";
import "./styles.scss";

const defaultCategories = [
    {
        id: 2,
        name: 'Новые',
        icon: '/static/new-icons/notifications/new.svg',
        count: 5
    },
    {
        id: 3,
        name: 'Обязательные к прочтению',
        icon: '/static/new-icons/notifications/required.svg',
        count: 15
    },
    {
        id: 4,
        name: 'Заявки',
        icon: '/static/new-icons/notifications/applications.svg',
        count: 2
    },
];

const Notifications = forwardRef(
    ({ isAuthenticated, is_active_profile, logOutUser, logo_link }, ref) => {
        const [loaded, setLoaded] = useState(false);
        const [open, setOpen] = useState(false);
        const [controlsOpen, setControlsOpen] = useState(false);
        const [notifications, setNotifications] = useState([]);
        const [showDot, setShowDot] = useState(null);
        const [currentCategory, setCurrentCategory] = useState(1);
        const [categories, setCategories] = useState(defaultCategories);

        const pushedNotification = useContext(NotificationsContext);

        useEffect(() => {
            open && getNotifications(currentCategory);
        }, [currentCategory]);

        useEffect(() => {
            if (loaded) {
                const updated = [...notifications];
                updated?.length > 11 && updated.pop();
                updated.unshift(JSON.parse(pushedNotification.value));
                setNotifications(updated);
            } else {
                pushedNotification.value.length && setShowDot(true);
            }
            setShowDot(pushedNotification.hasNewMessage);
        }, [pushedNotification]);

        const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
        const user_type = ls.get('user_info').user_type;

        const getNotifications = async (type = 1) => {
            setLoaded(false);
            await Request({
                url: `/api/article/notifications?StartElement=1&Type=${type}`
            }, ({ notifications }) => {
                setNotifications(notifications);
                setLoaded(true);
            }, error => {
                console.log(error)
                setLoaded(true);
            });
        }

        const handleNotificationsClick = () => {
            !open && !notifications.length && getNotifications();
            setOpen(!open);
        }

        const getNewsFeedLink = () => {
            const buildUrl = id => user_type === 1
                ? `/user/${alias}/news-feed/${id}`
                : user_type === 3
                    ? `/${alias}/news-feed/${id}`
                    : `/nursery/${alias}/news-feed/${id}`;
            if (currentCategory === 3) {
                return buildUrl(4)
            } else if (currentCategory === 4) {
                return buildUrl(6)
            } else {
                return `/user/${alias}/news-feed/`
            }
        }

        return (
            <div className="Notifications">
                {isAuthenticated
                    && <>
                        <LightTooltip title="Уведомления" enterDelay={200} leaveDelay={200}>
                            <div className="Notifications__icon-wrap">
                                <div className="Notifications__icon" onClick={handleNotificationsClick} />
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
                                <OutsideClickHandler ref={ref} onOutsideClick={() => setControlsOpen(false)}>
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
                                </OutsideClickHandler>
                                {!loaded
                                    ? <Loading centered={false} />
                                    : <>
                                        <div className="Notifications__list">
                                            {
                                                notifications.length
                                                    ? notifications.map((n, key) => {
                                                        return <NotificationItem key={key} {...n} />
                                                    })
                                                    : <div className="NotificationItem nothing-found" style={{ textAlign: 'center' }}>Ничего не найдено</div>
                                            }
                                            <div className="Notifications__list-see-all">
                                                <Link to={() => getNewsFeedLink()} >Посмотреть все</Link>
                                            </div>
                                        </div>
                                    </>}
                            </div>
                        </CSSTransition>
                    </>
                }
            </div >
        )
    }
);

export default connectWidgetLogin(connectLogin(React.memo(Notifications)));