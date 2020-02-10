import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layout/Container";
import TopComponent from "./components/TopComponent";
import ExhibitionsComponent from "./components/Exhibitions";
import AboutComponent from "./components/About";
import NewsComponent from "./components/News";
import PhotoComponent from "./components/Photo";
import MenuComponent from "./components/Menu";
import ContactsComponent from "./components/Contacts";
import DocumentsComponent from "./components/Documents";
import MembersComponent from "./components/Members";
import "./index.scss";


const RKF = () => (
    <Layout>
        <div className="rkf-page">
            <Container className="content rkf-page__content">
                <TopComponent/>
                <div className="rkf-page__banner">
                    <img src="/static/images/rkf/banner-rkf.svg" alt="banner"/>
                </div>
                <ExhibitionsComponent/>
                <div className="rkf-page__info">
                    <div className="rkf-page__right">
                        <AboutComponent/>
                        <NewsComponent/>
                    </div>
                    <aside className="rkf-page__left">
                        <PhotoComponent/>
                        <MenuComponent/>
                        <ContactsComponent/>
                        <DocumentsComponent/>
                        <MembersComponent/>
                    </aside>
                </div>
            </Container>
        </div>
    </Layout>
);

export default React.memo(RKF);