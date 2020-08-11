import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery, DndImageUpload } from "components/Gallery";
import AuthOrLogin from "pages/Login/components/AuthOrLogin";
import Button from 'components/Button';
import Alert from "components/Alert";
import { Request } from "utils/request";
import Paginator from "components/Paginator";
import { connectAuthVisible } from "../Login/connectors";
import Aside from "components/Layouts/Aside";
import StickyBox from "react-sticky-box";
import MenuComponent from "components/MenuComponent";
import ClubUserHeader from "../../components/redesign/UserHeader";
import "./styles.scss";
import "../Club/index.scss";

const ClubGalleryEdit = ({ isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClub] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [pagesCount, setPagesCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [loaded, setLoaded] = useState(false);
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
                                                        <Link className="btn-backward" to={`/${params.id}/`}> <span>&lsaquo;</span> Личная страница</Link> /
                                                        <Link className="btn-backward" to={`/${params.id}/gallery/`}> Фотогалерея</Link> / Редактирование
                                                    </div>
                                                </div>
                                                {canEdit && 
                                                <>
                                                    <DndImageUpload callback={getImages} />
                                                    <Gallery items={images} onSelectImage={onSelectImage} backdropClosesModal={true} />
                                                </>
                                                }
                                                {!!selectedImages.length
                                                    && <div className="ClubGallery__buttons">
                                                        <Button condensed className="ClubGallery__delete-button" onClick={handleDelete}>Удалить выбранные</Button>
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
                                <div className="club-page__mobile-only">
                                    <MenuComponent
                                        alias={clubInfo.club_alias}
                                        user={user}
                                        profileId={clubInfo.id}
                                        noCard={true}
                                    />
                                </div>
                            </Container>
                        </div>
                    </Layout>
                }
                {showAlert && <Alert {...showAlert} />}
            </>
        </AuthOrLogin>
    )
};

export default connectAuthVisible(React.memo(ClubGalleryEdit));