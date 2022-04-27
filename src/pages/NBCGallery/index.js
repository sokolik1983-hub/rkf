import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "../../components/Layouts/Container";
import {Link, NavLink, useHistory, useParams} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery, AddPhotoModal } from "components/Gallery";
import Alert from "components/Alert";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import Aside from "components/Layouts/Aside";
import UserHeader from "../../components/redesign/UserHeader";
import StickyBox from "react-sticky-box";
import UserMenu from "../../components/Layouts/UserMenu";
import InfiniteScroll from "react-infinite-scroll-component";
import { DEFAULT_IMG } from "appConfig";
import useIsMobile from "../../utils/useIsMobile";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import { kennelNav } from "../Nursery/config";
import BreedsList from "../../components/BreedsList";
import "./index.scss";
import {endpointGetNBCInfo} from "../../components/Layouts/NBCLayout/config";
import PhotoComponent from "../../components/PhotoComponent";
import Banner from "../../components/Banner";
import {BANNER_TYPES} from "../../appConfig";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserBanner from "../../components/Layouts/UserBanner";
import UserContacts from "../../components/redesign/UserContacts";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
// import "pages/Nursery/index.scss";


import "./index.scss"
import {Breadcrumbs} from "@material-ui/core";
import {useSelector} from "react-redux";

