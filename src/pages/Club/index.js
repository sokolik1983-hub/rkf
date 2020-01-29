import React, { useEffect, useState } from "react";
import ClubNotActive from "./Components/ClubNotActive";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import ClubHeader from "./Components/ClubHeader";
import ClubFutureExhibitions from "./Components/ClubFutureExhibitions";
import ClubInfo from "./Components/ClubInfo";
import ClubDescription from "./Components/ClubDescription";
import ClubAddArticle from "./Components/ClubAddArticle";
import ClubNews from "./Components/ClubNews";
import { Request } from "../../utils/request";
import { endpointGetClubInfo } from "./config";
import ls from 'local-storage';
import "./index.scss";


const ClubPage = ({ match }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + match.params.route
        }, data => {
            setClubInfo(data);
            ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
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
                        clubId={clubInfo.id}
                    />
                    <ClubFutureExhibitions clubId={clubInfo.id} />
                    <div className="club-page__content-wrap">
                        <div className="club-page__content">
                            <ClubDescription description={clubInfo.description} />
                            <ClubAddArticle
                                clubId={clubInfo.id}
                                logo={clubInfo.logo_link}
                                alias={match.params.route}
                                setPage={setPage}
                                setNeedRequest={setNeedRequest}
                            />
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
                            <ClubInfo {...clubInfo} />
                        </Aside>
                    </div>
                </Container>
            </Layout>
};

export default React.memo(ClubPage);