import React, { useEffect, useState, useRef } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import UserHeader from "../../components/redesign/UserHeader";
import AddArticle from "../../components/UserAddArticle";
import FloatingMenu from "./components/FloatingMenu";
import ClubUserNews from "./components/ClubUserNews";
import UserGallery from "../../components/redesign/UserGallery";
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import StickyBox from "react-sticky-box";
import useWindowSize from "../../utils/useWindowSize";
import "./index.scss";


const NewsPage = ({ history, match, profile_id, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const windowSize = useWindowSize();
    const galleryRef = useRef(null);
    const galleryHolderRef = useRef(null);
    const mobileGalleryHolderRef = useRef(null);

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

    useEffect(() => appendUserGallery(), [[], windowSize.width]);

    const appendUserGallery = () => {
        if (windowSize.width <= 990) {
            const el = mobileGalleryHolderRef.current;
            el && !el.childElementCount && el.appendChild(galleryRef.current)
        } else {
            const el = galleryHolderRef.current
            el && !el.childElementCount && el.appendChild(galleryRef.current)
        }
    };

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
                                <div className="club-page__mobile-only">
                                    <UserHeader
                                        user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                        logo={clubInfo.logo_link}
                                        name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                        alias={clubInfo.club_alias}
                                        profileId={clubInfo.id}
                                        federationName={clubInfo.federation_name}
                                        federationAlias={clubInfo.federation_alias}
                                    />
                                </div>
                                <div ref={mobileGalleryHolderRef} />
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
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                        />
                                        <div ref={galleryHolderRef}>
                                            <div ref={galleryRef}><UserGallery alias={clubInfo.club_alias} /></div>
                                        </div>
                                        <div className="club-page__copy-wrap">
                                            <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                            <p>Политика обработки персональных данных</p>
                                        </div>
                                    </div>
                                </StickyBox>
                            </Aside>
                        </div>
                        <FloatingMenu
                            alias={clubInfo.club_alias}
                            profileId={clubInfo.id}
                            name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                        />
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));