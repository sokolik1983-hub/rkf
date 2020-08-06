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
import StickyBox from "react-sticky-box";
import Aside from "components/Layouts/Aside";
import ClubUserHeader from "../../components/redesign/UserHeader";
import FloatingMenu from 'pages/Club/components/FloatingMenu';
import shorten from "utils/shorten";
import "../Club/index.scss";

const ClubGallery = ({ isAuthenticated, is_active_profile, profile_id, match }) => {
    const [clubInfo, setClubInfo] = useState(null);
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
            setClubInfo(data);
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
        <>
            {!loaded
                ? <Loading />
                : <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <Card className="club-page__content-banner">
                                        <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                    </Card>
                                    <div className="club-page__mobile-only">
                                        <ClubUserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                        />
                                    </div>
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
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="club-page__info-inner">
                                            <ClubUserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                            />
                                            <div className="club-page__copy-wrap">
                                                <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                                <p>Политика обработки персональных данных</p>
                                            </div>
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                            <FloatingMenu
                                alias={clubInfo.club_alias}
                                profileId={clubInfo.id}
                                name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                            />
                        </Container>
                    </div>
                </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

export default connectAuthVisible(React.memo(ClubGallery));