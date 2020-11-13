import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import StickyBox from "react-sticky-box";
import ls from "local-storage";
import Loading from "../../../../components/Loading";
import Container from "../../../../components/Layouts/Container";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import UserInfo from "../../../../components/Layouts/UserInfo";
import UserMenu from "../../../../components/Layouts/UserMenu";
import Documents from "../Documents";
import Specialization from "../Specialization";
import MeetingRegistration from "../MeetingRegistration";
import FederationAssessment from "../FederationAssessment";
import PatellaForm from "../Patella/Form";
import { Request } from "../../../../utils/request";
import { userNav } from "../../config";
import { connectAuthVisible } from "../../../Login/connectors";
import { endpointGetUserInfo } from "../../../User/config";
import "./index.scss";


const Home = ({ userAlias, history, profile_id, is_active_profile, isAuthenticated }) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    // const linksArray = [
    //     ...userNav(userAlias).map(item => item.to),
    //     `/user/${userAlias}/documents/patella/form`
    // ];

    // if (!linksArray.includes(history.location.pathname)) {
    //     history.replace('/404');
    // }

    useEffect(() => {
        (() => getUserInfo())();
    }, [userAlias]);

    const getUserInfo = async needUpdateAvatar => {
        setLoading(true);

        await Request({
            url: endpointGetUserInfo + userAlias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
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
                <Loading /> :
                <Container className="user-documents__content content">
                    <aside className="user-documents__left">
                        <StickyBox offsetTop={66}>
                            <Card>
                                <UserInfo
                                    canEdit={canEdit}
                                    logo_link={userInfo.logo_link}
                                    share_link={`https://rkf.online/user/${userAlias}`}
                                    first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                    last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    alias={userAlias}
                                    updateInfo={getUserInfo}
                                />
                            </Card>
                            <UserMenu userNav={userNav(userAlias)} />
                            <CopyrightInfo />
                        </StickyBox>
                    </aside>
                    <div className="user-documents__right">
                        <div className="user-documents__cards">
                            <Switch>
                                <Route
                                    exact={true}
                                    path='/user/:id/documents'
                                    component={() => <Documents alias={userAlias}/>}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/specialization'
                                    component={() => <Specialization alias={userAlias} />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/meeting-registration'
                                    component={() => <MeetingRegistration />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/federation-assessment'
                                    component={() => <FederationAssessment />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/patella/form'
                                    component={() => <PatellaForm alias={userAlias} />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/patella/view/:docId'
                                    component={() => <PatellaForm alias={userAlias} history={history} status="view"/>}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/patella/edit/:docId'
                                    component={() => <PatellaForm alias={userAlias} history={history} status="edit"/>}
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