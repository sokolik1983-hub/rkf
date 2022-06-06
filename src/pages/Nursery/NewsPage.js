import React, { useEffect, useState } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import Loading from "../../components/Loading";
import UserHeader from "../../components/redesign/UserHeader";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { VideoModal } from "components/Modal";
import StickyBox from "react-sticky-box";
import useIsMobile from "../../utils/useIsMobile";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import BreedsList from "../../components/BreedsList";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./index.scss";

const NewsPage = ({ history, match, profile_id, is_active_profile, isAuthenticated, user }) => {
    const [nursery, setNurseryInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [needRequest, setNeedRequest] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const isMobile = useIsMobile(1080);
    const alias = match.params.route;

    useEffect(() => {
        (() => Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            if (data.user_type !== 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setNurseryInfo(data);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
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
                                            <BreedsList breeds={nursery.breeds} />
                                        }
                                        <UserPhotoGallery
                                            alias={alias}
                                            pageLink={`/kennel/${alias}/gallery`}
                                        />
                                        <UserVideoGallery
                                            alias={alias}
                                            pageLink={`/kennel/${alias}/video`}
                                        />
                                    </>
                                }
                                {canEdit &&
                                    <AddArticle
                                        id={nursery.id}
                                        logo={nursery.logo_link}
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
                            <Aside className="nursery-page__info">
                                <StickyBox offsetTop={60}>
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
                                            />
                                        }
                                        {!isMobile &&
                                        <MenuComponentNew />}
                                        {!isMobile &&
                                            <>
                                                {nursery.breeds && !!nursery.breeds.length &&
                                                    <BreedsList breeds={nursery.breeds} />
                                                }
                                                <UserPhotoGallery
                                                    alias={alias}
                                                    pageLink={`/kennel/${alias}/gallery`}
                                                />
                                                <UserVideoGallery
                                                    alias={alias}
                                                    pageLink={`/kennel/${alias}/video`}
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