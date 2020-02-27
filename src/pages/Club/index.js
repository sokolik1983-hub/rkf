import React, {useEffect, useState} from "react";
import ClubNotActive from "./Components/ClubNotActive";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import MenuComponent from "../../components/MenuComponent";
import ClubHeader from "./Components/ClubHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import ClubInfo from "./Components/ClubInfo";
import ClubDescription from "./Components/ClubDescription";
import AddArticle from "../../components/AddArticleComponent";
import ClubNews from "./Components/ClubNews";
import {mainClub} from "../../appConfig";
import {Request} from "../../utils/request";
import {endpointGetClubInfo} from "./config";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const ClubPage = ({match, profile_id, isAuthenticated}) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + match.params.route
        }, data => {
            setClubInfo(data);
            setCanEdit(isAuthenticated && profile_id === data.id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [match]);

    return loading ?
        <Loading /> :
        error ?
            error.status === 422 ?
                <ClubNotActive /> :
                <PageNotFound /> :
            <Layout>
                <Container className="content club-page">
                    <ClubHeader
                        clubLogo={clubInfo.logo_link}
                        clubImg={clubInfo.headliner_link}
                        clubName={clubInfo.name}
                        canEdit={canEdit}
                    />
                    <ExhibitionsComponent alias={clubInfo.club_alias}/>
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
                            <MenuComponent alias="club" 
                                name={mainClub.name}
                                btnName={mainClub.btnName}
                                btnHref={mainClub.btnHref}
                                items={mainClub.children}>
                            </MenuComponent>
                            <ClubInfo {...clubInfo} />
                        </Aside>
                    </div>
                </Container>
            </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));