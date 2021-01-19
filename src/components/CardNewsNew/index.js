import React, { forwardRef, useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Lightbox from "react-images";
import Card from "components/Card";
import Share from "components/Share";
import { ActiveUserMark, FederationChoiceMark } from "components/Marks";
import { formatText } from "utils";
import { formatDateTime } from "utils/datetime";
import { DEFAULT_IMG } from "appConfig";
import EditForm from "./EditForm";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf } from "@progress/kendo-svg-icons";
import { Request } from "utils/request";
import moment from "moment";
import ls from "local-storage";
import "./index.scss";

const CardNewsNew = forwardRef(({
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
    picture_link,
    picture_short_link,
    video_link,
    fact_city_name,
    canEdit,
    onDelete,
    handleSuccess,
    redirect_link,
    profile_id, // News item profile ID
    profileId, // User profile ID
    handleUnsubscribe,
    is_liked,
    like_count,
    user_type,
    is_request_article,
    member = false,
    isFederation,
}) => {
    const [canCollapse, setCanCollapse] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const ref = useRef(null);

    const userAlias = ls.get('user_info') ? ls.get('user_info').alias : '';


    useEffect(() => {
        if ((ref.current && ref.current.clientHeight > 100)) setCanCollapse(true);
    }, []);

    const ViewItem = () => {
        const [isOpenControls, setIsOpenControls] = useState(false);
        const [collapsed, setCollapsed] = useState(false);
        const [isLiked, setIsLiked] = useState(is_liked);
        const [likesCount, setLikesCount] = useState(like_count);

        const handleLikeClick = () => {
            if (isLiked) {
                Request({
                    url: `/api/article/remove_like_from_article/`,
                    method: 'PUT',
                    data: JSON.stringify({ article_id: id })
                },
                    () => {
                        setIsLiked(!isLiked);
                        setLikesCount(likesCount - 1);
                    }, e => console.log(e.response));
            } else {
                Request({
                    url: `/api/article/add_like_to_article/`,
                    method: 'POST',
                    data: JSON.stringify({ article_id: id })
                },
                    () => {
                        setIsLiked(!isLiked);
                        setLikesCount(likesCount + 1);
                    }, e => console.log(e.response));
            }
        }

        return <>
            <div className="CardNewsNew__content">
                <div className="CardNewsNew__head" style={{margin: '0 10px 0 10px'}}>
                    <div className="CardNewsNew__left">
                        <Link to={user_type === 4 ? `/kennel/${alias}` : user_type === 1 ? `/user/${alias}` : `/${alias}`}>
                            <div className="CardNewsNew__left-logo" style={{
                                background: `url(${logo_link ?
                                    logo_link :
                                    user_type === 1 ?
                                        DEFAULT_IMG.userAvatar :
                                        DEFAULT_IMG.clubAvatar
                                    }) center center/cover no-repeat`
                            }} />
                        </Link>
                        <span className="CardNewsNew__left-name">
                            <span>
                                {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                    <>
                                        {user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}
                                &nbsp;
                            </>
                                }
                                <Link to={user_type === 4 ? `/kennel/${alias}` : user_type === 1 ? `/user/${alias}` : `/${alias}`}>

                                    {user_type === 1 ? first_name + ' ' + last_name : name}
                                </Link>
                                {active_rkf_user &&
                                    <ActiveUserMark />
                                }
                                {active_member &&
                                    <FederationChoiceMark />
                                }
                            </span>
                            <div style={{ display: 'flex' }}>
                                {formatDateTime(create_date)}
                                {fact_city_name &&
                                    <span className="CardNewsNew__city" title={fact_city_name}>
                                        {fact_city_name}
                                    </span>
                                }
                            </div>
                        </span>
                    </div>
                    <div className="CardNewsNew__right" >
                        {alias === userAlias && canEdit &&
                            <div className="CardNewsNew__head-control">
                                <button
                                    className={`CardNewsNew__head-control-btn${isOpenControls ? ' _open' : ''}`}
                                    onClick={() => setIsOpenControls(!isOpenControls)}
                                />
                                {isOpenControls &&
                                    <OutsideClickHandler
                                        ref={ref}
                                        onOutsideClick={({ target }) => !target.classList.contains('_open') && setIsOpenControls(false)}>
                                        <CSSTransition
                                            in={isOpenControls}
                                            timeout={350}
                                            classNames="CardNewsNew__transition"
                                            unmountOnExit
                                        >
                                            <ul className="CardNewsNew__head-control-list">
                                                {!is_closed_advert &&
                                                    <li className="CardNewsNew__head-control-item" 
                                                        // onClick={() => setIsEditing(true)}
                                                    >
                                                        {/* <span>Редактировать</span> */}
                                                        {isFederation ? <Link to={`/news/${id}`} style={{textDecoration: 'none'}}>Подробнее...</Link> : <Link to={`${url}/edit`} style={{textDecoration: 'none'}}>Редактировать</Link>}
                                                    </li>
                                                }
                                                {is_advert && !is_closed_advert &&
                                                    <li className="CardNewsNew__head-control-item" onClick={() => onAdClose(id)}>
                                                        <span className="CardNewsNew__remove">Закрыть объявление</span>
                                                    </li>
                                                }
                                                <li className="CardNewsNew__head-control-item" onClick={() => onDelete(id)}>
                                                    <span className="CardNewsNew__remove">Удалить</span>
                                                </li>
                                            </ul>
                                        </CSSTransition>
                                    </OutsideClickHandler>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className={!collapsed ? 'CardNewsNew__text-wrap' : ''} style={{margin: '0 10px 0 10px'}}>
                    {is_advert && <div className="CardNewsNew__ad">
                        <p className="CardNewsNew__ad-breed">
                            <span>Порода: {advert_breed_name}</span>
                            <span>№{advert_code}</span>
                        </p>
                        <div className="CardNewsNew__ad-price">
                            <div>
                                <span>Стоимость: {advert_cost ? `${advert_cost} руб.` : '-'}</span>
                                <span>Кол-во щенков: {advert_number_of_puppies}</span>
                                {advert_type_name && <span>Категория: {advert_type_name}</span>}
                            </div>
                            {is_closed_advert && <div className="CardNewsNew__ad-inactive" >Объявление не активно</div>}
                        </div>
                    </div>}
                    <p className="CardNewsNew__text"
                        ref={ref}
                        dangerouslySetInnerHTML={{ __html: formatText(content) }}
                    />
                </div>
                <div className="CardNewsNew__show-all-wrap" style={{margin: '0 10px 0 10px'}}>
                    {
                        is_request_article
                            ? <div className="CardNewsNew__show-all"><Link to={redirect_link} target="_blank">Подробнее...</Link></div>
                            : <div className={`CardNewsNew__show-all${!canCollapse ? ' _disabled' : ''}`}
                                onClick={() => canCollapse && setCollapsed(!collapsed)}
                            >
                                {!collapsed ? 'Подробнее...' : 'Свернуть'}
                            </div>
                    }
                    {
                        is_request_article && <Share url={`https://rkf.online/news/${id}`} />
                    }
                </div>
                {(picture_link || video_link) &&
                    <div className="CardNewsNew__media">
                        {picture_link &&
                            <div className="CardNewsNew__photo"
                                style={{ backgroundImage: `url(${picture_link})` }}
                                onClick={() => setShowPhoto(true)}
                            />
                        }
                        {video_link &&
                            <div className="CardNewsNew__video">
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
            {
                documents && !!documents.length &&
                <div className="CardNewsNew__documents" style={{margin: '0 10px 0 10px'}}>
                    <ul className="CardNewsNew__documents-list">
                        {documents.map(d =>
                            <li className="DocumentItem" key={d.id}>
                                <Link
                                    to={`/docs/${d.id}`}
                                    target="_blank"
                                    style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}
                                    rel="noopener noreferrer"
                                >
                                    <SvgIcon icon={filePdf} size="default" />
                                    <div style={{display: 'flex', flexDirection: 'column'}}>{d.name}<span className="DocumentItem__date">
                                        {`Добавлено ${moment(d.create_date).format('D MMMM YYYY')} в ${moment(d.create_date).format('HH:mm')}`}
                                    </span>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            }
            {/* {videoLink && <p className={`CardNewsNew__video-count ${collapsed ? '_count_collapsed' : ''}`}>Прикрепленные видео: 1</p>} */}
            <div className="CardNewsNew__controls"  style={{margin: '0 10px 0 10px', borderTop: '1px solid #e5e5e5', paddingTop: '15px'}}>
                <div className="CardNewsNew__controls-left">
                    <div>
                        <span 
                            className={`k-icon ${isLiked ? ' k-i-heart colored-icon' : ' k-i-heart-outline'}`}
                            // onClick={handleLikeClick}
                        />
                        {/* <span>{likesCount}</span> */}
                        <span>0</span>
                    </div>
                    <div>
                        <span className="k-icon k-i-comment" />
                        <span>0</span>
                    </div>
                    <Share url={`https://rkf.online/news/${id}`} />
                </div>
                <div className="CardNewsNew__controls-right">
                    <div>
                        <span className="k-icon k-i-preview" />
                        <span>0</span>
                    </div>
                </div>
            </div>
        </>
    };

    const EditItem = () => <>
        <div className="CardNewsNew__content">
            <div className="CardNewsNew__head">
                <div className="CardNewsNew__left">
                    <Link to={user_type === 4 ? `/kennel/${alias}` : user_type === 1 ? `/user/${alias}` : `/${alias}`}>
                        <div className="CardNewsNew__left-logo" style={{
                            background: `url(${logo_link ?
                                logo_link :
                                user_type === 1 ?
                                    DEFAULT_IMG.userAvatar :
                                    DEFAULT_IMG.clubAvatar
                                }) center center/cover no-repeat`
                        }} />
                    </Link>
                    <span className="CardNewsNew__left-name">
                        <span>
                            <Link to={user_type === 4 ? `/kennel/${alias}` : user_type === 1 ? `/user/${alias}` : `/${alias}`}>
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
                        <div style={{ display: 'flex' }}>
                            {formatDateTime(create_date)}
                            {fact_city_name &&
                                <span className="CardNewsNew__city" title={fact_city_name}>
                                    {fact_city_name}
                                </span>
                            }
                        </div>
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'top' }}></div>
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
        <div className="CardNewsNew__controls">
            <div className="CardNewsNew__controls-center">
                <Share url={`https://rkf.online/news/${id}`} />
            </div>
        </div>
    </>;

    return (
        <Card className={`CardNewsNew${is_request_article ? ' is-request-article' : ''}`}>
            <div className={`CardNewsNew__wrap${is_closed_advert ? ' is_closed' : ''}`}>
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

export default React.memo(CardNewsNew);