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
import { endpointGetUserInfo } from "components/Layouts/UserLayout/config";
import useIsMobile from "utils/useIsMobile";
import UserPhotoGallery from "components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "components/CopyrightInfo";
import ls from "local-storage";
import {connectShowFilters} from "../../components/Layouts/connectors";
import UploadedDocuments from "components/UploadedDocuments";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./styles.scss";

const UserUploadedDocuments = ({ history, location, match, profile_id, is_active_profile, isAuthenticated, setShowFilters }) => {
    const [loaded, setLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const alias = match.params.alias;
    const isMobile = useIsMobile(1080);
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

    const onSubscriptionUpdate = (subscribed) => {
        setUserInfo({
            ...userInfo,
            subscribed: subscribed
        })
    };

    useEffect(() => {
        setShowFilters({withFilters: true});
    }, []);

    return (!loaded
        ? <Loading />
        : errorRedirect
            ? <Redirect to="/404" />
            : <Layout layoutWithFilters>
                <Container className="UserUploadedDocuments content">
                    <aside className="UserUploadedDocuments__left">
                        <StickyBox offsetTop={60}>
                            {isMobile &&
                                <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUser} />
                            }
                            <Card>
                                <UserInfo
                                    canEdit={canEdit}
                                    logo_link={userInfo.logo_link}
                                    share_link={`${window.location.host}/user/${alias}`}
                                    first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                    last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    alias={alias}
                                    subscribed={userInfo.subscribed}
                                    subscribed_id={userInfo.profile_id}
                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                    updateInfo={getUser}
                                    judgeInfo={userInfo.open_roles}
                                />
                            </Card>
                            {!isMobile &&
                                <>
                                    <MenuComponentNew />
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
                                    <CopyrightInfo withSocials={true} />
                                </>
                            }
                        </StickyBox>
                    </aside>
                    <div className="UserUploadedDocuments__right">
                        {!loaded
                            ? <Loading />
                            : <UploadedDocuments location={location} match={match} canEdit={canEdit} />
                        }
                    </div>
                </Container>
            </Layout>
    )
};

export default React.memo(connectShowFilters(connectAuthVisible(UserUploadedDocuments)));