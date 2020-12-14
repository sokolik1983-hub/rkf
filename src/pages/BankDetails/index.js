import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import TopComponent from "../../components/TopComponent";
import UserMenu from "../../components/Layouts/UserMenu";
import { Link as LinkScroll } from "react-scroll";
import {clubNav} from "../Docs/config";
import {kennelNav} from "../NurseryDocuments/config";
import "./index.scss";


const BankDetails = () => {

    return (
        <Layout>
            <div className="redesign">
                <Container className="content base-search">
                    <TopComponent
                        // logo={clubData ? clubData.logo_link : ``}
                        // name={clubData ? clubData.title : ``}
                        canEdit={false}
                        withShare={false}
                    />
                    <div className="base-search__content-wrap">
                        <div className="base-search__content">
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                        <UserMenu 
                                            // userNav={clubNav(clubData.club_alias)}
                                        /> :                                    
                                    <CopyrightInfo/>
                                </div>
                            </StickyBox>
                        </Aside>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(BankDetails);