import React, { useEffect, useState, useRef } from "react";
import NotConfirmed from "../NotConfirmed";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import UserHeader from "../../components/redesign/UserHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import UserContacts from "../../components/redesign/UserContacts";
import UserDescription from "../../components/redesign/UserDescription";
import UserGallery from "../../components/redesign/UserGallery";
import AddArticle from "../../components/UserAddArticle";
import ClubUserNews from "./components/ClubUserNews";
import { Request } from "../../utils/request";
import MenuComponent from "../../components/MenuComponent";
import useWindowSize from "utils/useWindowSize";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import StickyBox from "react-sticky-box";
import "./index.scss";


const ClubPage = ({ history, match, profile_id, is_active_profile, isAuthenticated, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const windowSize = useWindowSize();
    const galleryRef = useRef(null);
    const galleryHolderRef = useRef(null);
    const mobileGalleryHolderRef = useRef(null);

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
                                                : <div className="club-page__content-banner-inactive">Клуб не активирован</div>
                                        }
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
                                    <UserDescription description={clubInfo.description} />
                                    <UserContacts {...clubInfo} />
                                    <div className="club-page__exhibitions">
                                        <ExhibitionsComponent alias={clubInfo.club_alias} />
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
                            <div className="club-page__mobile-only">
                                <MenuComponent
                                    alias={clubInfo.club_alias}
                                    user={user}
                                    profileId={clubInfo.id}
                                    noCard={true}
                                />
                            </div>
                        </Container>
                    </div>
                </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));