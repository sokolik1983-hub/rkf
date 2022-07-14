import React, { memo, forwardRef, useEffect, useRef, useState } from "react";
/* закомментированно по задаче #5399
import OutsideClickHandler from "react-outside-click-handler";
import { CSSTransition } from "react-transition-group";
*/
import { Link } from "react-router-dom";
import Lightbox from "react-images";
import { Chip } from "@progress/kendo-react-buttons";
import EditForm from "./EditForm";
import { DEFAULT_IMG } from "../../../../appConfig";
import Card from "../../../../components/Card";
import Share from "../../../../components/Share";
import CardFooter from "../../../../components/CardFooter";
import DocumentLink from "../../../../components/DocumentLink";
import { ActiveUserMark, FederationChoiceMark } from "../../../../components/Marks";
import { formatText } from "../../../../utils";
import { Request } from "../../../../utils/request";
import { formatDateTime } from "../../../../utils/datetime";
import { linkForUserType } from "../../../../utils/linkForUserType";

import "./index.scss";

const NewsFeedItem = forwardRef(({
    id,
    name,
    alias,
    city,
    create_date,
    logo_link,
    content,
    url,
    removable,
    onAdClose,
    citiesDict,
    videoLink,
    documents,
    changeCityFilter,
    userAlias,
    is_advert,
    advert_breed_id,
    advert_breed_name,
    advert_code,
    advert_cost,
    advert_number_of_puppies,
    advert_type_name,
    is_closed_advert,
    history,
    first_name,
    last_name,
    active_member,
    active_rkf_user,
    picture_short_link,
    video_link,
    fact_city_name,
    canEdit,
    deleteNewsItem,
    handleSuccess,
    redirect_link,
    profile_id, // News item profile ID
    profileId, // User profile ID
    handleUnsubscribe,
    handleHaveRead,
    is_liked,
    like_count,
    user_type,
    is_request_article,
    member = false,
    must_read,
    is_read,
    checkedAll,
    handleCheckedItemsIds,
    unsetCheckedAll,
    isControlCheckedAll,
    clearChecks,
    photos
}, NewsFeedItemRef) => {
    const [canCollapse, setCanCollapse] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const [isChecked, setIsChecked] = useState(checkedAll);
    const {picture_link} = photos?.length && photos[0];

    const ref = useRef(null);
    const userLink = linkForUserType(user_type, alias);

    useEffect(() => {
        if ((ref.current && ref.current.clientHeight > 100) || videoLink) setCanCollapse(true);
    }, []);

    useEffect(() => {
        checkedAll && isControlCheckedAll && setIsChecked(true);
        isControlCheckedAll && setIsChecked(true);
        !isControlCheckedAll && !checkedAll && setIsChecked(false);
        clearChecks && setIsChecked(false);
    }, [checkedAll, isControlCheckedAll, clearChecks]);

    useEffect(() => {
        checkedAll && handleCheck();
    }, [checkedAll]);

    const handleCheck = () => {
        if (!isChecked) {
            setIsChecked(true);
            handleCheckedItemsIds(id, 'add');

        } else {
            setIsChecked(false);
            handleCheckedItemsIds(id, 'remove');
            unsetCheckedAll();
        }
    };

    const handleItemClick = async () => {
        await Request({
            url: ` /api/article/mark_articles_read?articleIds=${id}`,
            method: 'POST'
        }, error => {
            console.log(error);
        });
    };

    const ViewItem = () => {
        // const [isOpenControls, setIsOpenControls] = useState(false);  закомментированно по задаче #5399
        const [collapsed, setCollapsed] = useState(false);

        return (
            <>
                <div className="news-feed-item__content">
                    <div className="news-feed-item__head">
                        <div className="news-feed-item__left">
                            <Link to={userLink}>
                                <div
                                    className="news-feed-item__left-logo"
                                    style={{background: `url(${logo_link ?
                                        logo_link :
                                        user_type === 1 ?
                                            DEFAULT_IMG.userAvatar :
                                            DEFAULT_IMG.clubAvatar
                                    }) center center/cover no-repeat`}}
                                />
                            </Link>
                            <span className="news-feed-item__left-name">
                                {is_request_article ?
                                    <div>
                                        <Link to={userLink}>
                                            {user_type === 1 ? first_name + ' ' + last_name : name}
                                        </Link>
                                        <span>{formatDateTime(create_date)}</span>
                                        <p className={`news-feed-item__left-name_text${!is_read && " --bold" }`}>{formatText(content)}</p>
                                    </div> :
                                    <>
                                        <span>
                                            {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                                <>
                                                    {user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}
                                                    &nbsp;
                                                </>
                                            }
                                            <Link to={userLink}>
                                                {user_type === 1 && (first_name && last_name) ? first_name + ' ' + last_name : name}
                                            </Link>
                                            {active_rkf_user &&
                                                <ActiveUserMark />
                                            }
                                            {active_member &&
                                                <FederationChoiceMark />
                                            }
                                        </span>
                                        <div className="news-feed-item__date-city">
                                            {formatDateTime(create_date)}
                                            {fact_city_name &&
                                                <span className="news-feed-item__city" title={fact_city_name}>
                                                    {fact_city_name}
                                                </span>
                                            }
                                        </div>
                                    </>
                                }
                            </span>
                        </div>
                        <div className="news-feed-item__right" >
                            {!member &&
                                <Chip
                                    text="Подписка"
                                    value="chip"
                                    selected={true}
                                    onClick={() => handleUnsubscribe(profile_id)}
                                />
                            }
                            {/* закоментированно до показа заказчику */}
                            {/*{must_read &&
                                <Chip
                                    text={is_read ? `Прочитано` : `Отметить как прочитанное`}
                                    value="chip"
                                    selected={is_read}
                                    onClick={() => handleHaveRead(id)}
                                    disabled={is_read}
                                    className={'must-read__chip'}
                                />
                            }*/}

                            {/* закомментированно по задаче #5399 */}
                            {/*{canEdit && profileId === profile_id && alias === userAlias &&
                                <div className="news-feed-item__head-control">
                                    <button
                                        className={`news-feed-item__head-control-btn${isOpenControls ? ' _open' : ''}`}
                                        onClick={() => setIsOpenControls(!isOpenControls)}
                                    />
                                    {isOpenControls &&
                                        <OutsideClickHandler
                                            ref={ref}
                                            onOutsideClick={({ target }) => !target.classList.contains('_open') && setIsOpenControls(false)}
                                        >
                                            <CSSTransition
                                                in={isOpenControls}
                                                timeout={350}
                                                classNames="news-feed-item__transition"
                                                unmountOnExit
                                            >
                                                <ul className="news-feed-item__head-control-list">
                                                    {!is_closed_advert &&
                                                        <li className="news-feed-item__head-control-item" onClick={() => setIsEditing(true)}>
                                                            <span>Редактировать</span>
                                                        </li>
                                                    }
                                                    {is_advert && !is_closed_advert &&
                                                        <li className="news-feed-item__head-control-item" onClick={() => onAdClose(id)}>
                                                            <span className="news-feed-item__remove">Закрыть объявление</span>
                                                        </li>
                                                    }
                                                    <li className="news-feed-item__head-control-item" onClick={() => deleteNewsItem(id)}>
                                                        <span className="news-feed-item__remove">Удалить</span>
                                                    </li>
                                                </ul>
                                            </CSSTransition>
                                        </OutsideClickHandler>
                                    }
                                </div>
                            }*/}
                            <div className="news-feed-item__control-checkbox">
                                <label className="news-feed-item__control-checkbox-label">
                                    <input
                                        type="checkbox"
                                        onChange={handleCheck}
                                        checked={isChecked}
                                    />
                                    <span> </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={!collapsed && 'news-feed-item__text-wrap'}>
                        {is_advert &&
                            <div className="news-feed-item__ad">
                                <p className="news-feed-item__ad-breed">
                                    <span>Порода: {advert_breed_name}</span>
                                    <span>№{advert_code}</span>
                                </p>
                                <div className="news-feed-item__ad-price">
                                    <div>
                                        <span>Стоимость: {advert_cost ? `${advert_cost} руб.` : '-'}</span>
                                        <span>Кол-во щенков: {advert_number_of_puppies}</span>
                                        {advert_type_name && <span>Категория: {advert_type_name}</span>}
                                    </div>
                                    {is_closed_advert && <div className="news-feed-item__ad-inactive" >Объявление не активно</div>}
                                </div>
                            </div>
                        }
                        {!is_request_article &&
                            <p
                                className={`news-feed-item__text${!canCollapse ? ' _disabled' : ''}`}
                                ref={ref}
                                dangerouslySetInnerHTML={{ __html: formatText(content) }}
                            />
                        }
                        {videoLink &&
                            <iframe
                                className={`news-feed-item__video${!collapsed ? ' _disabled' : ''}`}
                                src={videoLink}
                                title={id}
                                frameBorder="0"
                                allowFullScreen
                            />
                        }
                    </div>
                    <div className="news-feed-item__show-all-wrap">
                        {is_request_article ?
                            <div className="news-feed-item__show-all" onClick={handleItemClick}>
                                <Link to={redirect_link} target="_blank">Подробнее...</Link>
                            </div> :
                            <div
                                className={`news-feed-item__show-all${!canCollapse ? ' _disabled' : ''}`}
                                onClick={() => canCollapse && setCollapsed(!collapsed)}
                            >
                                {!collapsed ? 'Подробнее...' : 'Свернуть'}
                            </div>
                        }
                        {is_request_article &&
                            <Share
                                url={window.location.host === "rkf.online" ?
                                `https://rkf.online/news/${id}`
                                :
                                `https://stage.uep24.ru/news/${id}`}
                            />
                        }
                    </div>
                    {(picture_link || video_link) &&
                        <div className="news-feed-item__media">
                            {photos?.length &&
                                photos.map(photo =>
                                    <div className="news-feed-item__photo"
                                         style={{ backgroundImage: `url(${photo.picture_link})` }}
                                         onClick={() => setShowPhoto(true)}
                                    />
                                )
                            }
                            {video_link &&
                                <div className="news-feed-item__video">
                                    <iframe
                                        className="news__video"
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
                    <div className="news-feed-item__documents">
                        <ul className="news-feed-item__documents-list">
                            {documents.map(doc =>
                                <li className="DocumentItem" key={doc.id}>
                                    <DocumentLink
                                        docId={doc.id}
                                        document={doc}
                                        endpoint="/api/document/publicdocument"
                                        NewsFeedItem
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                }
                {/* {videoLink && <p className={`news-feed-item__video-count ${collapsed ? '_count_collapsed' : ''}`}>Прикрепленные видео: 1</p>} */}
                <div className="news-feed-item__controls">
                    <CardFooter
                        id={ id }
                        share_link={window.location.host === 'rkf.online' ? `https://rkf.online/news/${id}` : `https://stage.uep24.ru/news/${id}`}
                        is_liked={is_liked}
                        like_count={like_count}
                        likesOn={true}
                        type="news"
                    />
                </div>
            </>
        )
    };

    const EditItem = () => <>
        <div className="news-feed-item__content">
            <div className="news-feed-item__head">
                <div className="news-feed-item__left">
                    <Link to={userLink}>
                        <div className="news-feed-item__left-logo" style={{
                            background: `url(${logo_link ?
                                logo_link :
                                user_type === 1 ?
                                    DEFAULT_IMG.userAvatar :
                                    DEFAULT_IMG.clubAvatar
                                }) center center/cover no-repeat`
                        }} />
                    </Link>
                    <span className="news-feed-item__left-name">
                        <span>
                            <Link to={userLink}>
                                {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                    <>
                                        <span>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>
                                &nbsp;
                            </>
                                }
                                {user_type === 1 ? first_name + ' ' + last_name : name}
                            </Link>
                            {active_rkf_user &&
                                <ActiveUserMark />
                            }
                            {active_member &&
                                <FederationChoiceMark />
                            }
                        </span>
                        <div className="_flex">
                            {formatDateTime(create_date)}
                            {fact_city_name &&
                                <span className="news-feed-item__city" title={fact_city_name}>
                                    {fact_city_name}
                                </span>
                            }
                        </div>
                    </span>
                </div>
                <div className="_flex _flex-align-top" />
            </div>
            <div>
                <EditForm id={id}
                    text={content}
                    img={picture_link || ''}
                    videoLink={video_link || ''}
                    documents={documents}
                    isAd={is_advert}
                    adBreedId={advert_breed_id}
                    adCode={advert_code}
                    adCost={advert_cost}
                    adNumberOfPuppies={advert_number_of_puppies}
                    history={history}
                    handleSuccess={handleSuccess}
                />
            </div>
        </div>
        <div className="news-feed-item__controls">
            <div className="news-feed-item__controls-center">
                <Share url={`https://rkf.online/news/${id}`} />
            </div>
        </div>
    </>;

    return (
        <Card className={`news-feed-item${is_request_article ? ' is-request-article' : ''}`}>
            <div className={`news-feed-item__wrap${is_closed_advert ? ' is_closed' : is_read  ? ' is_read' : '' }`}>
                {isEditing ? <EditItem /> : <ViewItem />}
                {showPhoto &&
                    <Lightbox
                        images={[{ src: picture_link }]}
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

export default memo(NewsFeedItem);