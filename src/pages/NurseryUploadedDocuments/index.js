import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StickyBox from "react-sticky-box";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Aside from "components/Layouts/Aside";
import Loading from "components/Loading";
import Card from "components/Card";
import Alert from "components/Alert";
import CopyrightInfo from "../../components/CopyrightInfo";
import UserHeader from "../../components/redesign/UserHeader";
import MenuComponent from "../../components/MenuComponent";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import UploadedDocuments from "components/UploadedDocuments";
import "./styles.scss";
import "pages/Nursery/index.scss";

const NurseryUploadedDocuments = ({ location, isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [nursery, setNursery] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
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

    return (
        <>
            {!pageLoaded && !nursery
                ? <Loading />
                : <Layout>
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
                                            />
                                            {nursery.breeds && !!nursery.breeds.length &&
                                                <Card className="nursery-page__breeds">
                                                    <h4>Породы</h4>
                                                    <ul className="nursery-page__breeds-list">
                                                        {nursery.breeds.map(item =>
                                                            <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                        )}
                                                    </ul>
                                                </Card>
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
                                                    />
                                                    {nursery.breeds && !!nursery.breeds.length &&
                                                        <Card className="nursery-page__breeds">
                                                            <h4>Породы</h4>
                                                            <ul className="nursery-page__breeds-list">
                                                                {nursery.breeds.map(item =>
                                                                    <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                                )}
                                                            </ul>
                                                        </Card>
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
                                                    <CopyrightInfo />
                                                </>
                                            }
                                            {isMobile &&
                                                <MenuComponent
                                                    alias={alias}
                                                    user={user}
                                                    profileId={nursery.id}
                                                    noCard={true}
                                                />
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