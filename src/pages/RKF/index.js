import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layout/Container";
import TopComponent from "../../components/TopComponent";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import AboutComponent from "../../components/AboutComponent";
import NewsComponent from "../../components/NewsComponent";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponent from "../../components/MenuComponent";
import ContactsComponent from "../../components/ContactsComponent";
import DocumentsComponent from "../../components/DocumentsComponent";
import MembersComponent from "../../components/MembersComponent";
import {Request} from "../../utils/request";
import "./index.scss";


const RKF = () => {
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
            <div className="rkf-page">
                <Container className="content rkf-page__content">
                    <TopComponent
                        alias="rfk"
                        logo={info.logo || "/static/images/header/rkf-logo-transparent.svg"}
                        name={info.name || "Российская Кинологическая Федерация"}
                        status={info.status || "текущий статус"}
                    />
                    <div className="rkf-page__banner">
                        <img src="/static/images/rkf/banner-rkf.svg" alt="banner"/>
                    </div>
                    <ExhibitionsComponent alias="rkf"/>
                    <div className="rkf-page__info">
                        <div className="rkf-page__right">
                            {info.description && <AboutComponent description={info.description}/>}
                            <NewsComponent alias="rkf"/>
                        </div>
                        <aside className="rkf-page__left">
                            <PhotoComponent
                                photo={info.owner_photo || "/static/images/rkf/photo.png"}
                                name={info.owner_name || "Голубев Владимир Семенович"}
                                position={info.owner_position || "Президент Российской Кинологической Федерации"}
                            />
                            <MenuComponent alias="rkf"/>
                            <ContactsComponent
                                address={info.address}
                                owner_name={info.owner_name || "Голубев Владимир Семенович"}
                                contacts={info.contacts}
                                work_time={info.work_time}
                            />
                            {info.documents && !!info.documents.length && <DocumentsComponent documents={info.documents}/>}
                            {info.members && !!info.members.length && <MembersComponent members={info.members}/>}
                        </aside>
                    </div>
                </Container>
            </div>
        </Layout>
};

export default React.memo(RKF);