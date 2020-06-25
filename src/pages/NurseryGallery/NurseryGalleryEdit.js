import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { DEFAULT_IMG } from "appConfig";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery, ImageUpload } from "components/Gallery";
import AuthOrLogin from "pages/Login/components/AuthOrLogin";
import Button from 'components/Button';
import Alert from "components/Alert";
import { Request } from "utils/request";
import Paginator from "components/Paginator";
import "./styles.scss";

const NurseryGalleryEdit = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [pagesCount, setPagesCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();

    useEffect(() => {
        getImages()
    }, []);

    const getImages = (page = 0) => {
        setLoaded(false);
        Request({
            url: `/api/photogallery/gallery?alias=${params.id}&elem_count=25${page ? '&page_number=' + page : ''}`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    thumbnailWidth: p.small_photo.width,
                    thumbnailHeight: p.small_photo.height,
                    caption: p.caption
                }
            }));
            setPagesCount(data.page_count);
            setCurrentPage(data.page_current);
            setLoaded(true);
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
        Request({
            url: '/api/photogallery/gallery',
            method: "DELETE",
            data: JSON.stringify(selectedImages.map(i => i.id))
        }, () => {
            setImages(images.filter(i => !selectedImages.find(s => s.id === i.id)));
            setSelectedImages([]);
        }, error => handleError(error));
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

    return (
        <AuthOrLogin>
            <Layout>
                <Container className="content NurseryGallery">
                    {!loaded
                        ? <Loading />
                        : <>
                            <Card>
                                <div className="NurseryGallery__back">
                                    <div>
                                        <Link className="btn-backward" to={`/nursery/${params.id}/`}> <span>&lsaquo;</span> Личная страница</Link> /
                                        <Link className="btn-backward" to={`/nursery/${params.id}/gallery/`}> Фотогалерея</Link> / Редактирование
                                    </div>
                                </div>
                                <ImageUpload callback={getImages}>
                                    <div style={{ backgroundImage: `url(${DEFAULT_IMG.clubAvatar})` }} className="NurseryGallery__upload" />
                                </ImageUpload>
                                <Gallery items={images} onSelectImage={onSelectImage} backdropClosesModal={true} />
                                {!!selectedImages.length
                                    && <div className="NurseryGallery__buttons">
                                        <Button condensed className="NurseryGallery__delete-button" onClick={handleDelete}>Удалить выбранные</Button>
                                    </div>
                                }
                                <Paginator
                                    scrollToTop={false}
                                    pagesCount={pagesCount}
                                    currentPage={currentPage}
                                    setPage={page => getImages(page)}
                                />
                            </Card>
                        </>
                    }
                    {showAlert && <Alert {...showAlert} />}
                </Container>
            </Layout>
        </AuthOrLogin>
    )
};

export default React.memo(NurseryGalleryEdit);