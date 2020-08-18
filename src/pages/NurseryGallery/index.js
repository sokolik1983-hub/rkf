import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { Link, useHistory, useParams } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery, AddAlbum } from "components/Gallery";
import Alert from "components/Alert";
import Button from 'components/Button';
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import Aside from "components/Layouts/Aside";
import ClubUserHeader from "../../components/redesign/UserHeader";
import StickyBox from "react-sticky-box";
import MenuComponent from "../../components/MenuComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { DEFAULT_IMG } from "appConfig";
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
            method: 'GET'
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
        }, ({ albums }) => {
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

    const onModalClose = () => {
        if (showModal && window.confirm("Закрыть?")) {
            setShowModal(false);
        }
    };

    const onAlbumAddSuccess = () => {
        setShowModal(false);
        getAlbums();
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

    const Breadcrumbs = () => {
        return <div className="NurseryGallery__breadcrumbs">
            <div className="NurseryGallery__breadcrumbs-title">
                <Link className="btn-backward" to={`/kennel/${alias}/`}> <span>&lsaquo;</span> Личная страница</Link>&nbsp;/&nbsp;
                {album ? <><Link className="btn-backward" to={`/kennel/${alias}/gallery`}>Фотогалерея</Link> / {album.name}</> : 'Фотогалерея'}
            </div>
            {canEdit && <div className="NurseryGallery__breadcrumbs-buttons">
                {album
                    ? <Link className="btn btn-primary" to={`/kennel/${alias}/gallery/${params.album}/edit`}>Редактировать альбом</Link>
                    : <>
                        <span className="btn btn-primary" onClick={() => setShowModal(true)}>Создать альбом</span>
                        <Link className="btn btn-primary" to={`/kennel/${alias}/gallery/edit`}>Редактировать галерею</Link>
                    </>}
            </div>}
        </div>
    };

    return (
        <>
            {!pageLoaded && !nursery
                ? <Loading />
                : <Layout>
                    <div className="redesign">
                        <Container className="content nursery-page">
                            <div className="nursery-page__content-wrap">
                                <div className="nursery-page__content">
                                    <Card className="nursery-page__content-banner">
                                        <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}` }} />
                                    </Card>
                                    <div className="nursery-page__mobile-only">
                                        <ClubUserHeader
                                            user="nursery"
                                            logo={nursery.logo_link}
                                            name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                            alias={alias}
                                            profileId={nursery.id}
                                            federationName={nursery.federation_name}
                                            federationAlias={nursery.federation_alias}
                                        />
                                        {nursery.breeds && !!nursery.breeds.length &&
                                            <Card className="nursery-page__breeds">
                                                <h4>Породы</h4>
                                                <ul className="nursery-page__breeds-list">
                                                    {nursery.breeds.map(item =>
                                                        <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                    )}
                                                </ul>
                                            </Card>
                                        }
                                    </div>
                                    <div className="NurseryGallery__content">
                                        <Card>
                                            <Breadcrumbs />
                                            {album && <h4 className="NurseryGallery__description">{album.description}</h4>}
                                            {
                                                !pageLoaded
                                                    ? <Loading centered={false} />
                                                    : <>


                                                        <InfiniteScroll
                                                            dataLength={images.length}
                                                            next={getNextImages}
                                                            hasMore={hasMore}
                                                            loader={imagesLoading && <Loading centered={false} />}
                                                            endMessage={!!images.length &&
                                                                <div className="NurseryGallery__no-images">
                                                                    <h4>Изображений больше нет</h4>
                                                                    <img src={DEFAULT_IMG.emptyGallery} alt="Изображений больше нет" />
                                                                </div>
                                                            }
                                                        >
                                                            <Gallery items={images} albums={albums} match={match} backdropClosesModal={true} enableImageSelection={false} />
                                                        </InfiniteScroll>
                                                        {album && canEdit &&
                                                            <div className="NurseryGallery__buttons">
                                                                <Button
                                                                    condensed
                                                                    className="NurseryGallery__delete-button"
                                                                    onClick={() => handleAlbumDelete(params.album)}>Удалить</Button>
                                                            </div>}
                                                    </>
                                            }
                                        </Card>
                                    </div>
                                </div>
                                <Aside className="nursery-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="nursery-page__info-inner">
                                            <ClubUserHeader
                                                user="nursery"
                                                logo={nursery.logo_link}
                                                name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                alias={alias}
                                                profileId={nursery.id}
                                                federationName={nursery.federation_name}
                                                federationAlias={nursery.federation_alias}
                                            />
                                            {nursery.breeds && !!nursery.breeds.length &&
                                                <Card className="nursery-page__breeds">
                                                    <h4>Породы</h4>
                                                    <ul className="nursery-page__breeds-list">
                                                        {nursery.breeds.map(item =>
                                                            <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                        )}
                                                    </ul>
                                                </Card>
                                            }
                                            <div className="nursery-page__mobile-only">
                                                <MenuComponent
                                                    alias={alias}
                                                    user={user}
                                                    profileId={nursery.id}
                                                    noCard={true}
                                                />

                                            </div>

                                            <div className="nursery-page__copy-wrap">
                                                <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                                <p>Политика обработки персональных данных</p>
                                            </div>
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                        </Container>
                    </div>
                </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
            {showModal && <AddAlbum showModal={showModal} onModalClose={onModalClose} onSuccess={onAlbumAddSuccess} />}
        </>
    )
};

export default connectAuthVisible(React.memo(NurseryGallery));