import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery, DndImageUpload } from "components/Gallery";
import AuthOrLogin from "pages/Login/components/AuthOrLogin";
import Alert from "components/Alert";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import Aside from "components/Layouts/Aside";
import StickyBox from "react-sticky-box";
import MenuComponent from "components/MenuComponent";
import ClubUserHeader from "../../components/redesign/UserHeader";
import { EditAlbum } from "components/Gallery";
import InfiniteScroll from "react-infinite-scroll-component";
import declension from "utils/declension";
import { DEFAULT_IMG } from "appConfig";
import "./styles.scss";
import "pages/Club/index.scss";

const ClubGalleryEdit = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClub] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [album, setAlbum] = useState(null);
    const [images, setImages] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const params = useParams();
    const alias = params.id;

    useEffect(() => {
        Promise.all([getImages(1), getClub()])
            .then(() => setPageLoaded(true));
    }, []);

    const getImages = async (startElem = 1) => {
        setImagesLoading(true);
        return Request({
            url: `/api/photogallery/gallery?alias=${alias}&start_element=${startElem}${params.album ? '&album_id=' + params.album : ''}`,
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

    const getClub = () => {
        return Request({
            url: '/api/Club/public/' + alias
        }, data => {
            setClub(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => handleError(error));
    }

    const onSelectImage = (index, image) => {
        var imgs = images.slice();
        var img = imgs[index];
        if (img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected;
        } else {
            img.isSelected = true;
        }
        setImages(imgs);
        setSelectedImages(imgs.filter(i => i.isSelected === true));
    }

    const handleDelete = () => {
        if (window.confirm('Вы уверены?')) {
            Request({
                url: '/api/photogallery/gallery',
                method: "DELETE",
                data: JSON.stringify(selectedImages.map(i => i.id))
            }, () => {
                setShowAlert({
                    title: 'Успешно удалено!',
                    autoclose: 1.5,
                    onOk: () => setShowAlert(false)
                });
                setSelectedImages([]);
                getImages();
            }, error => handleError(error));
        }
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

    const onAlbumAddSuccess = () => {
        setShowAlert({
            title: 'Информация сохранена!',
            autoclose: 2.5,
            onOk: () => setShowAlert(false)
        });
        getImages(1);
    };

    const onSelectAll = () => {
        let imgs = images;
        if (!allSelected) {
            for (let i = 0; i < imgs.length; i++)
                imgs[i].isSelected = true;
        }
        else {
            for (let i = 0; i < imgs.length; i++)
                imgs[i].isSelected = false;
        }
        setImages(imgs);
        setSelectedImages(imgs.filter(i => i.isSelected === true));
        setAllSelected(!allSelected);
    }

    const Breadcrumbs = () => {
        return <div className="ClubGallery__breadcrumbs wrap">
            <div>
                <Link className="btn-backward" to={`/${alias}/`}> <span>&lsaquo;</span> Личная страница</Link> /
                        <Link className="btn-backward" to={`/${alias}/gallery`}> Фотогалерея</Link>
                {album ? <> / <Link className="btn-backward" to={`/${alias}/gallery/${params.album}`}>{album.name}</Link></> : ''}
                        &nbsp;/&nbsp;Редактирование
                </div>
        </div>
    }

    return (
        <AuthOrLogin>
            <>
                {!pageLoaded
                    ? <Loading />
                    : <Layout>
                        <div className="redesign">
                            <Container className="content club-page">
                                <div className="club-page__content-wrap">
                                    <div className="club-page__content">
                                        <Card className="club-page__content-banner">
                                            <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                        </Card>
                                        <div className="club-page__mobile-only">
                                            <ClubUserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                            />
                                        </div>
                                        <div className="ClubGallery__content">
                                            <Card>
                                                <Breadcrumbs />
                                                {album && album.addition && <>
                                                    <div className="ClubGallery__edit-wrap">
                                                        <div className="ClubGallery__edit-cover">
                                                            <h4>Обложка альбома</h4>
                                                            <div className="ClubGallery__edit-cover-image" style={{ backgroundImage: `url(${album.cover || DEFAULT_IMG.noImage})` }} />
                                                        </div>
                                                        <EditAlbum album={album} onSuccess={onAlbumAddSuccess} />
                                                    </div>
                                                </>}
                                                {canEdit &&
                                                    <>
                                                        <hr className="ClubGallery__content-divider" />
                                                        {album && album.addition && <DndImageUpload callback={getImages} album_id={album && album.id} />}
                                                        <div className="ClubGallery__count">
                                                            <h4>
                                                                {album
                                                                    ? selectedImages.length
                                                                        ? <>Выбрано <strong>{selectedImages.length}</strong> из <strong>{album.count}</strong> фотографий</>
                                                                        : <><strong>{album.count}</strong>&nbsp;{declension(album.count, ['фотография', 'фотографии', 'фотографий'])}</>
                                                                    : null
                                                                }
                                                            </h4>
                                                            <div className="ClubGallery__count-buttons">
                                                                {!!selectedImages.length &&
                                                                    <span onClick={handleDelete}>Удалить</span>
                                                                }
                                                                {!!images.length && <span onClick={onSelectAll}>
                                                                    {
                                                                        !!selectedImages.length && allSelected
                                                                            ? 'Снять выделение'
                                                                            : 'Выбрать все фотографии'
                                                                    }
                                                                </span>}
                                                            </div>
                                                        </div>
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
                                                            <Gallery items={images} match={match} backdropClosesModal={true} onSelectImage={onSelectImage} />
                                                        </InfiniteScroll>
                                                    </>
                                                }
                                            </Card>
                                        </div>
                                    </div>
                                    <Aside className="club-page__info">
                                        <StickyBox offsetTop={65}>
                                            <div className="club-page__info-inner">
                                                <ClubUserHeader
                                                    user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                    logo={clubInfo.logo_link}
                                                    name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                    alias={clubInfo.club_alias}
                                                    profileId={clubInfo.id}
                                                    federationName={clubInfo.federation_name}
                                                    federationAlias={clubInfo.federation_alias}
                                                />
                                                <div className="club-page__copy-wrap">
                                                    <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                                    <p>Политика обработки персональных данных</p>
                                                </div>
                                            </div>
                                        </StickyBox>
                                    </Aside>
                                </div>
                                <div className="club-page__mobile-only">
                                    <MenuComponent
                                        alias={clubInfo.club_alias}
                                        user={user}
                                        profileId={clubInfo.id}
                                        noCard={true}
                                    />
                                </div>
                            </Container>
                        </div>
                    </Layout>
                }
                {showAlert && <Alert {...showAlert} />}
            </>
        </AuthOrLogin>
    )
};

export default connectAuthVisible(React.memo(ClubGalleryEdit));