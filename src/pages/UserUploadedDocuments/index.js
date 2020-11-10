import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Card from "components/Card";
import Container from "../../components/Layouts/Container";
import { Request } from "utils/request";
import { connectAuthVisible } from "pages/Login/connectors";
import StickyBox from "react-sticky-box";
import UserBanner from "components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "components/Layouts/UserMenu"
import { endpointGetUserInfo, userNav } from "pages/User/config";
import useIsMobile from "utils/useIsMobile";
import UserPhotoGallery from "components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "components/CopyrightInfo";
import ls from "local-storage";

import UploadedDocuments from "components/UploadedDocuments";


const UserUploadedDocuments = ({ history, location, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [loaded, setLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const alias = match.params.route;
    const isMobile = useIsMobile();
    const [error, setError] = useState(false);
    const [errorRedirect, setErrorRedirect] = useState(false);

    useEffect(() => {
        Promise.all([getUser()])
            .then(() => setLoaded(true))
            .catch(e => { setErrorRedirect(error && error.response ? error.response : null) });
    }, []);

    const getUser = async needUpdateAvatar => {
        await Request({
            url: endpointGetUserInfo + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
        });
    };

    return (!loaded
        ? <Loading />
        : errorRedirect
            ? <Redirect to="/404" />
            : <Layout>
                <Container className="UploadedDocuments content">
                    <aside className="UploadedDocuments__left">
                        <StickyBox offsetTop={66}>
                            {isMobile &&
                                <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUser} />
                            }
                            <Card>
                                <UserInfo
                                    canEdit={canEdit}
                                    logo_link={userInfo.logo_link}
                                    share_link={`https://rkf.online/user/${alias}`}
                                    first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                    last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    alias={alias}
                                    updateInfo={getUser}
                                />
                            </Card>
                            <UserMenu userNav={userNav(alias)} />
                            {!isMobile &&
                                <>
                                    <UserPhotoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/gallery`}
                                        canEdit={canEdit}
                                    />
                                    <UserVideoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/video`}
                                        canEdit={canEdit}
                                    />
                                    <CopyrightInfo />
                                </>
                            }
                        </StickyBox>
                    </aside>
                    <div className="UploadedDocuments__right">
                        {!loaded
                            ? <Loading />
                            : <UploadedDocuments location={location} match={match} canEdit={canEdit} />
                        }
                    </div>
                </Container>
            </Layout>
    )
};

export default React.memo(connectAuthVisible(UserUploadedDocuments));