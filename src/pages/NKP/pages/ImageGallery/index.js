import React, {memo, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import Alert from "../../../../components/Alert";
import {Gallery, AddPhotoModal, DndImageUpload} from "../../../../components/Gallery";
import {Request} from "../../../../utils/request";
import declension from "../../../../utils/declension";
import "./index.scss";


const ImageGalleryPage = ({canEdit, isEditPage}) => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState(null);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const history = useHistory();
    const {alias, album: albumId} = useParams();

    useEffect(() => {
        (async () => {
            if(!albumId) {
                await getAlbums();
            }

            await getImages(1);
        })();
    }, []);

    const handleError = e => {
        let errorText;

        if (e.response) {
            errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
        } else {
            errorText = 'запрос не выполнен'
        }

        setAlertData({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setAlertData(null)
        });
    };

    const getImages = async startElem => {
        setLoading(true);

        await Request({
            url: `/api/photogallery/gallery?alias=${alias}&start_element=${startElem}${albumId ? '&album_id=' + albumId : ''}`
        }, data => {
            if(data.photos.length) {
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

                if(data.photos.length < 25) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setImages(prev => startElem === 1 ? modifiedNews : [...prev, ...modifiedNews]);
            } else {
                if (startElem === 1) {
                    setImages([]);
                }
                setHasMore(false);
            }

            setAlbum(data.album);
        }, error => handleError(error));

        setLoading(false);
    };

    const getNextImages = async () => {
        if (hasMore) {
            setStartElement(startElement + 25);
            await getImages(startElement + 25);
        }
    };

    const getAlbums = async () => {
        await Request({
            url: `/api/photogallery/albums?alias=${alias}`
        }, albums => {
            setAlbums(albums);
        }, error => handleError(error));
    };

    const deleteAlbum = async id => {
        if (window.confirm('Действительно удалить?')) {
            await Request({
                url: `/api/photogallery/albums`,
                method: 'DELETE',
                data: JSON.stringify([id])
            }, () => {
                history.push(`/nbc/${alias}/gallery`)
                // getAlbums();
            },
            error => handleError(error));
        }
    };

    const addImage = () => {
        setShowModal(true);
    };

    const onImageAddSuccess = async () => {
        setShowModal(false);
        await getImages(1);
    };

    const deleteImages = async () => {
        if (window.confirm('Вы уверены?')) {
            await Request({
                url: '/api/photogallery/gallery',
                method: 'DELETE',
                data: JSON.stringify(selectedImages.map(i => i.id))
            }, () => {
                setAlertData({
                    title: 'Успешно удалено!',
                    autoclose: 1.5,
                    onOk: () => setAlertData(null)
                });
                setSelectedImages([]);
                getImages(1);
            }, error => handleError(error));
        }
    };

    const selectImage = index => {
        const newImages = [...images];
        let image = newImages[index];

        if (image.hasOwnProperty('isSelected')) {
            image.isSelected = !image.isSelected;
        } else {
            image.isSelected = true;
        }

        setImages(newImages);
        setSelectedImages(newImages.filter(img => img.isSelected === true));
    };

    const selectAllImages = () => {
        let newImages = [...images];

        if(newImages.length === selectedImages.length) {
            newImages.forEach(img => img.isSelected = false);
        } else {
            newImages.forEach(img => img.isSelected = true);
        }

        setImages(newImages);
        setSelectedImages(newImages.filter(i => i.isSelected === true));
    };

    const onModalClose = e => {
        if(!e.target.closest('.Alert')) {
            showModal && setShowModal(false);
        }
    };

    return (
        <Card className="images-page">
            <h3 className="images-page__title">
                {isEditPage ?
                    <>
                        <Link className="btn-backward" to={`/nbc/${alias}/`}><span>&lsaquo;</span> Личная страница</Link> /&nbsp;
                        <Link className="btn-backward" to={`/nbc/${alias}/gallery`}>Фотогалерея</Link> /&nbsp;
                        {album && <><Link className="btn-backward" to={`/nbc/${alias}/gallery/${albumId}`}>{album.name}</Link> /&nbsp;</>}
                        Редактирование
                    </> :
                    album ?
                        <>
                            <Link className="btn-backward" to={`/nbc/${alias}/gallery`}>Фотогалерея</Link> / {album.name}
                        </> :
                        'Фотогалерея'
                }
            </h3>
            {!isEditPage && album && canEdit &&
                <div className="images-page__controls">
                    <Link className="images-page__control" to={`/nbc/${alias}/gallery/${album.id}/edit`}>
                        <svg width="15" height="15" viewBox="0 0 19 19" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.71 4.0425C18.1 3.6525 18.1 3.0025 17.71 2.6325L15.37 0.2925C15 -0.0975 14.35 -0.0975 13.96 0.2925L12.12 2.1225L15.87 5.8725L17.71 4.0425ZM0 14.2525V18.0025H3.75L14.81 6.9325L11.06 3.1825L0 14.2525Z" />
                        </svg>
                        <span>Редактировать</span>
                    </Link>
                    {album.addition &&
                        <>
                            <button className="images-page__control" onClick={() => deleteAlbum(album.id)}>
                                <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                </svg>
                                <span>Удалить</span>
                            </button>
                            <button className="images-page__control" onClick={addImage}>
                                <svg fill="#72839c" width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
                                </svg>
                                <span>Добавить фото</span>
                            </button>
                        </>
                    }
                </div>
            }
            {isEditPage &&
                <>
                    {album && album.addition &&
                        <DndImageUpload callback={getImages} album_id={album.id} />
                    }
                    <div className="images-page__count">
                        {album &&
                            <p>
                                {selectedImages.length ?
                                    <>Выбрано <strong>{selectedImages.length}</strong> из <strong>{album.count}</strong> фотографий</> :
                                    <><strong>{images.length}</strong>&nbsp;{declension(images.length, ['фотография', 'фотографии', 'фотографий'])}</>
                                }
                            </p>
                        }
                        <div className="images-page__count-controls">
                            {!!selectedImages.length &&
                                <button className="images-page__control" onClick={deleteImages}>
                                    <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                    </svg>
                                    <span>Удалить</span>
                                </button>
                            }
                            {!!images.length &&
                                <button className="images-page__control" onClick={selectAllImages}>
                                    <span>
                                        {selectedImages.length === images.length ?
                                            'Снять выделение' :
                                            'Выбрать все фотографии'
                                        }
                                    </span>
                                </button>
                            }
                        </div>
                    </div>
                </>
            }
            <InfiniteScroll
                dataLength={images.length}
                next={getNextImages}
                hasMore={hasMore}
                loader={loading && <Loading centered={false} />}
            >
                <Gallery
                    items={images}
                    albums={!isEditPage ? albums : []}
                    album={album}
                    getAlbums={getAlbums}
                    getImages={getImages}
                    canEdit={canEdit}
                    alias={alias}
                    isNBC
                    backdropClosesModal={true}
                    enableImageSelection={isEditPage}
                    onSelectImage={selectImage}
                />
            </InfiniteScroll>
            {alertData && <Alert {...alertData} />}
            {showModal &&
                <AddPhotoModal
                    showModal={showModal}
                    onModalClose={e => onModalClose(e)}
                    albumId={album.id}
                    onSuccess={onImageAddSuccess}
                />
            }
        </Card>
    )
};

export default memo(ImageGalleryPage);