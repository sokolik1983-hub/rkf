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
import CopyrightInfo from "../../components/CopyrightInfo";
import useIsMobile from "../../utils/useIsMobile";

import "./index.scss";


const RKF = ({isAuthenticated, profile_id}) => {
    const [info, setInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        (() => Request({
            url: '/api/Club/public/rkf'
        }, data => {
            setInfo(data);
            setCanEdit(isAuthenticated && profile_id === data.id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    const onSubscriptionUpdate = (subscribed) => {
        setInfo({
            ...info,
            subscribed: subscribed
        })
    }

    if(!loading && !info) return <PageNotFound/>;

    return loading ?
        <Loading/> :
        <Layout>
            <div className="rkf-page">
                <Container className="content rkf-page__content">
                    <TopComponent
                        logo={info.logo || "/static/images/header/rkf-logo-transparent.svg"}
                        name={info.name || "Российская Кинологическая Федерация"}
                        banner_link={info.header_picture_link}
                        withSubscribe={true}
                        subscribed={true}
                        subscribed_id={info.id}
                        member={true}
                        onSubscriptionUpdate={onSubscriptionUpdate}
                    />
                    <div className="rkf-page__banner">
                        <img src="/static/images/slider/1.jpg" alt="banner"/>
                    </div>
                    <ExhibitionsComponent alias="rkf"/>
                    <div className="rkf-page__photo _mobile">
                        <PhotoComponent
                            photo={info.owner_photo || "/static/images/rkf/photo.png"}
                            name={info.owner_name || "Голубев Владимир Семенович"}
                            position={info.owner_position || "Президент Российской Кинологической Федерации"}
                        />
                        {!isMobile && <MenuComponent
                            alias='rkf'
                            name={info.name}
                            isFederation
                        />}
                    </div>
                    <div className="rkf-page__info">
                        {!isMobile && <aside className="rkf-page__left">
                            <PhotoComponent
                                photo={info.owner_photo || "/static/images/rkf/photo.png"}
                                name={info.owner_name || "Голубев Владимир Семенович"}
                                position={info.owner_position || "Президент Российской Кинологической Федерации"}
                            />
                            {!isMobile && <MenuComponent
                                alias='rkf'
                                name={info.name}
                                isFederation
                            />}
                            <ContactsComponent {...info}/>
                            {info.documents && !!info.documents.length && <DocumentsComponent documents={info.documents}/>}
                            {info.members && !!info.members.length && <MembersComponent members={info.members}/>}
                            <CopyrightInfo withSocials={true} />
                        </aside>}
                        {isMobile && <aside className="rkf-page__left">
                            <PhotoComponent
                                photo={info.owner_photo || "/static/images/rkf/photo.png"}
                                name={info.owner_name || "Голубев Владимир Семенович"}
                                position={info.owner_position || "Президент Российской Кинологической Федерации"}
                            />
                            {info.description && <AboutComponent description={info.description}/>}
                            <ContactsComponent {...info}/>
                            {info.documents && !!info.documents.length && <DocumentsComponent documents={info.documents}/>}
                            {info.members && !!info.members.length && <MembersComponent members={info.members}/>}
                            <CopyrightInfo withSocials={true} />
                        </aside>
                        }
                        <div className="rkf-page__right">
                            {!isMobile && info.description && <AboutComponent description={info.description}/>}
                            <NewsComponent
                                alias="rkf"
                                page={page}
                                setPage={setPage}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                                canEdit={canEdit}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </Layout>
};

export default React.memo(connectAuthVisible(RKF));
