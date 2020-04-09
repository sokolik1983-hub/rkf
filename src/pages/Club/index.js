import React, {useEffect, useState} from "react";
import NotConfirmed from "../NotConfirmed";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import MenuComponent from "../../components/MenuComponent";
import UserHeader from "../../components/UserHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import ClubInfo from "./components/ClubInfo";
import UserDescription from "../../components/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/UserNews";
import FloatingMenu from './components/FloatingMenu';
import {Request} from "../../utils/request";
import shorten from "../../utils/shorten";
import {endpointGetClubInfo} from "./config";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const ClubPage = ({match, profile_id, is_active_profile, isAuthenticated}) => {
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
                    <NotConfirmed/> :
                    <Layout>
                        <Container className="content club-page">
                            <UserHeader
                                logo={clubInfo.logo_link}
                                banner={clubInfo.headliner_link}
                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                federationName={clubInfo.federation_name}
                                federationAlias={clubInfo.federation_alias}
                                canEdit={canEdit}
                                editLink="/client"
                            />
                            <ExhibitionsComponent alias={clubInfo.club_alias} />
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <UserDescription description={clubInfo.description} />
                                    {canEdit &&
                                        <AddArticle
                                            id={clubInfo.id}
                                            logo={clubInfo.logo_link}
                                            setPage={setPage}
                                            setNeedRequest={setNeedRequest}
                                        />
                                    }
                                    <UserNews
                                        canEdit={canEdit}
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