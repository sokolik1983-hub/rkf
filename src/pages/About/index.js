import React, { useState } from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import TopBanner from "./components/TopBanner";
import NewsComponent from "../../components/NewsComponent";
import Statistics from "../../components/Statistics";
import FeedbackComponent from "./components/Feedback";
import { BANNER_TYPES } from "../../appConfig";
import Banner from "../../components/Banner";
import "./index.scss";


const AboutPage = () => {
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);

    return (
        <Layout>
            <TopBanner />
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
                        <FeedbackComponent />
                        <Statistics isAboutPage />
                        <Banner type = {BANNER_TYPES.aboutRkfOnlineRightSiteBar}/>
                    </aside>
                </div>
            </Container>
        </Layout>
    )
};

export default React.memo(AboutPage);