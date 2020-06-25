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
import Aside from "components/Layouts/Aside";
import UserHeader from "components/UserHeader";
import UserMenu from "pages/Nursery/components/UserMenu";
import NurseryInfo from "pages/Nursery/components/NurseryInfo";
import "./styles.scss";

const NurseryGallery = ({ isAuthenticated, is_active_profile, profile_id }) => {
    const [nursery, setNursery] = useState(null);
    const [images, setImages] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [pagesCount, setPagesCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();

    useEffect(() => {
        Promise.all([getImages(), getNursery()])
            .then(() => setLoaded(true));
    }, []);

    const getImages = (page = 0) => {
        return Request({
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
                                            <Link className="btn-backward" to={`/nursery/${params.id}/`}> <span>&lsaquo;</span> Личная страница</Link> / Фотогалерея
                                </div>
                                        {canEdit &&
                                            <Link className="btn btn-primary NurseryGallery__gallery-edit" to={`/nursery/${params.id}/gallery/edit`}>Редактировать галерею</Link>}
                                    </div>

                                    <Gallery items={images} backdropClosesModal={true} enableImageSelection={false} />
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
    )
};

export default connectAuthVisible(React.memo(NurseryGallery));