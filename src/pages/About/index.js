import React, {useState} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import TopBanner from "./components/TopBanner";
import NewsComponent from "../../components/NewsComponent";
import Support from "./components/Support";
import FeedbackComponent from "./components/Feedback";
import "./index.scss";


const AboutPage = () => {
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);

    return (
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
                            canEdit={false}
                        />
                    </div>
                    <aside className="about-page__info">
                        <Support />
                        <FeedbackComponent/>
                    </aside>
                </div>
            </Container>
        </Layout>
    )
};

export default React.memo(AboutPage);