import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ls from "local-storage";
import StickyBox from "react-sticky-box";
import Loading from "components/Loading";
import Layout from "components/Layouts";
import { Redirect } from "react-router-dom";
import Container from "components/Layouts/Container";
import UserBanner from "components/Layouts/UserBanner";
import UserInfo from "components/Layouts/UserInfo";
import UserMenu from "components/Layouts/UserMenu";
import UserPhotoGallery from "components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "components/Layouts/UserGallerys/UserVideoGallery";
import Card from "components/Card";
import CopyrightInfo from "components/CopyrightInfo";
import { Request } from "utils/request";
import { connectAuthVisible } from "pages/Login/connectors";
import { endpointGetUserInfo, userNav } from "./config";
import useIsMobile from "utils/useIsMobile";
import "./index.scss";

const UserLayout = ({ profile_id, is_active_profile, isAuthenticated, children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const { route: alias, id } = useParams();
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => getUserInfo())();
    }, []);

    const getUserInfo = async needUpdateAvatar => {
        setLoading(true);

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

        setNeedRequest(true);
        setLoading(false);
    };

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="/404" /> :
            <Layout>
                <div className="user-page">
                    <Container className="user-page__content content">
                        <aside className="user-page__left">
                            <StickyBox offsetTop={66}>
                                {isMobile &&
                                    <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUserInfo} />
                                }
                                <Card>
                                    <UserInfo
                                        canEdit={canEdit}
                                        logo_link={userInfo.logo_link}
                                        share_link={`https://rkf.online/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                        alias={alias}
                                        updateInfo={getUserInfo}
                                    />
                                </Card>
                                <UserMenu userNav={canEdit
                                    ? userNav(alias) // Show NewsFeed menu item to current user only
                                    : userNav(alias).filter(i => i.id !== 2)}
                                />
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
                        <div className="user-page__right">
                            {
                                React.cloneElement(children, {
                                    isMobile,
                                    userInfo,
                                    getUserInfo,
                                    canEdit,
                                    alias,
                                    id,
                                    setNeedRequest,
                                    needRequest,
                                    setUserInfo
                                })
                            }
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(UserLayout));