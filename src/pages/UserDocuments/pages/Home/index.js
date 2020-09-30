import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import Container from "../../../../components/Layouts/Container";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import UserBanner from "../../components/UserBanner";
import UserInfo from "../../components/UserInfo";
import UserMenu from "../../components/UserMenu";
import Specialization from "../Specialization";
import MeetingRegistration from "../MeetingRegistration";
import FederationAssessment from "../FederationAssessment";
import {Request} from "../../../../utils/request";
import {userNav} from "../../config";
import "./index.scss";


const Home = ({userAlias, history}) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const linksArray = userNav(userAlias).map(item => item.to);

    //Костыль, пока нет раздела Оформление документов (потом убрать)
    if(history.location.pathname === `/user/${userAlias}/documents`) {
        history.replace(`/user/${userAlias}/documents/specialization`);
    }

    if(!linksArray.includes(history.location.pathname)) {
        history.replace('/404');
    }

    useEffect(() => {
        (() => Request({
            url: `/api/owners/owner/public/${userAlias}`
        }, data => {
            setUserInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, [userAlias]);

    return loading ?
        <Loading/> :
        <div className="user-documents">
            <Container className="user-documents__content content">
                <div className="user-documents__right">
                    <UserBanner headliner_link={userInfo.headliner_link}/>
                    <div className="user-documents__cards">
                        <Switch>
                            <Route
                                exact={true}
                                path='/user/:id/documents/specialization'
                                component={() => <Specialization alias={userAlias}/>}
                            />
                            <Route
                                exact={true}
                                path='/user/:id/documents/meeting-registration'
                                component={() => <MeetingRegistration/>}
                            />
                            <Route
                                exact={true}
                                path='/user/:id/documents/federation-assessment'
                                component={() => <FederationAssessment/>}
                            />
                        </Switch>
                    </div>
                </div>
                <aside className="user-documents__left">
                    <StickyBox offsetTop={66}>
                        <Card>
                            <UserInfo {...userInfo}/>
                            <UserMenu alias={userAlias}/>
                        </Card>
                        <CopyrightInfo/>
                    </StickyBox>
                </aside>
            </Container>
        </div>
};

export default React.memo(Home);