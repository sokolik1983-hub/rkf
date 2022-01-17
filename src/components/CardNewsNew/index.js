import React, { forwardRef, useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Lightbox from 'react-images';
import ls from 'local-storage';
import Modal from '../Modal';
import Card from 'components/Card';
import { ActiveUserMark, FederationChoiceMark } from 'components/Marks';
import { formatText } from 'utils';
import { formatDateTime } from 'utils/datetime';
import { DEFAULT_IMG } from 'appConfig';
import EditForm from './EditForm';
import CardFooter from '../CardFooter';
import DocumentLink from './DocumentLink';
import './index.scss';

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
    advert_type_id,
    is_closed_advert,
    history,
    first_name,
    last_name,
    active_member,
    dog_color,
    dog_age,
    dog_sex_type_id,
    dog_city,
    dog_name,
    active_rkf_user,
    picture_link,
    picture_short_link,
    video_link,
    fact_city_name,
    fact_city_id,
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
    member = false,
    isFederation,
    is_halfbreed,
    is_all_cities
}, CardNewsNewRef) => {
    const [canCollapse, setCanCollapse] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const ref = useRef(null);
    const [cityLabel, setCityLabel] = useState('');
    const userAlias = ls.get('user_info') ? ls.get('user_info').alias : '';

    useEffect(() => {
        if ((ref.current && ref.current.clientHeight > 140)) setCanCollapse(true);
    }, []);

    useEffect(() => {
        if(advert_type_id === 4) {
            setCityLabel('потери');
        } else if(advert_type_id === 5) {
            setCityLabel('нахождения');
        }
    }, [advert_type_id]);

    const ViewItem = () => {
        const [isOpenControls, setIsOpenControls] = useState(false);
        const [collapsed, setCollapsed] = useState(false);

        switch (dog_sex_type_id) {
            case 1:
                dog_sex_type_id = 'Кобель';
                break;
            case 2:
                dog_sex_type_id = 'Сука';
                break;
            default:
                break;
        }

        return <>
            <div className="CardNewsNew__content">
                <div className="CardNewsNew__head" style={{ margin: '0 10px 0 10px' }}>
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
                            <span className="CardNewsNew__left-city">
                                <div className="CardNewsNew__left-inner">
                                    <div className="CardNewsNew__add-wrap">
                                        {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                        <span>
                                            {user_type === 3
                                                ? 'Клуб'
                                                : user_type === 4
                                                    ? 'Питомник'
                                                    : user_type === 5
                                                        ? 'Федерация'
                                                        : ''
                                            }
                                            &nbsp;
                                    </span>
                                        }
                                        <Link to={user_type === 4
                                            ? `/kennel/${alias}`
                                            : user_type === 1
                                                ? `/user/${alias}`
                                                : user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online'
                                                    ? `/club/${alias}`
                                        : `/${alias}`}>
                                        {user_type === 1 ? first_name + ' ' + last_name : name}
                                    </Link>
                                    <span className="CardNewsNew__left-mark">
                                        <span>
                                            {active_rkf_user &&
                                            <ActiveUserMark />
                                            }</span>
                                        <span>
                                            {active_member &&
                                            <FederationChoiceMark />
                                            }
                                        </span>
                                    </span>
                                    </div>
                                    {fact_city_name &&
                                    <span className="CardNewsNew__city"
                                          onClick={() => changeCityFilter([fact_city_id])}
                                          title={fact_city_name}>
                                          {fact_city_name}
                                    </span>
                                    }
                                </div>
                            </span>
                            <div className="CardNewsNew__left__city-inner">
                                {formatDateTime(create_date)}
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
                                                        {isFederation ? <Link to={`/news/${id}`} style={{ textDecoration: 'none' }}>Подробнее...</Link> : <Link to={`${url}/edit`} style={{ textDecoration: 'none' }}>Редактировать</Link>}
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
                <div className={(!collapsed && (advert_type_id < 1))  ? 'CardNewsNew__text-wrap' : 'CardNewsNew__text-wrap__collapsed'}>

                    {is_advert && <div className="CardNewsNew__ad">
                        {advert_type_name && <span className="CardNewsNew__category-span">Категория: {advert_type_name}</span>}
                        {
                                <p className="CardNewsNew__ad-breed">
                                    <span>{is_halfbreed ? "Метис" : `Порода: ${advert_breed_name}`}</span>
                                    <span>№{advert_code}</span>
                                </p>
                        }
                        {
                            dog_color && <div>Окрас: {dog_color}</div>
                        }
                        {
                            dog_name && <div>Кличка собаки: {dog_name}</div>
                        }
                        {
                            !is_all_cities && dog_city && (advert_type_id > 1)
                                ?
                                <div>Место {cityLabel}: {dog_city.map((item, i) => dog_city.length === i + 1 ? item.name : `${item.name}, `)}</div>
                                :
                                <span>Все города</span>
                        }
                        {
                            dog_age && <div>Возраст {(advert_type_id === 5) && '(примерный)'}: {dog_age}</div>
                        }
                        {
                            dog_sex_type_id && <div>Пол: {dog_sex_type_id}</div>
                        }
                        <div className="CardNewsNew__ad-price">
                            <div>
                                {
                                    (advert_type_id < 4) &&
                                    <div>
                                        <span>Стоимость: {advert_cost ? `${advert_cost} руб.` : '-'} </span>
                                        <span>Кол-во щенков: {advert_number_of_puppies} </span>
                                    </div>
                                }

                            </div>
                            {is_closed_advert && <div className="CardNewsNew__ad-inactive" >Объявление не активно</div>}
                        </div>
                    </div>}
                    <p className={`CardNewsNew__text${!canCollapse ? ' _disabled' : ''}`}
                        ref={ref}
                        dangerouslySetInnerHTML={{ __html: formatText(content) }}
                    />
                </div>
                <div className="CardNewsNew__show-all-wrap" style={{ margin: '0 10px 0 10px' }}>
                    {
                        <div className={`CardNewsNew__show-all${!canCollapse ? ' _disabled' : ''}`}
                            onClick={() => canCollapse && setCollapsed(!collapsed)}>
                            {
                                (advert_type_id < 1) ? (!collapsed ? 'Подробнее...' : 'Свернуть') : ''
                            }

                        </div>
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
                <div className="CardNewsNew__documents" style={{ margin: '0 10px 0 10px' }}>
                    <ul className="CardNewsNew__documents-list">
                        {documents.map(doc =>
                            <li className="DocumentItem" key={doc.id}>
                                <DocumentLink
                                    docId={doc.id}
                                    document={doc}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            }
            {/* {videoLink && <p className={`CardNewsNew__video-count ${collapsed ? '_count_collapsed' : ''}`}>Прикрепленные видео: 1</p>} */}
            <div className="CardNewsNew__controls">
                <CardFooter
                    id={id}
                    share_link={`https://rkf.online/news/${id}`}
                    is_liked={is_liked}
                    like_count={like_count}
                    likesOn={true}
                    type="news"
                />
            </div>
        </>
    };

    const EditItem = () => <>
        <div className="CardNewsNew__content">
            <div className="CardNewsNew__head">
                <div className="CardNewsNew__left">
                    <Link to={user_type === 4
                        ? `/kennel/${alias}`
                        : user_type === 1
                            ? `/user/${alias}`
                            : user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online'
                                ? `/club/${alias}`
                                : `/${alias}`}
                    >
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
                            <Link to={user_type === 4
                                ? `/kennel/${alias}`
                                : user_type === 1
                                    ? `/user/${alias}`
                                    : user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online'
                                        ? `/club/${alias}`
                                        : `/${alias}`}>
                                {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                    <>
                                        <span>
                                            {
                                                user_type === 3
                                                    ? 'Клуб'
                                                    : user_type === 4
                                                        ? 'Питомник'
                                                        : user_type === 5
                                                            ? 'Федерация'
                                                            : ''
                                            }
                                        </span>
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
                        <div>
                            {formatDateTime(create_date)}
                            {fact_city_name &&
                                <span className="CardNewsNew__city"
                                    onClick={() => changeCityFilter([fact_city_id])}
                                    title={fact_city_name}>
                                    {fact_city_name}
                                </span>
                            }
                        </div>
                    </span>
                </div>
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
            <CardFooter
                id={id}
                share_link={`https://rkf.online/news/${id}`}
                is_liked={is_liked}
                like_count={like_count}
                likesOn={true}
                type="news"
            />
        </div>
    </>;

    return (
        <Card className={`CardNewsNew`}>
            <div className={`CardNewsNew__wrap${is_closed_advert ? ' is_closed' : ''}`}>
                {isEditing ? <EditItem /> : <ViewItem />}
                {showPhoto &&
                    <Modal handleClose={() => setShowPhoto(false)}>
                        <Lightbox
                            images={[{ src: picture_link }]}
                            isOpen={showPhoto}
                            showImageCount={false}
                        />
                    </Modal>
                }
            </div>
        </Card>
    )
});

export default React.memo(CardNewsNew);