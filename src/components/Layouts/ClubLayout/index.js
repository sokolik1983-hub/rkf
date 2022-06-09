import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import StickyBox from "react-sticky-box";
import NotConfirmed from "pages/NotConfirmed";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Aside from "components/Layouts/Aside";
import Loading from "components/Loading";
import CopyrightInfo from "components/CopyrightInfo";
import UserPhotoGallery from "components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "components/Layouts/UserGallerys/UserVideoGallery";
import UserHeader from "components/redesign/UserHeader";
import { Request } from "utils/request";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "pages/Login/connectors";
import useIsMobile from "utils/useIsMobile";
import { BANNER_TYPES } from "appConfig";
import Banner from "components/Banner";
import {connectShowFilters} from "../../../components/Layouts/connectors"
import MenuComponentNew from "../../MenuComponentNew";

import "./index.scss";

const ClubLayout = ({ history, match, profile_id, is_active_profile, isAuthenticated, user, children, setShowFilters, isOpenFilters }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile(1080);
    const alias = match.params.route;

    useEffect(() => {
        (() => getClubInfo())();
    }, []);

    const getClubInfo = async () => {
        await Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${alias}`);
            } else {
                setClubInfo(data);
                setNotActiveProfile(isAuthenticated && !is_active_profile);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        });
    };

    return loading
        ? <Loading />
        : error
            ? <Redirect to="404" />
            : notActiveProfile
                ? <NotConfirmed />
                : <Layout layoutWithFilters>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    {
                                        React.cloneElement(children, {
                                            isMobile,
                                            userInfo: clubInfo,
                                            getUserInfo: getClubInfo,
                                            canEdit,
                                            alias,
                                            id: profile_id,
                                            setNeedRequest,
                                            needRequest,
                                            setUserInfo: setClubInfo
                                        })
                                    }
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
                                                <>
                                                    <UserHeader
                                                        canEdit={canEdit}
                                                        user={alias !== 'rkf-online' && 'club'}
                                                        logo={clubInfo.logo_link}
                                                        name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                        alias={clubInfo.club_alias}
                                                        profileId={clubInfo.id}
                                                        federationName={clubInfo.federation_name}
                                                        federationAlias={clubInfo.federation_alias}
                                                        active_rkf_user={clubInfo.active_rkf_user}
                                                        active_member={clubInfo.active_member}
                                                    />
                                                    <MenuComponentNew />
                                                    <Banner type={BANNER_TYPES.clubPageUnderPhotos} />
                                                    <UserPhotoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/club/${clubInfo.club_alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/club/${clubInfo.club_alias}/video`}
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
};

export default React.memo(connectAuthVisible(connectShowFilters(ClubLayout)));
