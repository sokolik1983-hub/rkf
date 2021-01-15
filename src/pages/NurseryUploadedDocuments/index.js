import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StickyBox from "react-sticky-box";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Aside from "components/Layouts/Aside";
import Loading from "components/Loading";
import Alert from "components/Alert";
import CopyrightInfo from "../../components/CopyrightInfo";
import UserHeader from "../../components/redesign/UserHeader";
import UserMenu from "../../components/Layouts/UserMenu";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import UploadedDocuments from "components/UploadedDocuments";
import { kennelNav } from "../Nursery/config";
import BreedsList from "../../components/BreedsList";
import "./styles.scss";
import "pages/Nursery/index.scss";


const NurseryUploadedDocuments = ({ location, isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [nursery, setNursery] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const params = useParams();
    const alias = match.params.route;
    const isMobile = useIsMobile();

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([!nursery && getNursery()])
            .then(() => {
                setPageLoaded(true);
            });
    }, []);

    const getNursery = () => {
        return Request({
            url: '/api/nurseries/nursery/public/' + params.route
        }, data => {
            setNursery(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => handleError(error));
    };

    const handleError = e => {
        let errorText;
        if (e.response) {
            errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
        } else {
            errorText = 'запрос не выполнен'
        }
        setShowAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setShowAlert(false)
        });
    };

    const onSubscriptionUpdate = (subscribed) => {
        setNursery({
            ...nursery,
            subscribed: subscribed
        })
    }

    return (
        <>
            {!pageLoaded && !nursery
                ? <Loading />
                : <Layout setNotificationsLength={setNotificationsLength}>
                    <div className="redesign">
                        <Container className="content nursery-page">
                            <div className="nursery-page__content-wrap">
                                <div className="nursery-page__content">
                                    {isMobile &&
                                        <>
                                            <UserHeader
                                                user="nursery"
                                                logo={nursery.logo_link}
                                                name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                alias={alias}
                                                profileId={nursery.id}
                                                federationName={nursery.federation_name}
                                                federationAlias={nursery.federation_alias}
                                                active_rkf_user={nursery.active_rkf_user}
                                                active_member={nursery.active_member}
                                                canEdit={canEdit}
                                                subscribed={nursery.subscribed}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                            {nursery.breeds && !!nursery.breeds.length &&
                                                <BreedsList breeds={nursery.breeds} />
                                            }
                                        </>
                                    }
                                    <div className="UploadedDocuments">
                                        {
                                            !pageLoaded
                                                ? <Loading centered={false} />
                                                : <UploadedDocuments location={location} match={match} canEdit={canEdit} />
                                        }
                                    </div>
                                </div>
                                <Aside className="nursery-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="nursery-page__info-inner">
                                            {!isMobile &&
                                                <UserHeader
                                                    user="nursery"
                                                    logo={nursery.logo_link}
                                                    name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
                                                    alias={alias}
                                                    profileId={nursery.id}
                                                    federationName={nursery.federation_name}
                                                    federationAlias={nursery.federation_alias}
                                                    active_rkf_user={nursery.active_rkf_user}
                                                    active_member={nursery.active_member}
                                                    canEdit={canEdit}
                                                    subscribed={nursery.subscribed}
                                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                                    isAuthenticated={isAuthenticated}
                                                />
                                            }
                                            <UserMenu userNav={canEdit
                                                ? kennelNav(alias) // Show NewsFeed menu item to current user only
                                                : kennelNav(alias).filter(i => i.id !== 2)}
                                                notificationsLength={notificationsLength}
                                            />
                                            {!isMobile &&
                                                <>
                                                    {nursery.breeds && !!nursery.breeds.length &&
                                                        <BreedsList breeds={nursery.breeds} />
                                                    }
                                                    <UserPhotoGallery
                                                        alias={alias}
                                                        pageLink={`/kennel/${alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={alias}
                                                        pageLink={`/kennel/${alias}/video`}
                                                        canEdit={canEdit}
                                                    />
                                                    <CopyrightInfo withSocials={true} />
                                                </>
                                            }
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                        </Container>
                    </div>
                </Layout>
            }
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

export default connectAuthVisible(React.memo(NurseryUploadedDocuments));