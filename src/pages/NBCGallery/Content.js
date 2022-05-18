import React, {useState} from "react";
import UserHeader from "../../components/redesign/UserHeader";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../../components/Card';
import Loading from "../../components/Loading";
import { DEFAULT_IMG } from "../../appConfig";
import { Gallery, AddPhotoModal } from "../../components/Gallery";
import Alert from "../../components/Alert";

const Content = ({
                     canEdit,
                     alias,
                     handleAlbumDelete,
                     getImages,
                     getNextImages,
                     getAlbums,
                     params,
                     images,
                     album,
                     showAlert,
                     imagesLoading,
                     hasMore,
                     pageLoaded,
                     albums,
                     location,
                     nbcInfo,
                     nbcProfileId,
                     isAuthenticated,
                     onSubscriptionUpdate,
                     isMobile,
                 }) => {
    const [showModal, setShowModal] = useState(false);

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

    return (
        <>
            <Card>
                <div className="nbc-page__breadcrumbs">
                    <div className="nbc-page__breadcrumbs-title">
                        {album ? <><Link className="btn-backward" to={`/nbc/${alias}/gallery`}>Фотогалерея</Link> / {album.name}</> : 'Фотогалерея'}
                    </div>
                </div>
                <div className="nbc-page__buttons">
                    {album && canEdit && <Link className="nbc-page__buttons-link" to={`/nbc/${alias}/gallery/${params.album}/edit`}>
                        <div className="nbc-page__buttons-link__icon">
                            <svg width="15" height="15" viewBox="0 0 19 19" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725L17.71 4.0425ZM0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z" />
                            </svg>
                        </div>
                        Редактировать
                    </Link>}
                    {album && canEdit && album.addition && <>
                                                    <span className="nbc-page__buttons-link" onClick={() => handleAlbumDelete(params.album)}>
                                                        <div className="nbc-page__buttons-link__icon">
                                                            <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                                            </svg>
                                                        </div>
                                                        Удалить
                                                    </span>
                        <span className="nbc-page__buttons-link" onClick={() => handleAddPhoto()}>
                                                        <div className="nbc-page__buttons-link__icon">
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
                            <div className="nbc-page__no-images">
                                <h4>Изображений больше нет</h4>
                                <img src={DEFAULT_IMG.emptyGallery} alt="Изображений больше нет" />
                            </div>
                        }
                    >
                        <Gallery
                            items={images}
                            albums={albums}
                            album={album}
                            match={location.pathname}
                            backdropClosesModal={true}
                            enableImageSelection={false}
                            getAlbums={getAlbums}
                            getImages={getImages}
                            canEdit={canEdit}
                            alias={alias}
                            isNBC
                        />
                    </InfiniteScroll>
                }
            </Card>
            {showAlert && <Alert {...showAlert} />}
            {showModal && <AddPhotoModal showModal={showModal} onModalClose={(e) => onModalClose(e)} albumId={album.id} onSuccess={onImageAddSuccess} />}
        </>
    )
};

export default Content;