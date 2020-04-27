import React, { useEffect, useState } from "react";
import NotConfirmed from "../NotConfirmed";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import MenuComponent from "../../components/MenuComponent";
import ClubHeader from "./components/ClubHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import Disclaimer from "components/Disclaimer";
import ClubInfo from "./components/ClubInfo";
import ClubDescription from "./components/ClubDescription";
import AddArticle from "../../components/AddArticleComponent";
import ClubNews from "./components/ClubNews";
import FloatingMenu from './components/FloatingMenu';
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const ClubPage = ({ match, profile_id, is_active_profile, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + match.params.route
        }, data => {
            setClubInfo(data);
            setNotActiveProfile(isAuthenticated && !is_active_profile);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            setLoading(false);
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
            <PageNotFound /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <Container className="content club-page">
                        <ClubHeader
                            clubLogo={clubInfo.logo_link}
                            clubImg={clubInfo.headliner_link}
                            clubName={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                            federationName={clubInfo.federation_name}
                            federationAlias={clubInfo.federation_alias}
                            canEdit={canEdit}
                        />
                        <Disclaimer>
                            <a className="Disclaimer__support-link" href="http://support.rkf.online/%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d0%b4%d0%be%d0%b1%d0%b0%d0%b2%d0%bb%d0%b5%d0%bd%d0%b8%d1%8e-%d0%bd%d0%be%d0%b2%d0%be%d1%81%d1%82%d0%b8-%d0%bd%d0%b0-%d1%81-2/" target="_blank" rel="noopener noreferrer">
                                Инструкция по добавлению новости на странице клуба
                            </a>
                        </Disclaimer>
                        <ExhibitionsComponent alias={clubInfo.club_alias} />
                        <div className="club-page__content-wrap">
                            <div className="club-page__content">
                                <ClubDescription description={clubInfo.description} />
                                {canEdit &&
                                    <AddArticle
                                        clubId={clubInfo.id}
                                        logo={clubInfo.logo_link}
                                        setPage={setPage}
                                        setNeedRequest={setNeedRequest}
                                    />
                                }
                                <ClubNews
                                    clubId={clubInfo.id}
                                    alias={match.params.route}
                                    page={page}
                                    setPage={setPage}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                />
                            </div>
                            <Aside className="club-page__info">
                                <MenuComponent
                                    alias={clubInfo.club_alias}
                                    name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                                />
                                <ClubInfo {...clubInfo} />
                            </Aside>
                        </div>
                        <FloatingMenu
                            alias={clubInfo.club_alias}
                            name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                        />
                    </Container>
                </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));