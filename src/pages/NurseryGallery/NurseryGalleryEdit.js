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
import UserHeader from "../../components/redesign/UserHeader";
import StickyBox from "react-sticky-box";
import { EditAlbum } from "components/Gallery";
import InfiniteScroll from "react-infinite-scroll-component";
import declension from "utils/declension";
import { DEFAULT_IMG } from "appConfig";
import useIsMobile from "../../utils/useIsMobile";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import BreedsList from "../../components/BreedsList";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./styles.scss";
import "pages/Nursery/index.scss";

const NurseryGalleryEdit = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [nursery, setNursery] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [images, setImages] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [album, setAlbum] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();
    const alias = match.params.id;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        Promise.all([getImages(1), getNursery()])
            .then(() => setPageLoaded(true));
    }, []);

    const getImages = async (startElem = 1) => {
        setImagesLoading(true);
        await Request({
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

    const getNursery = async () => {
        await Request({
            url: '/api/nurseries/nursery/public/' + params.id
        }, data => {
            setNursery(data);
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
        const errorText = e.response.data.errors
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
        getImages();
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
    };

    return (
        <AuthOrLogin>
            <>
                {!pageLoaded
                    ? <Loading />
                    : <Layout>
                        <div className="redesign">
                            <Container className="content nursery-page">
                                <div className="nursery-page__content-wrap">
                                    <div className="nursery-page__content">
                                        <Card className="nursery-page__content-banner">
                                            <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}` }} />
                                        </Card>
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
                                                />
                                                {nursery.breeds && !!nursery.breeds.length &&
                                                    <BreedsList breeds={nursery.breeds} />
                                                }
                                            </>
                                        }
                                        <div className="nursery-gallery__content">
                                            <Card>
                                                <div className="nursery-gallery__breadcrumbs wrap">
                                                    <div>
                                                        <Link className="btn-backward" to={`/kennel/${params.id}/`}> <span>&lsaquo;</span> Личная страница</Link> /
                                                        <Link className="btn-backward" to={`/kennel/${params.id}/gallery`}> Фотогалерея</Link>
                                                        {
                                                            album &&
                                                            <Link
                                                                className="btn-backward"
                                                                to={`/kennel/${alias}/gallery/${params.album}`}
                                                            >
                                                                / {album.name}
                                                            </Link>
                                                        }
                                                        &nbsp;/&nbsp;Редактирование
                                                    </div>
                                                </div>
                                                {album && album.addition && <>
                                                    <div className="nursery-gallery__edit-wrap">
                                                        <div className="nursery-gallery__edit-cover">
                                                            <h4>Обложка альбома</h4>
                                                            <div className="nursery-gallery__edit-cover-image" style={{ backgroundImage: `url(${album.cover || DEFAULT_IMG.noImage})` }} />
                                                        </div>
                                                        <EditAlbum album={album} onSuccess={onAlbumAddSuccess} />
                                                    </div>
                                                </>}
                                                {canEdit &&
                                                    <>
                                                        <hr className="nursery-gallery__content-divider" />
                                                        {album && album.addition && <DndImageUpload callback={getImages} album_id={album && album.id} />}
                                                        <div className="nursery-gallery__count">
                                                            <h4>
                                                                {album
                                                                    ? selectedImages.length
                                                                        ? <>Выбрано <strong>{selectedImages.length}</strong> из <strong>{album.count}</strong> фотографий</>
                                                                        : <><strong>{images.length}</strong>&nbsp;{declension(images.length, ['фотография', 'фотографии', 'фотографий'])}</>
                                                                    : null
                                                                }
                                                            </h4>
                                                            <div className="nursery-gallery__count-buttons">
                                                                {!!selectedImages.length &&
                                                                    <span onClick={handleDelete}>
                                                                        <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                                                        </svg>
                                                                    &nbsp;Удалить
                                                                    </span>
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
                                                                <div className="nursery-gallery__no-images">
                                                                    <h4>Изображений больше нет</h4>
                                                                    <img src={DEFAULT_IMG.emptyGallery} alt="Изображений больше нет" />
                                                                </div>
                                                            }
                                                        >
                                                            <div className="edit-gallery__wrap">
                                                                <Gallery items={images} match={match} backdropClosesModal={true} onSelectImage={onSelectImage} />
                                                            </div>
                                                        </InfiniteScroll>
                                                    </>
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
            </>
        </AuthOrLogin>
    )
};

export default connectAuthVisible(React.memo(NurseryGalleryEdit));