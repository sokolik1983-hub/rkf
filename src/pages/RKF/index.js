import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
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
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const RKF = ({isAuthenticated, profile_id}) => {
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

    if(!loading && !info) return <PageNotFound/>;

    return loading ?
        <Loading/> :
        <Layout>
            <div className="rkf-page">
                <Container className="content rkf-page__content">
                    <TopComponent
                        logo={info.logo || "/static/images/header/rkf-logo-transparent.svg"}
                        name={info.name || "Российская Кинологическая Федерация"}
                        canEdit={canEdit}
                    />
                    <div className="rkf-page__banner">
                        <img src="/static/images/rkf/banner-rkf.svg" alt="banner"/>
                    </div>
                    <ExhibitionsComponent alias="rkf"/>
                    <div className="rkf-page__info">
                        <div className="rkf-page__right">
                            {info.description && <AboutComponent description={info.description}/>}
                            <NewsComponent
                                alias="rkf"
                                page={page}
                                setPage={setPage}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                                canEdit={canEdit}
                            />
                        </div>
                        <aside className="rkf-page__left">
                            <PhotoComponent
                                photo={info.owner_photo || "/static/images/rkf/photo.png"}
                                name={info.owner_name || "Голубев Владимир Семенович"}
                                position={info.owner_position || "Президент Российской Кинологической Федерации"}
                            />
                            <MenuComponent alias="rkf" name={info.name} btnName="Страница РКФ"/>
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

export default React.memo(connectAuthVisible(RKF));