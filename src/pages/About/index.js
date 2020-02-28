import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import TopBanner from "./components/TopBanner";
import NewsComponent from "../../components/NewsComponent";
import Support from "./components/Support";
import FeedbackComponent from "./components/Feedback";
import DocumentsComponent from "../../components/DocumentsComponent";
import {Request} from "../../utils/request";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const AboutPage = ({isAuthenticated, profile_id}) => {
    const [info, setInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: '/api/Club/rkf_base_info'
        }, data => {
            setInfo(data);
            setCanEdit(isAuthenticated && profile_id === data.id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading/> :
        <Layout>
            <TopBanner/>
            <Container className="about-page__content">
                <h2>Обновления платформы</h2>
                <div className="about-page__content-wrap">
                    <div className="about-page__news">
                        <NewsComponent
                            alias="rkf-online"
                            page={page}
                            setPage={setPage}
                            needRequest={needRequest}
                            setNeedRequest={setNeedRequest}
                            canEdit={canEdit}
                        />
                    </div>
                    <aside className="about-page__info">
                        <Support />
                        <FeedbackComponent/>
                        {info.documents && !!info.documents.length &&
                            <DocumentsComponent documents={info.documents}/>
                        }
                    </aside>
                </div>
            </Container>
        </Layout>
};

export default React.memo(connectAuthVisible(AboutPage));