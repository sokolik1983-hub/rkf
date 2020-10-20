import React, { useEffect, useState } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import UserHeader from "../../components/redesign/UserHeader";
import AddArticle from "../../components/UserAddArticle";
import ClubUserNews from "./components/ClubUserNews";
import MenuComponent from "../../components/MenuComponent";
import { Request } from "../../utils/request";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { VideoModal } from "components/Modal";
import StickyBox from "react-sticky-box";
import useIsMobile from "../../utils/useIsMobile";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import "./index.scss";


const NewsPage = ({ history, match, profile_id, isAuthenticated, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const isMobile = useIsMobile();
    const alias = match.params.route;

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setClubInfo(data);
                setCanEdit(isAuthenticated && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [match]);

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            <Layout>
                <div className="redesign">
                    <Container className="content club-page">
                        <div className="club-page__content-wrap">
                            <div className="club-page__content">
                                <Card className="club-page__content-banner">
                                    <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                </Card>
                                {isMobile &&
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
                                        />
                                        <UserVideoGallery
                                            alias={clubInfo.club_alias}
                                            pageLink={`/${clubInfo.club_alias}/video`}
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
                                                />
                                                <UserVideoGallery
                                                    alias={clubInfo.club_alias}
                                                    pageLink={`/${clubInfo.club_alias}/video`}
                                                />
                                                <CopyrightInfo/>
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
                        {showModal &&
                            <VideoModal showModal={showModal} handleClose={() => setShowModal(false)} className="VideoGallery__modal">
                                <div dangerouslySetInnerHTML={{ __html: showModal.item.iframe }} />
                            </VideoModal>}
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));