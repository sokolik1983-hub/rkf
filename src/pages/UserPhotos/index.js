import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import { Link, Redirect, useParams } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Alert from "../../components/Alert";
import UserInfo from "../../components/Layouts/UserInfo";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import { Gallery, AddPhotoModal } from "../../components/Gallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import { Request } from "../../utils/request";
import { connectAuthVisible } from "../Login/connectors";
import { endpointGetUserInfo } from "components/Layouts/UserLayout/config";
import useIsMobile from "../../utils/useIsMobile";
import { DEFAULT_IMG } from "../../appConfig";
import ls from "local-storage";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./index.scss";

const UserPhotosPage = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const [album, setAlbum] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [albums, setAlbums] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [images, setImages] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const alias = match.params.alias;
    const isMobile = useIsMobile(1080);
    const params = useParams();

    useEffect(() => {
        (() => getUserInfo())();
    }, [alias]);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getImages(1), !album && getAlbums()])
            .then(() => {
                setStartElement(1);
                setPageLoaded(true);
            });
    }, [params]);

    const getUserInfo = async needUpdateAvatar => {
        setLoading(true);

        await Request({
            url: endpointGetUserInfo + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
        })

        setLoading(false);
    };

    const getImages = async startElem => {
        setImagesLoading(true);
        return Request({
            url: `/api/photogallery/gallery?alias=${params.id}&start_element=${startElem}${params.album ? '&album_id=' + params.album : ''}`
        }, data => {
            if (data.photos.length) {
                const modifiedNews = data.photos.map(p => {
                    return {
                        id: p.id,
                        src: p.link,
                        thumbnail: p.small_photo.link,
                        thumbnailWidth: p.small_photo.width,
                        thumbnailHeight: p.small_photo.height,
                        caption: p.caption
                    };
                });

                if (data.photos.length < 25) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setImages(startElem === 1 ? modifiedNews : [...images, ...modifiedNews]);
            } else {
                if (startElem === 1) {
                    setImages([]);
                }
                setHasMore(false);
            }
            setAlbum(data.album);
            setImagesLoading(false);
        }, error => handleError(error));
    };

    const getNextImages = () => {
        if (hasMore) {
            setStartElement(startElement + 25);
            (() => getImages(startElement + 25))();
        }
    };

    const getAlbums = (page = 0) => {
        setImagesLoading(true);
        return Request({
            url: `/api/photogallery/albums?alias=${params.id}`
        }, (albums) => {
            setAlbums(albums);
            setImagesLoading(false);
        }, error => handleError(error));
    };

    const handleError = e => {
        let errorText = e.response.data.errors
            ? Object.values(e.response.data.errors)
            : `${e.response.status} ${e.response.statusText}`;
        setShowAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setShowAlert(false)
        });
    };

    const handleAlbumDelete = id => {
        if (window.confirm('Действительно удалить?')) {
            Request({
                url: `/api/photogallery/albums`,
                method: 'DELETE',
                data: JSON.stringify([id])
            }, () => {
                history.push(`/user/${alias}/gallery`)
                getAlbums();
            }, error => handleError(error));
        }
    };

    const handleAddPhoto = () => {
        setShowModal(true);
    };

    const onModalClose = (e) => {
        if(!e.target.closest('.Alert')) {
            showModal && setShowModal(false);
        }
    };

    const onImageAddSuccess = () => {
        setShowModal(false);
        getImages(1);
    };

    const onSubscriptionUpdate = (subscribed) => {
        setUserInfo({
            ...userInfo,
            subscribed: subscribed
        })
    }

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="/404" /> :
            <Layout>
                <div className="user-page">
                    <Container className="user-page__content content">
                        <aside className="user-page__left">
                            <StickyBox offsetTop={60}>
                                {/* {isMobile &&
                                    <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUserInfo} />
                                } */}
                                <Card>
                                    <UserInfo
                                        canEdit={canEdit}
                                        logo_link={userInfo.logo_link}
                                        share_link={`${window.location.host}/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                        alias={alias}
                                        subscribed={userInfo.subscribed}
                                        subscribed_id={userInfo.profile_id}
                                        onSubscriptionUpdate={onSubscriptionUpdate}
                                        updateInfo={getUserInfo}
                                        judgeInfo={userInfo.open_roles}
                                    />
                                </Card>
                                {!isMobile &&
                                    <>
                                        <MenuComponentNew />
                                        <UserVideoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/video`}
                                            canEdit={canEdit}
                                        />
                                        <CopyrightInfo withSocials={true} />
                                    </>
                                }
                            </StickyBox>
                        </aside>
                        <div className="user-page__right">
                            <div className="NurseryGallery__content">
                                <Card>
                                    <div className="NurseryGallery__breadcrumbs">
                                        <div className="NurseryGallery__breadcrumbs-title">
                                            {album ? <><Link className="btn-backward" to={`/user/${alias}/gallery`}>Фотогалерея</Link> / {album.name}</> : 'Фотогалерея'}
                                        </div>
                                    </div>
                                    <div className="NurseryGallery__buttons">
                                        {album && canEdit &&
                                            <Link
                                                className="NurseryGallery__buttons-link"
                                                to={`/user/${alias}/gallery/${params.album}/edit`}
                                            >
                                                <div className="NurseryGallery__buttons-link__icon">
                                                    <svg width="15" height="15" viewBox="0 0 19 19" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725L17.71 4.0425ZM0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z" />
                                                    </svg>
                                                </div>
                                                Редактировать</Link>
                                        }
                                        {album && canEdit && album.addition &&
                                            <>
                                                <span
                                                    className="NurseryGallery__buttons-link"
                                                    onClick={() => handleAlbumDelete(params.album)}
                                                >
                                                    <div className="NurseryGallery__buttons-link__icon">
                                                        <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                                        </svg>
                                                    </div>
                                                    Удалить</span>
                                                <span
                                                    className="NurseryGallery__buttons-link"
                                                    onClick={() => handleAddPhoto()}
                                                >
                                                    <div className="NurseryGallery__buttons-link__icon">
                                                        <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                                                        </svg>
                                                    </div>
                                                    Добавить фото</span>
                                            </>
                                        }
                                    </div>
                                    {!pageLoaded ?
                                        <Loading centered={false} /> :
                                        <InfiniteScroll
                                            dataLength={images.length}
                                            next={getNextImages}
                                            hasMore={hasMore}
                                            loader={imagesLoading && <Loading centered={false} />}
                                            endMessage={!images.length &&
                                                <div className="NurseryGallery__no-images">
                                                    <h4>Изображений больше нет</h4>
                                                    <img src={DEFAULT_IMG.emptyGallery} alt="Изображений больше нет" />
                                                </div>
                                            }
                                        >
                                            <Gallery
                                                items={images}
                                                albums={albums}
                                                album={album}
                                                match={match}
                                                backdropClosesModal={true}
                                                enableImageSelection={false}
                                                getAlbums={getAlbums}
                                                getImages={getImages}
                                                canEdit={canEdit}
                                                alias={alias}
                                                isUser={true}
                                            />
                                        </InfiniteScroll>
                                    }
                                </Card>
                                {showAlert && <Alert {...showAlert} />}
                                {showModal &&
                                    <AddPhotoModal
                                        showModal={showModal}
                                        onModalClose={(e) => onModalClose(e)}
                                        albumId={params.album}
                                        onSuccess={onImageAddSuccess}
                                    />
                                }
                            </div>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(UserPhotosPage));