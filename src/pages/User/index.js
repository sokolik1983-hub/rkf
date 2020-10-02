import React, {useEffect, useState} from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import {Request} from "../../utils/request";
import {connectAuthVisible} from "../Login/connectors";
import {endpointGetUserInfo} from "./config";
import "./index.scss";


import UserBanner from "../UserDocuments/components/UserBanner";
import UserInfo from "../UserDocuments/components/UserInfo";
import UserMenu from "../UserDocuments/components/UserMenu";


const UserPage = ({history, match, profile_id, is_active_profile, isAuthenticated, user}) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (() => Request({
            url: endpointGetUserInfo + match.params.route
        }, data => {
            setUserInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, [match]);

    return loading ?
        <Loading/> :
        <Layout>
            <div className="user-page">
                <Container className="user-page__content content">
                    <aside className="user-page__left">
                        <StickyBox offsetTop={66}>
                            <div className="mobile-only">
                                <UserBanner headliner_link={userInfo.headliner_link}/>
                            </div>
                            <Card>
                                <UserInfo {...userInfo}/>
                                <UserMenu alias={userAlias}/>
                            </Card>
                            <CopyrightInfo/>
                        </StickyBox>
                    </aside>
                    <div className="user-page__right">
                        <UserBanner headliner_link={userInfo.headliner_link}/>
                    </div>
                </Container>
            </div>
        </Layout>

};

export default React.memo(connectAuthVisible(UserPage));