const NBCGallery = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nbcInfo, setNBCInfo] = useState(null);
    const [nbcProfileId, setNBCProfileId] = useState(null);
    const [images, setImages] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [albums, setAlbums] = useState(null);
    const [album, setAlbum] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [notificationsLength, setNotificationsLength] = useState(0);

    const history = useHistory();
    const params = useParams();
    const { alias } = params;
    const aliasRedux = useSelector(state => state?.authentication?.user_info?.alias);
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getImages(1), !album && getAlbums(), !nbcInfo && getNBCInfo()])
            .then(() => {
                setStartElement(1);
                setPageLoaded(true);
            });
    }, [params]);

    const getImages = async startElem => {
        setImagesLoading(true);
        return Request({
            url: `/api/photogallery/gallery?alias=${alias}&start_element=${startElem}${params.album ? '&album_id=' + params.album : ''}`,
            method: 'GET'
        }, data => {
            console.log('data1111', data);
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
            url: `/api/photogallery/albums?alias=${alias}`,
            method: 'GET'
        }, (albums) => {
            setAlbums(albums);
            setImagesLoading(false);
        }, error => handleError(error));
    }

    const getNBCInfo = async () => {
        Request({
            url: endpointGetNBCInfo + '?alias=' + alias
        }, data => {
            setNBCInfo(data);
            setNBCProfileId(data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        });
    }

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

    const handleAlbumDelete = (id) => {
        if (window.confirm('Действительно удалить?')) {
            Request({
                    url: `/api/photogallery/albums`,
                    method: 'DELETE',
                    data: JSON.stringify([id])
                }, () => {
                    history.push(`/kennel/${alias}/gallery`)
                    getAlbums();
                },
                error => handleError(error));
        }
    };

    const handleAddPhoto = () => {
        setShowModal(true);
    }

    const onModalClose = (e) => {
        if(!e.target.closest('.Alert')) {
            showModal && setShowModal(false);
        }
    };

    const onImageAddSuccess = () => {
        setShowModal(false);
        getImages(1);
    };

    const Breadcrumbs = () => {
        return <div className="NurseryGallery__breadcrumbs">
            <div className="NurseryGallery__breadcrumbs-title">
                {album ? <><Link className="btn-backward" to={`/nbc/${alias}/gallery`}>Фотогалерея</Link> / {album.name}</> : 'Фотогалерея'}
            </div>
        </div>
    };

    // const onSubscriptionUpdate = (subscribed) => {
    //     setNBCInfo({
    //         ...nbcInfo,
    //         subscribed: subscribed
    //     })
    // }

    useEffect(() => {
        (() => getNBCInfo())();
        setCanEdit((aliasRedux === alias));
    }, []);


    useEffect(() => {
        console.log('album', album)
    }, [])
    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <Layout setNotificationsLength={setNotificationsLength}>
                        <div className="redesign">
                            <Container className="content nbc-page">
                                <div className="nbc-page__content-wrap">
                                    <Aside className="nbc-page__info">
                                        <StickyBox offsetTop={60}>
                                            <div className="club-page__info-inner">
                                                {!isMobile && nbcInfo &&
                                                    <>
                                                        <UserHeader
                                                            user='nbc'
                                                            logo={nbcInfo.logo_link}
                                                            name={nbcInfo.name || 'Название клуба отсутствует'}
                                                            alias={nbcInfo.alias}
                                                            profileId={nbcProfileId}
                                                            canEdit={canEdit}
                                                            subscribed={nbcInfo.subscribed}
                                                            isAuthenticated={isAuthenticated}
                                                        />
                                                        <PhotoComponent
                                                            photo={nbcInfo.owner_photo}
                                                            name={nbcInfo.owner_name}
                                                            position={nbcInfo.owner_position}
                                                            canEdit={canEdit}
                                                        />
                                                    </>
                                                }

                                                {/*{!isMobile && <UserMenu userNav={canEdit*/}
                                                {/*    ? clubNav(clubInfo.club_alias) // Show NewsFeed menu item to current user only*/}
                                                {/*    : clubNav(clubInfo.club_alias).filter(i => i.id !== 2)}*/}
                                                {/*                        notificationsLength={notificationsLength}*/}
                                                {/*/>}*/}
                                                {!isMobile && nbcInfo &&
                                                    <>
                                                        <UserVideoGallery
                                                            alias={alias}
                                                            pageLink={`/nbc/${alias}/video`}
                                                            canEdit={canEdit}
                                                        />
                                                        <CopyrightInfo withSocials={true} />
                                                    </>
                                                }
                                            </div>
                                        </StickyBox>
                                    </Aside>
                                    <div className="nbc-page__content">
                                        <Card>
                                            <Breadcrumbs />
                                            <div className="ClubGallery__buttons">
                                                {album && canEdit && <Link className="ClubGallery__buttons-link" to={`/nbc/${alias}/gallery/${params.album}/edit`}>
                                                    <div className="ClubGallery__buttons-link__icon">
                                                        <svg width="15" height="15" viewBox="0 0 19 19" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725L17.71 4.0425ZM0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z" />
                                                        </svg>
                                                    </div>
                                                    Редактировать
                                                </Link>}
                                                {album && canEdit && album.addition && <>
                                                    <span className="ClubGallery__buttons-link" onClick={() => handleAlbumDelete(params.album)}>
                                                        <div className="ClubGallery__buttons-link__icon">
                                                            <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                                            </svg>
                                                        </div>
                                                        Удалить
                                                    </span>
                                                    <span className="ClubGallery__buttons-link" onClick={() => handleAddPhoto()}>
                                                        <div className="ClubGallery__buttons-link__icon">
                                                            <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                                                            </svg>
                                                        </div>
                                                        Добавить фото
                                                    </span>
                                                </>}
                                            </div>

                                            {!pageLoaded ?
                                                <Loading centered={false} /> :
                                                <InfiniteScroll
                                                    dataLength={images.length}
                                                    next={getNextImages}
                                                    hasMore={hasMore}
                                                    loader={imagesLoading && <Loading centered={false} />}
                                                    endMessage={!images.length &&
                                                        <div className="ClubGallery__no-images">
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
                                                        isClub={true}
                                                    />
                                                </InfiniteScroll>
                                            }
                                        </Card>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
            {showModal && <AddPhotoModal showModal={showModal} onModalClose={(e) => onModalClose(e)} albumId={album.id} onSuccess={onImageAddSuccess} />}
        </>
    )
};

export default connectAuthVisible(React.memo(NBCGallery));