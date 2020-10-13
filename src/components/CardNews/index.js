import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { CSSTransition } from "react-transition-group";
import Lightbox from "react-images";
import Card from "../Card";
import Share from "../Share";
import { formatText } from "../../utils";
import { formatDateTime } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";
import "./index.scss";


const CardNews = forwardRef(({
    user,
    id,
    name,
    alias,
    city,
    date,
    logo_link,
    small_photo,
    photo,
    text,
    url,
    removable,
    onAdClose,
    onDelete,
    citiesDict,
    isAd,
    adBreedName,
    adCode,
    adPrice,
    adAmount,
    adCategory,
    isClosedAd,
    videoLink,
    documents,
    changeCityFilter
}) => {
    const [canCollapse, setCanCollapse] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isOpenControls, setIsOpenControls] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if ((ref.current && ref.current.clientHeight > 100) || videoLink) setCanCollapse(true);
    }, []);

    const handleCityChange = () => changeCityFilter ?
        changeCityFilter({
            label: city,
            value: citiesDict.filter(c => c.label === city)[0].value
        }) : null;

    return (
        <Card className="card-news">
            <div className={`card-news__wrap${isClosedAd ? ' is_closed' : ''}`}>
                <div className="card-news__content">
                    {small_photo && <div className="card-news__photo" style={{ backgroundImage: `url(${small_photo})` }} onClick={() => setShowPhoto(true)} />}
                    <div className="card-news__head">
                        <div className="card-news__club">
                            <Link to={user === 4 ? `/kennel/${alias}` : user === 1 ? `/user/${alias}` : `/${alias}`}>
                                <div className="card-news__club-logo" style={{
                                    background: `url(${logo_link ?
                                        logo_link :
                                        user === 1 ?
                                            DEFAULT_IMG.userAvatar :
                                            DEFAULT_IMG.clubAvatar
                                    }) center center/cover no-repeat`
                                }} />
                            </Link>
                            <span className="card-news__club-name">
                                <Link to={user === 4 ? `/kennel/${alias}` : user === 1 ? `/user/${alias}` : `/${alias}`}>
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
                        <div style={{ display: 'flex', alignItems: 'top' }}>
                            {city &&
                                <span className="card-news__city" title={city} onClick={handleCityChange}>
                                    {city}
                                </span>
                            }
                            {removable &&
                                <div className="card-news__head-control">
                                    <button
                                        className={`card-news__head-control-btn${isOpenControls ? ' _open' : ''}`}
                                        onClick={() => setIsOpenControls(!isOpenControls)}
                                    />
                                    {isOpenControls &&
                                        <OutsideClickHandler
                                            ref={ref}
                                            onOutsideClick={({ target }) => !target.classList.contains('_open') && setIsOpenControls(false)}>
                                            <CSSTransition
                                                in={isOpenControls}
                                                timeout={350}
                                                classNames="card-news__transition"
                                                unmountOnExit
                                            >
                                                <ul className="card-news__head-control-list">
                                                    {!isClosedAd &&
                                                        <li className="card-news__head-control-item">
                                                            <Link to={`${url}/edit`}>Редактировать</Link>
                                                        </li>
                                                    }
                                                    {isAd && !isClosedAd &&
                                                        <li className="card-news__head-control-item">
                                                            <span className="card-news__remove" onClick={() => onAdClose(id, setIsOpenControls)}>Закрыть объявление</span>
                                                        </li>
                                                    }
                                                    <li className="card-news__head-control-item">
                                                        <span className="card-news__remove" onClick={() => onDelete(id)}>Удалить</span>
                                                    </li>
                                                </ul>
                                            </CSSTransition>
                                        </OutsideClickHandler>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className={!collapsed ? 'card-news__text-wrap' : ''}>
                        {isAd && <div className="card-news__ad">
                            <p className="card-news__ad-breed">
                                <span>Порода: {adBreedName}</span>
                                <span>№{adCode}</span>
                            </p>
                            <div className="card-news__ad-price">
                                <div>
                                    <span>Стоимость: {adPrice ? `${adPrice} руб.` : '-'}</span>
                                    <span>Кол-во щенков: {adAmount}</span>
                                    {adCategory && <span>Категория: {adCategory}</span>}
                                </div>
                                {isClosedAd && <div className="card-news__ad-inactive" >Объявление не активно</div>}
                            </div>
                        </div>}
                        <p className="card-news__text"
                            ref={ref}
                            dangerouslySetInnerHTML={{ __html: formatText(text) }}
                        />
                        {videoLink &&
                            <iframe
                                className={`card-news__video${!collapsed ? ' _disabled' : ''}`}
                                src={videoLink}
                                title={id}
                                frameBorder="0"
                                allowFullScreen
                            />
                        }
                    </div>
                </div>
                {videoLink && <p className={`card-news__video-count ${collapsed ? '_count_collapsed' : ''}`}>Прикрепленные видео: 1</p>}
                <div className="card-news__controls">
                    <span className={`card-news__show-all${!canCollapse ? ' _disabled' : ''}`}
                        onClick={() => canCollapse && setCollapsed(!collapsed)}
                    >
                        {!collapsed ? 'Подробнее...' : 'Свернуть'}
                    </span>
                    <Share url={`https://rkf.online${url}`} />
                </div>
                {showPhoto &&
                    <Lightbox
                        images={[{ src: photo }]}
                        isOpen={showPhoto}
                        onClose={() => setShowPhoto(false)}
                        backdropClosesModal={true}
                        showImageCount={false}
                    />
                }
            </div>
        </Card>
    )
});

export default React.memo(CardNews);