import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { Link, useParams } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery } from "components/Gallery";
import Alert from "components/Alert";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import Paginator from "components/Paginator";
import "./styles.scss";

const ClubGallery = ({ isAuthenticated, is_active_profile, profile_id }) => {
    const [images, setImages] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [pagesCount, setPagesCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();

    useEffect(() => {
        getImages();
        Request({
            url: '/api/Club/public/' + params.id
        }, data => {
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => handleError(error));
    }, []);

    const getImages = (page = 0) => {
        setLoaded(false);
        Request({
            url: `/api/photogallery/gallery?elemCount=25${page ? '&pageNumber=' + page : ''}`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    width: p.small_photo.width,
                    height: p.small_photo.height,
                    caption: p.caption
                }
            }));
            setPagesCount(data.page_count);
            setCurrentPage(data.page_current);
            setLoaded(true);
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

    return (
        <Layout>
            <Container className="content ClubGallery">
                {!loaded
                    ? <Loading />
                    : <>
                        <Card>
                            <h3 className="ClubGallery__title">Фотогалерея
                            {canEdit && <Link className="btn btn-primary ClubGallery__gallery-edit" to={`/${params.id}/gallery/edit`}>Редактировать</Link>}
                            </h3>

                            <Gallery items={images} backdropClosesModal={true} enableImageSelection={false} />
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
    )
};

export default connectAuthVisible(React.memo(ClubGallery));