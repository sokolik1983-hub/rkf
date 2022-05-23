import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import AuthOrLogin from "../../Login/components/AuthOrLogin";
import Loading from "../../../components/Loading";
import {Alert, Card} from "react-bootstrap";
import {DndImageUpload, Gallery} from "../../../components/Gallery";
import declension from "../../../utils/declension";
import { DEFAULT_IMG } from "appConfig";

const Content = ({   match,
                     pageLoaded,
                     params,
                     canEdit,
                     album,
                     images,
                     selectedImages,
                     handleDelete,
                     getNextImages,
                     showAlert,
                     hasMore,
                     getImages,
                     alias,
                     onSelectImage,
                     onSelectAll,
                     imagesLoading,
                     allSelected,
                 }) => {
    return (
        <AuthOrLogin>
            <>
                {!pageLoaded
                    ? <Loading /> :
                    <div className="nbc-page__inner">
                        <Card>
                            <div className="nbc-page__breadcrumbs">
                                <div>
                                    <Link className="btn-backward" to={`/nbc/${alias}/`}> <span>&lsaquo;</span> Личная страница</Link> /
                                    <Link className="btn-backward" to={`/nbc/${alias}/gallery`}> Фотогалерея</Link>
                                    {album ? <> / <Link className="btn-backward" to={`/nbc/${alias}/gallery/${params.album}`}>{album.name}</Link></> : ''}
                                    &nbsp;/&nbsp;Редактирование
                                </div>
                            </div>
                            {canEdit &&
                                <>
                                    {album && album.addition && <DndImageUpload callback={getImages} album_id={album && album.id} />}
                                    <div className="NurseryGallery__count">
                                        <h4>
                                            {album
                                                ? selectedImages.length
                                                    ? <>Выбрано <strong>{selectedImages.length}</strong> из <strong>{album.count}</strong> фотографий</>
                                                    : <><strong>{images.length}</strong>&nbsp;{declension(images.length, ['фотография', 'фотографии', 'фотографий'])}</>
                                                : null
                                            }
                                        </h4>
                                        <div className="nbc-page__count-buttons">
                                            {!!selectedImages.length &&
                                                <span onClick={handleDelete}>
                                                    <svg width="12" height="16" viewBox="0 0 14 18" fill="#72839c" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" />
                                                    </svg>
                                                    &nbsp;Удалить
                                                </span>
                                            }
                                            {!!images.length &&
                                                <span onClick={onSelectAll}>
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
                                            <div className="nbc-page__no-images">
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
                }
                {showAlert && <Alert {...showAlert} />}
            </>
        </AuthOrLogin>
    )
};

export default Content;