import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { Link, useHistory, useParams } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery, AddPhotoModal } from "components/Gallery";
import Alert from "components/Alert";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import Aside from "components/Layouts/Aside";
import UserHeader from "../../components/redesign/UserHeader";
import StickyBox from "react-sticky-box";
import InfiniteScroll from "react-infinite-scroll-component";
import { DEFAULT_IMG } from "appConfig";
import useIsMobile from "../../utils/useIsMobile";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import BreedsList from "../../components/BreedsList";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./styles.scss";
import "pages/Nursery/index.scss";

const NurseryGallery = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [nursery, setNursery] = useState(null);
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
    const params = useParams();
    const history = useHistory();
    const alias = match.params.id;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getImages(1), !album && getAlbums(), !nursery && getNursery()])
            .then(() => {
                setStartElement(1);
                setPageLoaded(true);
            });
    }, [params]);

    const getImages = async startElem => {
        setImagesLoading(true);
        return Request({
            url: `/api/photogallery/gallery?alias=${params.id}&start_element=${startElem}${params.album ? '&album_id=' + params.album : ''}`,
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
            url: `/api/photogallery/albums?alias=${params.id}`,
            method: 'GET'
        }, (albums) => {
            setAlbums(albums);
            setImagesLoading(false);
        }, error => handleError(error));
    }

    const getNursery = () => {
        return Request({
            url: '/api/nurseries/nursery/public/' + params.id
        }, data => {
            setNursery(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => handleError(error));
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
                {album ? <><Link className="btn-backward" to={`/kennel/${alias}/gallery`}>Фотогалерея</Link> / {album.name}</> : 'Фотогалерея'}
            </div>
        </div>
    };

    const onSubscriptionUpdate = (subscribed) => {
        setNursery({
            ...nursery,
            subscribed: subscribed
        })
    }

    return (
        <>
            {!pageLoaded && !nursery
                ? <Loading />
                : <Layout>
                    <div className="redesign">
                        <Container className="content nursery-page">
                            <div className="nursery-page__content-wrap">
                                <div className="nursery-page__content">
                                    {isMobile &&
                                        <>
                                            <UserHeader
                                                user="nursery"
                                                logo={nursery.logo_link}
                                                name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                alias={alias}
                                                profileId={nursery.id}
                                                federationName={nursery.federation_name}
                                                federationAlias={nursery.federation_alias}
                                                active_rkf_user={nursery.active_rkf_user}
                                                active_member={nursery.active_member}
                                                canEdit={canEdit}
                                                subscribed={nursery.subscribed}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                            {nursery.breeds && !!nursery.breeds.length &&
                                                <BreedsList breeds={nursery.breeds} />
                                            }
                                        </>
                                    }
                                    <div className="NurseryGallery__content">
                                        <Card>
                                            <Breadcrumbs />
                                            <div className="NurseryGallery__buttons">
                                                {album && canEdit &&
                                                    <Link
                                                        className="NurseryGallery__buttons-link"
                                                        to={`/kennel/${alias}/gallery/${params.album}/edit`}
                                                    >
                                                        <div className="NurseryGallery__buttons-link__icon">
                                                            <svg width="15" height="15" viewBox="0 0 19 19" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725L17.71 4.0425ZM0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z" />
                                                            </svg>
                                                        </div>
                                                        Редактировать
                                                    </Link>
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
                                                            Удалить
                                                        </span>
                                                        <span
                                                            className="NurseryGallery__buttons-link"
                                                            onClick={() => handleAddPhoto()}
                                                        >
                                                            <div className="NurseryGallery__buttons-link__icon">
                                                                <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                                                                </svg>
                                                            </div>
                                                            Добавить фото
                                                        </span>
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
                                                    />
                                                </InfiniteScroll>
                                            }
                                        </Card>
                                    </div>
                                </div>
                                <Aside className="nursery-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="nursery-page__info-inner">
                                            {!isMobile &&
                                                <UserHeader
                                                    user="nursery"
                                                    logo={nursery.logo_link}
                                                    name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                    alias={alias}
                                                    profileId={nursery.id}
                                                    federationName={nursery.federation_name}
                                                    federationAlias={nursery.federation_alias}
                                                    active_rkf_user={nursery.active_rkf_user}
                                                    active_member={nursery.active_member}
                                                    canEdit={canEdit}
                                                    subscribed={nursery.subscribed}
                                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                                    isAuthenticated={isAuthenticated}
                                                />
                                            }
                                            {!isMobile &&
                                                <>
                                                    <MenuComponentNew />
                                                    {nursery.breeds && !!nursery.breeds.length &&
                                                        <BreedsList breeds={nursery.breeds} />
                                                    }
                                                    <UserVideoGallery
                                                        alias={alias}
                                                        pageLink={`/kennel/${alias}/video`}
                                                        canEdit={canEdit}
                                                    />
                                                    <CopyrightInfo withSocials={true} />
                                                </>
                                            }
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                        </Container>
                    </div>
                </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
            {showModal && <AddPhotoModal showModal={showModal} onModalClose={(e) => onModalClose(e)} albumId={params.album} onSuccess={onImageAddSuccess} />}
        </>
    )
};

export default connectAuthVisible(React.memo(NurseryGallery));