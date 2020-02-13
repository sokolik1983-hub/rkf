import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layout/Container";
import TopBanner from "./components/TopBanner";
import Advantages from "./components/Advantages";
import NewsComponent from "../../components/NewsComponent";
import Contacts from "./components/Contacts";
import FeedbackComponent from "./components/Feedback";
import DocumentsComponent from "../../components/DocumentsComponent";
import {Request} from "../../utils/request";
import "./index.scss";


const docs = [
    {
        id: 1,
        url: 'https://yandex.ru/',
        name: 'Правила подачи документов на регистрацию в Российской кинологической федерации',
    },
    {
        id: 2,
        url: 'https://yandex.ru/',
        name: 'Правила подачи документов на регистрацию в Российской кинологической федерации',
    },
    {
        id: 3,
        url: 'https://yandex.ru/',
        name: 'Правила подачи документов на регистрацию в Российской кинологической федерации',
    }
];


const AboutPage = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: '/api/Club/rkf_base_info'
        }, data => {
            setInfo(data);
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
                <Advantages/>
                <h2>Последние обновления</h2>
                <div className="about-page__content-wrap">
                    <div className="about-page__news">
                        <NewsComponent alias="justanotherclub"/>
                    </div>
                    <aside className="about-page__info">
                        {info &&
                            <Contacts
                                contacts={info.contacts}
                                work_time={info.work_time}
                            />
                        }
                        <FeedbackComponent/>
                        {/*{info.documents && !!info.documents.length &&*/}
                            <DocumentsComponent documents={docs || info.documents}/>
                        {/*}*/}
                    </aside>
                </div>
            </Container>
        </Layout>
};

export default React.memo(AboutPage);