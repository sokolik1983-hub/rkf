import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation, useParams, withRouter } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { compose } from "redux";
import { useSelector } from "react-redux";
import ls from "local-storage";
import { endpointGetNBCInfo } from "./config";
import Aside from "../Aside";
import reducer from "../reducer";
import Container from "../Container";
import UserBanner from "../UserBanner";
import { connectShowFilters } from "../connectors";
import UserVideoGallery from "../UserGallerys/UserVideoGallery";
import UserPhotoGallery from "../UserGallerys/UserPhotoGallery";
import Banner from "../../Banner";
import Loading from "../../Loading";
import UserHeader from "../../redesign/UserHeader";
import CopyrightInfo from "../../CopyrightInfo";
import PhotoComponent from "../../PhotoComponent";
import MenuComponentNew from "../../MenuComponentNew";
import { defaultValues } from "../../../pages/NBCEdit/config";
import { connectAuthVisible } from "../../../pages/Login/connectors";
import { BANNER_TYPES } from "../../../appConfig";
import { Request } from "../../../utils/request";
import useIsMobile from "../../../utils/useIsMobile";
import injectReducer from "../../../utils/injectReducer";

import "./index.scss";


const NBCLayout = ({ newsFeed, ...props } ) => {
    const { children, login_page, setShowFilters, layoutWithFilters } = props;
    const [loading, setLoading] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [nbcInfo, setNBCInfo] = useState(null);
    const [nbcProfileId, setNBCProfileId] = useState(null);
    const [album, setAlbum] = useState(null);
    const [needRequest, setNeedRequest] = useState(true);
    const isMobile = useIsMobile(1080);
    const [canEdit, setCanEdit] = useState(false);
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    const history = useHistory();
    const [hasMore, setHasMore] = useState(true);
    const [startElement, setStartElement] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [albums, setAlbums] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const isOpenFilters = useSelector(state => state.layout.isOpenFilters)

    const { alias } = useParams();
    const aliasRedux = useSelector(state => state?.authentication?.user_info?.alias);
    const params = useParams();
    const location = useLocation();
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [success, setSuccess] = useState(false);

    const getNBCInfo = useCallback(async () => {
        setLoading(true);
        await Request({
            url: endpointGetNBCInfo + '?alias=' + alias
        }, data => {
            setNBCInfo(data);
            setNBCProfileId(data.profile_id);
        }, error => {
            console.log(error.response);
        });
        setLoading(false);
    },[alias]);

    const getEditInfo = useCallback(async () => {
        setLoading(true)
        await Request({
            url: "/api/NationalBreedClub/edit_info?alias=" + alias
        }, data => {
            setEditInfo(data);
        }, error => {
            console.log(error.response);
        });
        setLoading(false);
    },[alias]);

    const handleAlbumDelete = async (id) => {
        if (window.confirm('Действительно удалить?')) {
            await Request({
                    url: `/api/photogallery/albums`,
                    method: 'DELETE',
                    data: JSON.stringify([id])
                }, () => {
                    history.push(`/nbc/${alias}/gallery`)
                    getAlbums();
                },
                error => handleError(error));
        }
    };

    const getImages = async startElem => {
        setImagesLoading(true);
        await Request({
            url: `/api/photogallery/gallery?alias=${alias}&start_element=${startElem}${params.album ? '&album_id=' + params.album : ''}`,
        }, data => {
            if (data.photos.length) {
                const modifiedNews = data.photos.map(photo => {
                    return {
                        id: photo.id,
                        src: photo.link,
                        thumbnail: photo.small_photo.link,
                        thumbnailWidth: photo.small_photo.width,
                        thumbnailHeight: photo.small_photo.height,
                        caption: photo.caption
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

    const getAlbums = useCallback((page = 0) => {
        setImagesLoading(true);
        return Request({
            url: `/api/photogallery/albums?alias=${alias}`,
            method: 'GET'
        }, (albums) => {
            setAlbums(albums);
            setImagesLoading(false);
        }, error => handleError(error));
    },[alias]);

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

    const onSubscriptionUpdate = (subscribed) => {
        setNBCInfo({
            ...nbcInfo,
            subscribed: subscribed
        })
    };

    const onAlbumAddSuccess = () => {
        setShowAlert({
            title: 'Информация сохранена!',
            autoclose: 2.5,
            onOk: () => setShowAlert(false)
        });
        getImages();
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены?')) {
            await Request({
                url: '/api/photogallery/gallery',
                method: 'DELETE',
                data: JSON.stringify(selectedImages.map(i => i.id))
            }, () => {
                setShowAlert({
                    title: 'Успешно удалено!',
                    autoclose: 1.5,
                    onOk: () => setShowAlert(false)
                });
                setSelectedImages([]);
                getImages(1);
            }, error => handleError(error));
        }
    };

    const onSelectImage = (index, image) => {
        let imgs = images.slice();
        let img = imgs[index];
        if (img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected;
        } else {
            img.isSelected = true;
        }
        setImages(imgs);
        setSelectedImages(imgs.filter(i => i.isSelected === true));
    };

    const onSelectAll = () => {
        let imgs = images;
        if (!allSelected) {
            imgs.forEach(img => img.isSelected = true);
        }
        else {
            imgs.forEach(img => img.isSelected = false);
        }
        setImages(imgs);
        setSelectedImages(imgs.filter(i => i.isSelected === true));
        setAllSelected(!allSelected);
    };

    const PromiseRequest = url => new Promise((res, rej) => Request({url}, res, rej));

    const getInfo = () => PromiseRequest('/api/NationalBreedClub/edit_info')
        .then(data => {
            if (data) {
                if (data.phones && data.phones.length) {
                    data.phones.map(item => {
                        if (item.contact_type_id === 1 && !/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/.test(item.value)) {
                            const valueArr = item.value.split(' ');
                            item.value = '+' + valueArr[0] + valueArr[1].slice(0, 6) + '-' + valueArr[1].slice(-2);
                        }
                        return item;
                    });
                }
                data.is_public = !data.is_public; // Backend workaround
                setInitialValues({
                    ...initialValues,
                    ...data
                });
            }
            setLoading(false);
        });

    const transformValues = values => {
        const newValues = {...values};
        delete newValues.banner;
        delete newValues.logo;
        newValues.is_public = !newValues.is_public; // Backend workaround

        return newValues;
    };

    const handleSuccess = (data, name) => {
        setSuccess(true);
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);

        let updatedUserInfo = {
            ...ls.get('user_info'),
            name
        };
        ls.set('user_info', updatedUserInfo);
        setShowAlert({
            title: 'Сохранение данных',
            text: 'Данные сохранены!',
            autoclose: 2.5,
            onOk: () => setShowAlert(false)
        });
    };

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([getImages(1), !album && getAlbums(), !nbcInfo && getNBCInfo()])
            .then(() => {
                setStartElement(1);
                setPageLoaded(true);
            });
    }, [params]);

    useEffect(() => {
        setCanEdit((aliasRedux === alias));
        getInfo();
        getEditInfo();
    }, [alias]);

    useEffect(() => {
        setShowFilters({ withFilters: layoutWithFilters, login_page: login_page, isOpen: false});
    }, []);

    return (
        loading ?
            <Loading /> :
            <div className="redesign">
                <Container className="content nbc-page">
                    <div className="nbc-page__content-wrap">
                        <Aside className="nbc-page__info">
                            <StickyBox offsetTop={60}>
                                <div className="nbc-page__info-inner">
                                    {!isMobile && nbcInfo &&
                                        <>
                                            <UserHeader
                                                user='nbc'
                                                logo={nbcInfo.logo_link}
                                                name={nbcInfo.name || 'Название НКП отсутствует'}
                                                alias={nbcInfo.alias}
                                                profileId={nbcProfileId}
                                                canEdit={canEdit}
                                                subscribed={nbcInfo.subscribed}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                            <PhotoComponent
                                                photo={nbcInfo.owner_photo}
                                                name={nbcInfo.owner_name}
                                                position={nbcInfo.owner_position}
                                                canEdit={canEdit}
                                            />
                                            <MenuComponentNew />
                                        </>
                                    }
                                    {!isMobile && nbcInfo &&
                                        <>
                                            <Banner type={BANNER_TYPES.clubPageUnderPhotos} />
                                            <UserPhotoGallery
                                                alias={alias}
                                                pageLink={`/nbc/${alias}/gallery`}
                                                canEdit={canEdit}
                                            />
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
                            {!newsFeed && location.pathname.indexOf('edit') === -1 &&
                                <UserBanner
                                    link={nbcInfo?.headliner_link}
                                    canEdit={canEdit}
                                    updateInfo={getNBCInfo}
                                />
                            }
                            {isMobile && nbcInfo && !newsFeed &&
                                <UserHeader
                                    user='nbc'
                                    logo={nbcInfo.logo_link}
                                    name={nbcInfo.name || 'Название НКП отсутствует'}
                                    alias={nbcInfo.alias}
                                    profileId={nbcProfileId}
                                    canEdit={canEdit}
                                    subscribed={nbcInfo.subscribed}
                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                    isAuthenticated={isAuthenticated}
                                />
                            }
                            {React.cloneElement(children,
                                {
                                    isMobile,
                                    nbcInfo: nbcInfo,
                                    canEdit,
                                    getNBCInfo: getNBCInfo,
                                    alias: alias,
                                    nbcProfileId: nbcProfileId,
                                    onSubscriptionUpdate: onSubscriptionUpdate,
                                    isAuthenticated,
                                    setNeedRequest: setNeedRequest,
                                    setNBCInfo: setNBCInfo,
                                    needRequest: needRequest,
                                    handleAlbumDelete: handleAlbumDelete,
                                    getImages: getImages,
                                    getNextImages: getNextImages,
                                    getAlbums: getAlbums,
                                    handleError: handleError,
                                    params: params,
                                    images: images,
                                    album: album,
                                    setStartElement: setStartElement,
                                    showAlert: showAlert,
                                    imagesLoading: imagesLoading,
                                    hasMore: hasMore,
                                    pageLoaded: pageLoaded,
                                    albums: albums,
                                    location: location,
                                    onAlbumAddSuccess: onAlbumAddSuccess,
                                    handleDelete: handleDelete,
                                    selectedImages: selectedImages,
                                    setSelectedImages: setSelectedImages,
                                    setImages: setImages,
                                    onSelectImage: onSelectImage,
                                    onSelectAll: onSelectAll,
                                    allSelected: allSelected,
                                    handleSuccess: handleSuccess,
                                    transformValues: transformValues,
                                    initialValues: initialValues,
                                    editInfo: editInfo,
                                    isOpenFilters: isOpenFilters,
                                    setShowFilters: setShowFilters,
                                }
                            )}
                        </div>
                    </div>
                </Container>
            </div>
    )
};

const withReducer = injectReducer({ key: 'layout', reducer: reducer });

export default compose(withReducer)(withRouter(React.memo(connectAuthVisible(connectShowFilters(NBCLayout)))));