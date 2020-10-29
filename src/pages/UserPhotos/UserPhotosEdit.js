import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StickyBox from "react-sticky-box";
import AuthOrLogin from "../Login/components/AuthOrLogin";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import { Link, Redirect, useParams } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Alert from "../../components/Alert";
import UserBanner from "../../components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "../../components/Layouts/UserMenu";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import { Gallery, EditAlbum, DndImageUpload } from "../../components/Gallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import { Request } from "../../utils/request";
import { connectAuthVisible } from "../Login/connectors";
import { endpointGetUserInfo, userNav } from "../User/config";
import useIsMobile from "../../utils/useIsMobile";
import { DEFAULT_IMG } from "../../appConfig";
import declension from "../../utils/declension";
import "./index.scss";


const UserPhotosEdit = ({ match, profile_id, is_active_profile, isAuthenticated }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const [album, setAlbum] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [startElement, setStartElement] = useState(1);
    const alias = match.params.id;
    const isMobile = useIsMobile();
    const params = useParams();

    useEffect(() => {
        Promise.all([getUserInfo(), getImages(1)])
            .then(() => setLoading(false));
    }, []);

    const getUserInfo = async () => {
        return Request({
            url: endpointGetUserInfo + alias
        }, data => {
            // data.email = data.emails.length ? data.emails[0].value : '';
            // data.phone = data.phones.length ? data.phones[0].value : '';

            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
        });
    };

    const getImages = async (startElem = 1) => {
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
        } else {
            for (let i = 0; i < imgs.length; i++)
                imgs[i].isSelected = false;
        }
        setImages(imgs);
        setSelectedImages(imgs.filter(i => i.isSelected === true));
        setAllSelected(!allSelected);
    };

    const onSelectImage = (index, image) => {
        const imgs = images.slice();
        let img = imgs[index];
        if (img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected;
        } else {
            img.isSelected = true;
        }
        setImages(imgs);
        setSelectedImages(imgs.filter(i => i.isSelected === true));
    };

    return (
        <AuthOrLogin>
            {loading ?
                <Loading /> :
                error ?
                    <Redirect to="/404" /> :
                    <Layout>
                        <div className="user-page">
                            <Container className="user-page__content content">
                                <aside className="user-page__left">
                                    <StickyBox offsetTop={66}>
                                        {isMobile &&
                                            <UserBanner link={userInfo.headliner_link} />
                                        }
                                        <Card>
                                            <UserInfo
                                                canEdit={canEdit}
                                                logo_link={userInfo.logo_link}
                                                share_link={`https://rkf.online/user/${alias}`}
                                                first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                                last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                                alias={alias}
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
                                                />
                                                <CopyrightInfo />
                                            </>
                                        }
                                    </StickyBox>
                                </aside>
                                <div className="user-page__right">
                                    {!isMobile &&
                                        <UserBanner link={userInfo.headliner_link} />
                                    }
                                    {isMobile &&
                                        <UserVideoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/video`}
                                        />
                                    }
                                    <div className="NurseryGallery__content">
                                        <Card>
                                            <div className="NurseryGallery__breadcrumbs wrap">
                                                <div>
                                                    <Link className="btn-backward" to={`/user/${params.id}/`}>
                                                        <span>&lsaquo;</span> Личная страница</Link> /
                                                    <Link className="btn-backward"
                                                        to={`/user/${params.id}/gallery`}> Фотогалерея</Link>
                                                    {album ? <> / <Link className="btn-backward"
                                                        to={`/user/${alias}/gallery/${params.album}`}>{album.name}</Link></> : ''}
                                                    &nbsp;/&nbsp;Редактирование
                                                </div>
                                            </div>
                                            {album && album.addition &&
                                                <div className="NurseryGallery__edit-wrap">
                                                    <div className="NurseryGallery__edit-cover">
                                                        <h4>Обложка альбома</h4>
                                                        <div className="NurseryGallery__edit-cover-image"
                                                            style={{ backgroundImage: `url(${album.cover || DEFAULT_IMG.noImage})` }} />
                                                    </div>
                                                    <EditAlbum album={album} onSuccess={onAlbumAddSuccess} />
                                                </div>
                                            }
                                            {canEdit &&
                                                <>
                                                    <hr className="NurseryGallery__content-divider" />
                                                    {album && album.addition &&
                                                        <DndImageUpload callback={getImages} album_id={album && album.id} />
                                                    }
                                                    <div className="NurseryGallery__count">
                                                        <h4>
                                                            {album
                                                                ? selectedImages.length
                                                                    ? <>Выбрано <strong>{selectedImages.length}</strong> из <strong>{album.count}</strong> фотографий</>
                                                                    : <>
                                                                        <strong>{album.count}</strong>&nbsp;{declension(album.count, ['фотография', 'фотографии', 'фотографий'])}
                                                                    </>
                                                                : null
                                                            }
                                                        </h4>
                                                        <div className="NurseryGallery__count-buttons">
                                                            {!!selectedImages.length &&
                                                                <span onClick={handleDelete}>Удалить</span>
                                                            }
                                                            {!!images.length &&
                                                                <span onClick={onSelectAll}>
                                                                    {!!selectedImages.length && allSelected
                                                                        ? 'Снять выделение'
                                                                        : 'Выбрать все фотографии'
                                                                    }
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
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
                                                            match={match}
                                                            backdropClosesModal={true}
                                                            onSelectImage={onSelectImage}
                                                        />
                                                    </InfiniteScroll>
                                                </>
                                            }
                                        </Card>
                                        {showAlert && <Alert {...showAlert} />}
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </Layout>
            }
        </AuthOrLogin>
    )
};

export default React.memo(connectAuthVisible(UserPhotosEdit));