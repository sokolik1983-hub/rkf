import React, {forwardRef, useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import {CSSTransition} from "react-transition-group";
import Modal from "../Modal";
import Share from "../Share";
import { formatText } from "../../utils";
import { formatDateTime } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";
import "./index.scss";


const ListItem = forwardRef(({
                                 user,
                                 id,
                                 name,
                                 alias,
                                 city,
                                 date,
                                 logo_link,
                                 photo,
                                 text,
                                 url,
                                 removable,
                                 onDelete,
                                 setNewsFilter,
                                 setPage,
                                 currentActiveType,
                                 citiesDict
}) => {
    const [canCollapse, setCanCollapse] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isOpenControls, setIsOpenControls] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && ref.current.clientHeight > 100) setCanCollapse(true);
    }, []);

    const handleCityChange = () => {
        const cityObj = {
            label: city,
            value: citiesDict.filter(c => c.label === city)[0].value
        }
        setNewsFilter({ city: cityObj, activeType: currentActiveType });
        setPage(1);
    };

    return (
        <div className="list-item__wrap">
            <div className="list-item__content">
                {photo && <div className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} onClick={() => setShowPhoto(true)} />}
                <div className="list-item__head">
                    <div className="list-item__club">
                        <Link to={user === 4 ? `/kennel/${alias}` : `/${alias}`}>
                            <div className="list-item__club-logo" style={{
                                background: `url(${logo_link
                                    ? logo_link
                                    : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                            }} />
                        </Link>
                        <span className="list-item__club-name">
                            <Link to={user === 4 ? `/kennel/${alias}` : `/${alias}`}>
                                {(user === 3 || user === 4 || user === 5) &&
                                    <>
                                        <span>{user === 3 ? 'Клуб' : user === 4 ? 'Питомник' : user === 5 ? 'Федерация' : ''}</span>
                                        &nbsp;
                                    </>
                                }
                                {name}
                            </Link>
                            <span>{formatDateTime(date)}</span>
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {city && <span className="list-item__city" title={city} onClick={handleCityChange}>
                            {city}
                        </span>}
                        {removable &&
                            <div className="list-item__head-control">
                                <button
                                    className={`list-item__head-control-btn${isOpenControls ? ' _open' : ''}`}
                                    onMouseEnter={() => setIsOpenControls(!isOpenControls)}
                                />
                                {isOpenControls &&
                                    <OutsideClickHandler ref={ref} onOutsideClick={() => setIsOpenControls(false)}>
                                        <CSSTransition
                                            in={isOpenControls}
                                            timeout={350}
                                            classNames="list-item__transition"
                                            unmountOnExit
                                        >
                                            <ul className="list-item__head-control-list">
                                                <li className="list-item__head-control-item">
                                                    <Link to={`${url}/edit`}>Редактировать</Link>
                                                </li>
                                                <li className="list-item__head-control-item">
                                                    <span className="list-item__remove" onClick={() => onDelete(id)}>Удалить</span>
                                                </li>
                                            </ul>
                                        </CSSTransition>
                                    </OutsideClickHandler>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className={!collapsed ? 'list-item__text-wrap' : ''}>
                    <p className="list-item__text"
                        ref={ref}
                        dangerouslySetInnerHTML={{ __html: formatText(text) }}
                    />
                </div>
            </div>
            <div className="list-item__controls">
                <span className={`list-item__show-all${!canCollapse ? ' _disabled' : ''}`}
                    onClick={() => canCollapse && setCollapsed(!collapsed)}
                >
                    {!collapsed ? 'Подробнее...' : 'Свернуть'}
                </span>
                <Share url={`https://rkf.online${url}`} />
            </div>
            {showPhoto &&
                <Modal showModal={showPhoto}
                    handleClose={() => setShowPhoto(false)}
                    noBackdrop={true}
                    hideCloseButton={true}
                    className="list-item__modal"
                >
                    <img src={photo} alt="" />
                </Modal>
            }
        </div>
    )
});

export default React.memo(ListItem);