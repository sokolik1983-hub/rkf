import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import Container from "../../../../components/Layouts/Container";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
// import UserBanner from "../../../../components/Layouts/UserBanner";
import UserInfo from "../../../../components/Layouts/UserInfo";
import UserMenu from "../../../../components/Layouts/UserMenu";
import Specialization from "../Specialization";
import MeetingRegistration from "../MeetingRegistration";
import FederationAssessment from "../FederationAssessment";
import {Request} from "../../../../utils/request";
import {userNav} from "../../config";
import "./index.scss";
import {connectAuthVisible} from "../../../Login/connectors";
import {endpointGetUserInfo} from "../../../User/config";
import ls from "local-storage";


const Home = ({userAlias, history, profile_id, is_active_profile, isAuthenticated}) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const linksArray = userNav(userAlias).map(item => item.to);
    const [canEdit, setCanEdit] = useState(false);

    //Костыль, пока нет раздела Оформление документов (потом убрать)
    if(history.location.pathname === `/user/${userAlias}/documents`) {
        history.replace(`/user/${userAlias}/documents/specialization`);
    }

    if(!linksArray.includes(history.location.pathname)) {
        history.replace('/404');
    }

    useEffect(() => {
        (() => getUserInfo())();
    }, [userAlias]);

    const getUserInfo = async needUpdateAvatar => {
        setLoading(true);

        await Request({
            url: endpointGetUserInfo + userAlias
        }, data => {
            if(needUpdateAvatar) {
                ls.set('user_info', {...ls.get('user_info'), logo_link: data.logo_link});
            }

            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
        });

        setLoading(false);
    };

    return (
        <div className="user-documents">
            {loading ?
                <Loading/> :
                <Container className="user-documents__content content">
                    <aside className="user-documents__left">
                        <StickyBox offsetTop={66}>
                            {/*<div className="mobile-only">*/}
                            {/*    <UserBanner link={userInfo.headliner_link}/>*/}
                            {/*</div>*/}
                            <Card>
                                <UserInfo
                                    canEdit={canEdit}
                                    logo_link={userInfo.logo_link}
                                    first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                    second_name={userInfo.personal_information ? userInfo.personal_information.second_name : ''}
                                    last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    share_link={`https://rkf.online/user/${userAlias}`}
                                    updateInfo={getUserInfo}
                                />
                                <UserMenu userNav={userNav(userAlias)}/>
                            </Card>
                            <CopyrightInfo/>
                        </StickyBox>
                    </aside>
                    <div className="user-documents__right">
                        {/*<UserBanner link={userInfo.headliner_link}/>*/}
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
                </Container>
            }
        </div>
    )
};

export default React.memo(connectAuthVisible(Home));