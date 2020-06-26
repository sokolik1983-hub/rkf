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
import MenuComponent from "components/MenuComponent";
import ClubInfo from "pages/Club/components/ClubInfo";
import FloatingMenu from 'pages/Club/components/FloatingMenu';
import shorten from "utils/shorten";
import "./styles.scss";

const ClubGallery = ({ isAuthenticated, is_active_profile, profile_id }) => {
    const [club, setClub] = useState(null);
    const [images, setImages] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [pagesCount, setPagesCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();

    useEffect(() => {
        Promise.all([getImages(), getClub()])
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

    const getClub = () => {
        return Request({
            url: '/api/Club/public/' + params.id
        }, data => {
            setClub(data);
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
            <Container className="content ClubGallery">
                {!loaded
                    ? <Loading />
                    : <>
                        <UserHeader
                            user="club"
                            logo={club.logo_link}
                            banner={club.headliner_link}
                            name={shorten(club.short_name || club.name || 'Имя отсутствует')}
                            federationName={club.federation_name}
                            federationAlias={club.federation_alias}
                            canEdit={canEdit}
                            editLink={`/${params.id}/edit`}
                        />
                        <div className="ClubGallery__content-wrap">
                            <div className="ClubGallery__content">
                                <Card>
                                    <div className="ClubGallery__back">
                                        <div>
                                            <Link className="btn-backward" to={`/${params.id}/`}> <span>&lsaquo;</span> Личная страница</Link> / Фотогалерея
                                </div>
                                        {canEdit &&
                                            <Link className="btn btn-primary ClubGallery__gallery-edit" to={`/${params.id}/gallery/edit`}>Редактировать галерею</Link>}
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
                            <Aside className="ClubGallery__info">
                                <MenuComponent
                                    alias={params.id}
                                    name={shorten(club.short_name || club.name || 'Имя отсутствует')}
                                />
                                <ClubInfo
                                    {...club}
                                />
                            </Aside>
                        </div>
                        <FloatingMenu
                            alias={club.club_alias}
                            profileId={club.id}
                            name={shorten(club.short_name || club.name || 'Название клуба отсутствует')}
                        />
                    </>
                }
                {showAlert && <Alert {...showAlert} />}
            </Container>
        </Layout>
    )
};

export default connectAuthVisible(React.memo(ClubGallery));