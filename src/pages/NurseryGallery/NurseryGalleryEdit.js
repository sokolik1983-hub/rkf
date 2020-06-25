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
import { connectAuthVisible } from "../Login/connectors";
import Aside from "components/Layouts/Aside";
import UserHeader from "components/UserHeader";
import UserMenu from "pages/Nursery/components/UserMenu";
import NurseryInfo from "pages/Nursery/components/NurseryInfo";
import "./styles.scss";

const NurseryGalleryEdit = ({ isAuthenticated, is_active_profile, profile_id }) => {
    const [nursery, setNursery] = useState(null);
    const [images, setImages] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [pagesCount, setPagesCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();

    useEffect(() => {
        Promise.all([getImages(), getNursery()])
            .then(() => setLoaded(true));
    }, []);

    const getImages = (page = 0) => {
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
                            <UserHeader
                                user="nursery"
                                logo={nursery.logo_link}
                                banner={nursery.headliner_link}
                                name={nursery.name || 'Имя отсутствует'}
                                federationName={nursery.federation_name}
                                federationAlias={nursery.federation_alias}
                                canEdit={canEdit}
                                editLink={`/nursery/${params.id}/edit`}
                            />
                            <div className="NurseryGallery__content-wrap">
                                <div className="NurseryGallery__content">
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
                                </div>
                                <Aside className="NurseryGallery__info">
                                    <UserMenu
                                        alias={params.id}
                                        name={nursery.name || 'Имя отсутствует'}
                                    />
                                    <NurseryInfo
                                        {...nursery}
                                    />
                                </Aside>
                            </div>
                        </>
                    }
                    {showAlert && <Alert {...showAlert} />}
                </Container>
            </Layout>
        </AuthOrLogin>
    )
};

export default connectAuthVisible(React.memo(NurseryGalleryEdit));