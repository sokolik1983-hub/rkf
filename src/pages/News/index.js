import React, {useEffect, useRef, useState} from "react";
import { Redirect, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import Edit from "./components/Edit";
import { endpointGetNews } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import Card from "../../components/Card";
import Layout from "../../components/Layouts";
import Loading from "../../components/Loading";
import CardFooter from "../../components/CardFooter";
import DocumentLink from "../../components/DocumentLink";
import Container from "../../components/Layouts/Container";
import { endpointGetLinkNewsFeed } from "../../components/CardNewsNew/config";
import { endpointDeleteArticle } from "../../components/Layouts/UserNews/config";
import { formatText } from "../../utils";
import { Request } from "../../utils/request";
import { formatDateTime } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";

import "./index.scss";


const NewsPage = ({
    history,
    isAuthenticated,
    match,
    profile_id,
}) => {
    const [isOpenControls, setIsOpenControls] = useState(false);
    const [news, setNews] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const id = match.params.id;
    const canEdit = isAuthenticated && news && profile_id === news.profile_id;

    const onDelete = async id => {
        if (window.confirm('Вы действительно хотите удалить эту новость?')) {
            await Request({
                    url: '/api/Article/' + id,
                    method: 'DELETE'
                }, () => {
                    setLoading(true);
                    history.goBack();
                },
                error => {
                    console.log(error);
                    alert('Новость не удалена');
                });
        }
    };

    const onAdClose = async (id) => {
        if (window.confirm('Вы действительно хотите закрыть объявление?')) {
            await Request({
                    url: endpointDeleteArticle,
                    method: 'PUT',
                    data: JSON.stringify({ "id": id, "is_closed_advert": true })
                }, () => {
                    setNeedRequest(true);
                },
                error => {
                    console.log(error);
                    alert('Объявление не закрыто');
                });
        }
    };

    useEffect(() => {
        const isEditUrl = match.url.split('/')[3] === 'edit';

        if (isEditUrl && canEdit !== null) {
            if (canEdit) {
                setIsEdit(true);
            } else {
                history.replace(`/news/${id}`);
            }
        }
    }, [canEdit]);

    useEffect(() => {
        if (needRequest) {
            (() => Request({ url: `${endpointGetNews}/${id}` },
                data => {
                    setNews(data);
                    setNeedRequest(false);
                    setLoading(false);
                }, error => {
                    console.log(error.response);
                    setIsError(true);
                    setNeedRequest(false);
                    setLoading(false);
                }))();
        }
    }, [id, needRequest]);

    return loading ?
        <Loading /> :
        isError ?
            <Redirect to="/not-found" /> :
            <Layout>
                <Container className="content news-page">
                    <Card className={'news' + (!!isEdit ? ' edit' : '')}>
                        <div className="news__wrap-head">
                            <div className="news__inner-head">
                                <Link
                                    to={news.user_type === 1 ? `/user/${news.alias}` :
                                        news.user_type === 4 ? `/kennel/${news.alias}` :
                                            news.user_type === 3 ? `/club/${news.alias}` :
                                                news.user_type === 7 ? `/nbc/${news.alias}` :
                                            `/${news.alias}`
                                    }
                                    className="news__item-head"
                                >
                                    <div
                                        className="news__avatar"
                                        style={{backgroundImage: `url(${
                                                news.logo_link ? news.logo_link :
                                                    news.user_type === 1 ? DEFAULT_IMG.userAvatar :
                                                        DEFAULT_IMG.clubAvatar
                                            })`}}
                                    />
                                </Link>
                                    <div className="news__about">
                                        <Link
                                            to={news.user_type === 1 ? `/user/${news.alias}` :
                                                news.user_type === 4 ? `/kennel/${news.alias}` :
                                                    news.user_type === 3 ? `/club/${news.alias}` :
                                                        news.user_type === 7 ? `/nbc/${news.alias}` :
                                                    `/${news.alias}`
                                            }
                                            className="news__item-head"
                                        >
                                        <h5 className="news__name">{news.name}</h5>
                                        </Link>
                                        {news.fact_city_name &&
                                            <span
                                                className="news__city"
                                            >
                                            {news.fact_city_name}
                                        </span>
                                        }
                                        <p className="news__date">{formatDateTime(news.create_date)}</p>
                                    </div>

                            </div>
                            <div className="news__buttons">
                                {!isEdit &&
                                    <button className="back-button" onClick={() => history.goBack()}>Назад</button>
                                }
                                {canEdit &&
                                    <div className="news__right" >
                                        <div className="news__head-control">
                                            <button
                                                className={`news__head-control-btn${isOpenControls ? ' _open' : ''}`}
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
                                                        classNames="news__transition"
                                                        in={isOpenControls}
                                                        timeout={350}
                                                        unmountOnExit
                                                    >
                                                        <ul className="news__head-control-list">
                                                            {!news.is_closed_advert &&
                                                                <li className="news__head-control-item">
                                                                    {news.user_type === 5 ?
                                                                        <Link to={`/news/${id}`}>Подробнее...</Link> :
                                                                        <Link to={`${id}/edit`}>Редактировать</Link>
                                                                    }
                                                                </li>
                                                            }
                                                            {news.is_advert && !news.is_closed_advert &&
                                                                <li className="news__head-control-item"
                                                                    onClick={() => onAdClose(id)}
                                                                >
                                                                    <span className="news__remove">Закрыть объявление</span>
                                                                </li>
                                                            }
                                                            <li className="news__head-control-item"
                                                                onClick={() => onDelete(id)}
                                                            >
                                                                <span className="news__remove">Удалить</span>
                                                            </li>
                                                        </ul>
                                                    </CSSTransition>
                                                </OutsideClickHandler>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="news__item-body">
                            {isEdit && canEdit ?
                                <Edit id={news.id}
                                    advertTypeId={news.advert_type_id}
                                    advertCategoryId={news.advert_category_id}
                                    isHalfBreed={news.is_halfbreed}
                                    text={news.content}
                                    pictures={news.pictures || ''}
                                    videoLink={news.video_link || ''}
                                    documents={news.documents}
                                    isAd={news.is_advert}
                                    adBreedId={news.advert_breed_id}
                                    dogSex={news.dog_sex_type_id}
                                    dogCity={news.dog_city}
                                    dogColor={news.dog_color}
                                    dogName={news.dog_name}
                                    dogAge={news.dog_age}
                                    adCode={news.advert_code}
                                    adCost={news.advert_cost}
                                    adNumberOfPuppies={news.advert_number_of_puppies}
                                    history={history} isAllCities={news.is_all_cities}
                                /> :
                                <>
                                    {news.advert_breed_id &&
                                        <>
                                            {news.advert_type_name &&
                                                <div className="news__category-wrap">
                                                    <div>
                                                        <span className="news_category-name">Категория:&nbsp;</span>
                                                        <p className = "news__category-value">{news.advert_type_name}</p>
                                                    </div>
                                                    {news.advert_code &&
                                                        <span>№{news.advert_code}</span>
                                                    }
                                                </div>
                                            }
                                            <p className="news__ad-breed">
                                                <span>Порода: </span>
                                                <span>{!news.is_halfbreed ? news.advert_breed_name : 'Метис'}</span>
                                            </p>
                                            {news.dog_color &&
                                                <p className="news__ad-color">
                                                    <span>Окрас: </span>
                                                    <span>{news.dog_color}</span>
                                                </p>
                                            }
                                            {news.dog_name &&
                                                <p className="news__ad-name">
                                                    <span>Кличка собаки: </span>
                                                    <span>{news.dog_name}</span>
                                                </p>
                                            }
                                            <p className="news__ad-city">
                                                <span>
                                                    {`Место${news.advert_type_id === 4 ? 
                                                        ' потери' 
                                                        : 
                                                        news.advert_type_id === 5 ? 
                                                            ' нахождения' 
                                                            : 
                                                            ''}: `}
                                                </span>
                                                <span>
                                                    {!news.is_all_cities && news.dog_city && (news.advert_type_id > 1) ?
                                                        news.dog_city.map((item, i) => news.dog_city.length === i + 1 ?
                                                            item.name
                                                            :
                                                            `${item.name}, `)
                                                            :
                                                        'Все города'}
                                                </span>
                                            </p>
                                            {news.dog_age &&
                                                <p className="news__ad-age">
                                                    <span>Возраст{(news.advert_type_id === 5) && ' (примерный)'}: </span>
                                                    <span>{news.dog_age}</span>
                                                </p>
                                            }
                                            {news.dog_sex_type_id &&
                                                <p className="news__ad-sex">
                                                    <span>Пол: </span>
                                                    <span>{news.dog_sex_type_id === 1 ? 'кобель' : 'сука'}</span>
                                                </p>
                                            }
                                            {news.advert_type_id < 4 &&
                                                <div className="news__ad-price">
                                                    <p>
                                                        <span>Стоимость: </span>
                                                        <span>{news.advert_cost ? `${news.advert_cost} руб.` : '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span>Кол-во щенков: </span>
                                                        <span>{news.advert_number_of_puppies}</span>
                                                    </p>
                                                    {news.is_closed_advert &&
                                                        <div className="news__ad-inactive">Объявление не активно</div>
                                                    }
                                                </div>
                                            }
                                        </>
                                    }
                                    <p className="news__text" dangerouslySetInnerHTML={{ __html: formatText(news.content) }} />
                                    {news.pictures?.length !== 0 &&
                                        <ul
                                            className={`news__pictures-wrap __${news.pictures.length}`}>
                                        {news.pictures && news.pictures.map((picture, i) =>
                                            <li key={i}
                                                style={{backgroundImage: `url(${picture.picture_link})`}}
                                                alt="" className="news__pictures">
                                            </li>
                                            )}
                                        </ul>
                                    }
                                    {news.video_link &&
                                        <iframe
                                            className="news__video"
                                            src={news.video_link}
                                            title={news.id}
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                    }
                                    {news.documents && !!news.documents.length &&
                                        <div className="news__documents">
                                            <h4 className="news__documents-title">Прикрепленные файлы:</h4>
                                            <ul className="news__documents-list">
                                                {news.documents.map(doc =>
                                                    <li className="news__documents-item" key={doc.id}>
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
                                </>
                            }
                        </div>
                        <CardFooter
                            id={id}
                            share_link={window.location.host === 'rkf.online' ?
                                `https://rkf.online/news/${id}` :
                                `https://stage.uep24.ru/news/${id}`
                            }
                            is_liked={news.is_liked}
                            like_count={news.like_count}
                            likesOn={true}
                            type="news"
                        />
                    </Card>
                </Container>
            </Layout>
};

export default connectAuthVisible(React.memo(NewsPage));