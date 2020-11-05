import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import StickyBox from "react-sticky-box";
import NotConfirmed from "../NotConfirmed";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserHeader from "../../components/redesign/UserHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import UserContacts from "../../components/redesign/UserContacts";
import UserDescription from "../../components/redesign/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import ClubUserNews from "./components/ClubUserNews";
import MenuComponent from "../../components/MenuComponent";
import { Request } from "../../utils/request";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import "./index.scss";


const ClubPage = ({ history, match, profile_id, is_active_profile, isAuthenticated, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + match.params.route
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}`);
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
        }))();
        return () => setNeedRequest(true);
    }, [match]);

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="404" /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <Card className="club-page__content-banner">
                                        {
                                            clubInfo.is_active
                                                ? <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                                : <div className="club-page__content-banner-inactive" />
                                        }
                                    </Card>
                                    {isMobile &&
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                        />
                                    }
                                    <UserDescription description={clubInfo.description} />
                                    <UserContacts {...clubInfo} />
                                    <div className="club-page__exhibitions">
                                        <ExhibitionsComponent alias={clubInfo.club_alias} />
                                    </div>
                                    {isMobile &&
                                        <>
                                            <UserPhotoGallery
                                                alias={clubInfo.club_alias}
                                                pageLink={`/${clubInfo.club_alias}/gallery`}
                                                canEdit={canEdit}
                                            />
                                            <UserVideoGallery
                                                alias={clubInfo.club_alias}
                                                pageLink={`/${clubInfo.club_alias}/video`}
                                                canEdit={canEdit}
                                            />
                                        </>
                                    }
                                    {canEdit &&
                                        <AddArticle
                                            id={clubInfo.id}
                                            logo={clubInfo.logo_link}
                                            setNeedRequest={setNeedRequest}
                                        />
                                    }
                                    <ClubUserNews
                                        user="club"
                                        canEdit={canEdit}
                                        alias={match.params.route}
                                        needRequest={needRequest}
                                        setNeedRequest={setNeedRequest}
                                    />
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
                                                <>
                                                    <UserHeader
                                                        user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                        logo={clubInfo.logo_link}
                                                        name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                        alias={clubInfo.club_alias}
                                                        profileId={clubInfo.id}
                                                        federationName={clubInfo.federation_name}
                                                        federationAlias={clubInfo.federation_alias}
                                                    />
                                                    <UserPhotoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/${clubInfo.club_alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/${clubInfo.club_alias}/video`}
                                                        canEdit={canEdit}
                                                    />
                                                    <CopyrightInfo />
                                                </>
                                            }
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                            {isMobile &&
                                <MenuComponent
                                    alias={clubInfo.club_alias}
                                    user={user}
                                    profileId={clubInfo.id}
                                    noCard={true}
                                />
                            }
                        </Container>
                    </div>
                </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));