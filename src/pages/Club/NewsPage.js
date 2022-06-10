import React, { useEffect, useState } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import UserHeader from "../../components/redesign/UserHeader";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import { Request } from "../../utils/request";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { VideoModal } from "components/Modal";
import StickyBox from "react-sticky-box";
import useIsMobile from "../../utils/useIsMobile";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./index.scss";

const NewsPage = ({ history, match, profile_id, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [fedInfo, setFedInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const isMobile = useIsMobile(1080);
    const alias = match.params.route;

    const getFedInfo = (url) => {
        Request({
            url: url
        }, data => {
            setFedInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        });
    }

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

    const onSubscriptionUpdate = (subscribed) => {
        setClubInfo({
            ...clubInfo,
            subscribed: subscribed
        })
    }

    useEffect(() => {
        if(clubInfo && clubInfo.federation_alias) {
            let url = `/api/Club/federation_base_info?alias=` + clubInfo.federation_alias;
            getFedInfo(url)
        }
    }, [clubInfo]);

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            <Layout>
                <div className="redesign">
                    <Container className="content club-page">
                        <div className="club-page__content-wrap">
                            <div className="club-page__content">
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
                                            active_rkf_user={clubInfo.active_rkf_user}
                                            active_member={clubInfo.active_member}
                                            canEdit={canEdit}
                                            subscribed={clubInfo.subscribed}
                                            member={clubInfo.member}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                            isAuthenticated={isAuthenticated}
                                        />
                                        <UserPhotoGallery
                                            alias={clubInfo.club_alias}
                                            pageLink={`/club/${clubInfo.club_alias}/gallery`}
                                        />
                                        <UserVideoGallery
                                            alias={clubInfo.club_alias}
                                            pageLink={`/club/${clubInfo.club_alias}/video`}
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
                                <UserNews
                                    canEdit={canEdit}
                                    alias={match.params.route}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                />
                            </div>
                            <Aside className="club-page__info">
                                <StickyBox offsetTop={60}>
                                    <div className="club-page__info-inner">
                                        {!isMobile &&
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                                active_rkf_user={clubInfo.active_rkf_user}
                                                active_member={clubInfo.active_member}
                                                canEdit={canEdit}
                                                subscribed={clubInfo.subscribed}
                                                member={clubInfo.member}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                        }
                                        {!isMobile && fedInfo &&
                                            <PhotoComponent
                                                photo={fedInfo.owner_photo}
                                                name={fedInfo.owner_name}
                                                position={fedInfo.owner_position}
                                            />
                                        }
                                        {!isMobile &&
                                            <>
                                                <MenuComponentNew />
                                                <UserPhotoGallery
                                                    alias={clubInfo.club_alias}
                                                    pageLink={`/club/${clubInfo.club_alias}/gallery`}
                                                />
                                                <UserVideoGallery
                                                    alias={clubInfo.club_alias}
                                                    pageLink={`/club/${clubInfo.club_alias}/video`}
                                                />
                                                <CopyrightInfo withSocials={true} />
                                            </>
                                        }
                                    </div>
                                </StickyBox>
                            </Aside>
                        </div>
                        {showModal &&
                            <VideoModal showModal={showModal} handleClose={() => setShowModal(false)} className="VideoGallery__modal">
                                <div dangerouslySetInnerHTML={{ __html: showModal.item.iframe }} />
                            </VideoModal>}
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));