import React, {useEffect, useState} from "react";
import StickyBox from "react-sticky-box";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import {Link, Redirect, useParams} from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Alert from "../../components/Alert";
import UserBanner from "../../components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "../../components/Layouts/UserMenu";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import {Gallery, AddPhotoModal} from "../../components/Gallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import {Request} from "../../utils/request";
import {connectAuthVisible} from "../Login/connectors";
import {endpointGetUserInfo, userNav} from "../User/config";
import useIsMobile from "../../utils/useIsMobile";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";
import ls from "local-storage";


const UserPhotosPage = ({history, match, profile_id, is_active_profile, isAuthenticated}) => {
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
    const alias = match.params.id;
    const isMobile = useIsMobile();
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
            if(needUpdateAvatar) {
                ls.set('user_info', {...ls.get('user_info'), logo_link: data.logo_link});
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

    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
        }
    };

    const onImageAddSuccess = () => {
        setShowModal(false);
        getImages(1);
    };

    return loading ?
        <Loading/> :
        error ?
            <Redirect to="/404" /> :
            <Layout>
                <div className="user-page">
                    <Container className="user-page__content content">
                        <aside className="user-page__left">
                            <StickyBox offsetTop={66}>
                                {isMobile &&
                                    <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUserInfo}/>
                                }
                                <Card>
                                    <UserInfo
                                        canEdit={canEdit}
                                        logo_link={userInfo.logo_link}
                                        share_link={`https://rkf.online/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                        alias={alias}
                                        updateInfo={getUserInfo}
                                    />
                                </Card>
                                {!isMobile && <Card>
                                    <UserMenu userNav={userNav(alias)} />
                                </Card>}
                                {isMobile && <UserMenu userNav={userNav(alias)} />}
                                {!isMobile &&
                                    <>
                                        <UserVideoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/video`}
                                            canEdit={canEdit}
                                        />
                                        <CopyrightInfo/>
                                    </>
                                }
                            </StickyBox>
                        </aside>
                        <div className="user-page__right">
                            {!isMobile &&
                                <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUserInfo}/>
                            }
                            {isMobile &&
                                <UserVideoGallery
                                    alias={alias}
                                    pageLink={`/user/${alias}/video`}
                                    canEdit={canEdit}
                                />
                            }
                            <div className="NurseryGallery__content">
                                <Card>
                                    <div className="NurseryGallery__breadcrumbs">
                                        <div className="NurseryGallery__breadcrumbs-title">
                                            <Link className="btn-backward" to={`/user/${alias}`}> <span>&lsaquo;</span> Личная страница</Link>&nbsp;/&nbsp;
                                            {album ? <><Link className="btn-backward" to={`/user/${alias}/gallery`}>Фотогалерея</Link> / {album.name}</> : 'Фотогалерея'}
                                        </div>
                                    </div>
                                    {album && <h4 className="NurseryGallery__description">{album.description}</h4>}
                                    <div className="NurseryGallery__buttons">
                                        {album && canEdit &&
                                            <Link
                                                className="NurseryGallery__buttons-link"
                                                to={`/user/${alias}/gallery/${params.album}/edit`}
                                            >Редактировать</Link>
                                        }
                                        {album && canEdit && album.addition &&
                                            <>
                                                <span
                                                    className="NurseryGallery__buttons-link"
                                                    onClick={() => handleAlbumDelete(params.album)}
                                                >Удалить</span>
                                                <span
                                                    className="NurseryGallery__buttons-link"
                                                    onClick={() => handleAddPhoto()}
                                                >Добавить фото</span>
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
                                        onModalClose={onModalClose}
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