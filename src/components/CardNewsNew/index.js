import React, {memo, useEffect, useRef, useState} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import Card from "../Card";
import {ActiveUserMark, FederationChoiceMark} from "../Marks";
import {formatText} from "../../utils";
import {formatDateTime} from "../../utils/datetime";
import CardFooter from "../CardFooter";
import DocumentLink from "../DocumentLink";
import {endpointGetLinkNewsFeed} from "./config";
import useIsMobile from "../../utils/useIsMobile";
import Avatar from "../Layouts/Avatar";
import {linkForUserType} from "../../utils/linkForUserType";
import {nameForUserType} from "../../utils/nameForUserType";
import CardGallery from "../CardGallery";
import {Gallery} from "../Gallery";
import {connectAuthUserInfo} from "../../pages/Login/connectors";
import "./index.scss";


const CardNewsNew = ({
    id,
    name,
    alias,
    create_date,
    logo_link,
    content,
    url,
    onAdClose,
    documents,
    changeCityFilter,
    is_advert,
    advert_breed_name,
    advert_code,
    advert_cost,
    advert_number_of_puppies,
    advert_type_name,
    advert_type_id,
    is_closed_advert,
    first_name,
    last_name,
    active_member,
    dog_color,
    dog_age,
    dog_sex_type_id,
    dog_city,
    dog_name,
    active_rkf_user,
    pictures,
    video_link,
    fact_city_name,
    fact_city_id,
    canEdit,
    onDelete,
    is_liked,
    like_count,
    user_type,
    isFederation,
    is_halfbreed,
    is_all_cities,
    user_info
}) => {
    const [canCollapse, setCanCollapse] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isOpenControls, setIsOpenControls] = useState(false);
    const [showPublication, setShowPublication] = useState(false);
    const {alias: userAlias = ''} = user_info || {};
    const isMobile = useIsMobile(1080);
    const ref = useRef(null);

    useEffect(() => {
        if ((!isMobile && ref?.current?.clientHeight > 100) || (isMobile && ref?.current?.clientHeight > 200)) {
            setCanCollapse(true);
        }
    }, []);

    const squareStyle = () =>{
        return {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            cursor: 'pointer'
        }
    };

    const imagesArray = pictures?.filter(picture => !!picture && !!Object.keys(picture).length).map(picture => ({
        src: picture.picture_link,
        thumbnail: (pictures.length > 4 && picture.picture_short_link) ? picture.picture_short_link : picture.picture_link,
        thumbnailWidth: 320,
        thumbnailHeight: 174,
    }));

    return (
        <Card className="card-news-new">
            <div className={`card-news-new__wrap${is_closed_advert ? ' is_closed' : ''}`}>
                <div className="card-news-new__content">
                    <div className="card-news-new__head">
                        <div className="card-news-new__left">
                            <Link to={linkForUserType(user_type, alias)}>
                                <Avatar
                                    card="cardnewsnew"
                                    data="cardnewsnew"
                                    logo={logo_link}
                                    canEdit={canEdit}
                                    name={user_type === 1 ? `${first_name} ${last_name}` : name}
                                    userType={user_type}
                                />
                            </Link>
                            <span className="card-news-new__left-name">
                                <span className="card-news-new__left-city">
                                    <div className="card-news-new__left-inner">
                                        <div className="card-news-new__add-wrap">
                                            {(user_type === 3 || user_type === 4 || user_type === 5 || user_type === 7) &&
                                                <span>
                                                    {nameForUserType(user_type)}
                                                    &nbsp;
                                                </span>
                                            }
                                            <Link to={linkForUserType(user_type, alias)}>
                                                {user_type === 1 ? first_name + ' ' + last_name : name}
                                            </Link>
                                            <span className="card-news-new__left-mark">
                                                <span>
                                                    {active_rkf_user &&
                                                        <ActiveUserMark />
                                                    }
                                                </span>
                                                <span>
                                                    {active_member &&
                                                        <FederationChoiceMark />
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                        {fact_city_name &&
                                            <span
                                                className="card-news-new__city"
                                                title={fact_city_name}
                                                onClick={() => changeCityFilter([fact_city_id])}
                                            >
                                              {fact_city_name}
                                            </span>
                                        }
                                    </div>
                                </span>
                                <div className="card-news-new__left__city-inner">
                                    {formatDateTime(create_date)}
                                </div>
                            </span>
                        </div>
                        <div className="card-news-new__right" >
                            {alias === userAlias && canEdit &&
                                <div className="card-news-new__head-control">
                                    <button
                                        className={`card-news-new__head-control-btn${isOpenControls ? ' _open' : ''}`}
                                        onClick={() => setIsOpenControls(!isOpenControls)}
                                    />
                                    {isOpenControls &&
                                        <OutsideClickHandler
                                            ref={ref}
                                            onOutsideClick={({ target }) => {
                                                if(!target.classList.contains('_open')) {
                                                    setIsOpenControls(false);
                                                }
                                            }}
                                        >
                                            <CSSTransition
                                                classNames="card-news-new__transition"
                                                in={isOpenControls}
                                                timeout={350}
                                                unmountOnExit
                                            >
                                                <ul className="card-news-new__head-control-list">
                                                    {!is_closed_advert &&
                                                        <li className="card-news-new__head-control-item">
                                                            {isFederation ?
                                                                <Link to={`/news/${id}`}>Подробнее...</Link> :
                                                                <Link to={`${url}/edit`}>Редактировать</Link>
                                                            }
                                                        </li>
                                                    }
                                                    {is_advert && !is_closed_advert &&
                                                        <li className="card-news-new__head-control-item" onClick={() => onAdClose(id)}>
                                                            <span className="card-news-new__remove">Закрыть объявление</span>
                                                        </li>
                                                    }
                                                    <li className="card-news-new__head-control-item" onClick={() => onDelete(id)}>
                                                        <span className="card-news-new__remove">Удалить</span>
                                                    </li>
                                                </ul>
                                            </CSSTransition>
                                        </OutsideClickHandler>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className={(!collapsed && advert_type_id < 1)  ? 'card-news-new__text-wrap' : 'card-news-new__text-wrap__collapsed'}>
                        {is_advert &&
                            <div className="card-news-new__ad">
                                {advert_type_name &&
                                    <div className="card-news-new__category-wrap">
                                        <div>
                                            <span className="card-news-new__category-name">Категория: </span>
                                            <p className = "card-news-new__category-value">{advert_type_name}</p>
                                        </div>
                                        <span>№{advert_code}</span>
                                    </div>
                                }
                                <p className="card-news-new__ad-breed">
                                    <span>Порода: </span>
                                    <span>{!is_halfbreed ? advert_breed_name : 'Метис'}</span>
                                </p>
                                {dog_color &&
                                    <p className="card-news-new__ad-color">
                                        <span>Окрас: </span>
                                        <span>{dog_color}</span>
                                    </p>
                                }
                                {dog_name &&
                                    <p className="card-news-new__ad-name">
                                        <span>Кличка собаки: </span>
                                        <span>{dog_name}</span>
                                    </p>
                                }
                                <p className="card-news-new__ad-city">
                                    <span>
                                        {`Место${advert_type_id === 4 ? ' потери' : advert_type_id === 5 ? ' нахождения' : ''}: `}
                                    </span>
                                    <span>
                                        {!is_all_cities && dog_city && (advert_type_id > 1) ?
                                            dog_city.map((item, i) => dog_city.length === i + 1 ? item.name : `${item.name}, `) :
                                            'Все города'
                                        }
                                    </span>
                                </p>
                                {dog_age &&
                                    <p className="card-news-new__ad-age">
                                        <span>Возраст{(advert_type_id === 5) && ' (примерный)'}: </span>
                                        <span>{dog_age}</span>
                                    </p>
                                }
                                {dog_sex_type_id &&
                                    <p className="card-news-new__ad-sex">
                                        <span>Пол: </span>
                                        <span>{dog_sex_type_id === 1 ? 'Кобель' : 'Сука'}</span>
                                    </p>
                                }
                                {advert_type_id < 4 &&
                                    <div className="card-news-new__ad-price">
                                        <p>
                                            <span>Стоимость: </span>
                                            <span>{advert_cost ? `${advert_cost} руб.` : '-'}</span>
                                        </p>
                                        <p>
                                            <span>Кол-во щенков: </span>
                                            <span>{advert_number_of_puppies}</span>
                                        </p>
                                        {is_closed_advert &&
                                            <div className="card-news-new__ad-inactive">Объявление не активно</div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {!!content &&
                            <p className={`card-news-new__text${!canCollapse ? ' _disabled' : ''}`}
                               ref={ref}
                               dangerouslySetInnerHTML={{ __html: formatText(content) }}
                            />
                        }
                    </div>
                    <div className="card-news-new__show-all-wrap">
                        <div
                            className={`card-news-new__show-all${
                                (!pictures?.length || pictures?.length <= 1) &&
                                !canCollapse ? ' _disabled' : ''
                            }`}
                            onClick={() => {
                                if(pictures?.length > 1) setShowPublication(!showPublication);
                                if(canCollapse) setCollapsed(!collapsed);
                            }}
                        >
                            {!showPublication && !collapsed ? 'Подробнее...' : 'Свернуть'}
                        </div>
                    </div>
                    {(pictures || video_link) &&
                        <div className="card-news-new__media">
                            {!!pictures?.length &&
                                (!showPublication ?
                                    (isMobile ? <CardGallery
                                        images={imagesArray}
                                    /> :
                                        <div className={`card-news-new__media-wrap _${pictures.length}`}>
                                            <Gallery
                                                items={imagesArray}
                                                enableImageSelection={false}
                                                imageCountSeparator="&nbsp;из&nbsp;"
                                                tileViewportStyle={squareStyle}
                                                thumbnailStyle={squareStyle}
                                                backdropClosesModal={true}
                                            />
                                        </div>)
                                    :
                                    <div className="card-news-new__photo-wrap __all">
                                        {pictures.map((picture, index) =>
                                            <img className="card-news-new__photo" src={picture.picture_link} alt="" key={index}/>
                                        )}
                                    </div>
                                )
                            }
                            {video_link &&
                                <div className="card-news-new__video">
                                    <iframe
                                        src={video_link}
                                        title="YouTube Video"
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                </div>
                            }
                        </div>
                    }
                </div>
                {documents && !!documents.length &&
                    <div className="card-news-new__documents">
                        <ul className="card-news-new__documents-list">
                            {documents.map((doc, i) =>
                                <li className="document-item" key={i}>
                                    <DocumentLink
                                        docId={doc.id}
                                        document={doc}
                                        endpoint={endpointGetLinkNewsFeed}
                                        CardNewsNew
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                }
                <div className="card-news-new__controls">
                    <CardFooter
                        id={id}
                        share_link={window.location.host === 'rkf.online' ?
                            `https://rkf.online/news/${id}` :
                            `https://stage.uep24.ru/news/${id}`
                        }
                        is_liked={is_liked}
                        like_count={like_count}
                        likesOn={true}
                        type="news"
                    />
                </div>
            </div>
        </Card>
    )
};

export default memo(connectAuthUserInfo(CardNewsNew));