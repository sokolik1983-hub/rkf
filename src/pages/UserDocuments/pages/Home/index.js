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
import HealthCheckRegistry from "../HealthCheckRegistry";
import Specialization from "../Specialization";
import MeetingRegistration from "../MeetingRegistration";
import FederationAssessment from "../FederationAssessment";
import PatellaForm from "../Patella";
import DysplasiaForm from "../Dysplasia";
import Application from "../Application/Form";
import PageNotFound from "../404";
import { Request } from "../../../../utils/request";
import { userNav } from "../../config";
import { connectAuthVisible } from "../../../Login/connectors";
import { endpointGetUserInfo } from "components/Layouts/UserLayout/config";
import ApplicationRegistry from "../Application/ApplicationRegistry";
import Banner from "../../../../components/Banner";
import useIsMobile from "../../../../utils/useIsMobile";
import "./index.scss";


const Home = ({ userAlias, history, profile_id, is_active_profile, isAuthenticated }) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const isMobile = useIsMobile(1080);

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
                        <StickyBox offsetTop={60}>
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
                            {!isMobile && <UserMenu userNav={userNav(userAlias)} />}
                            {!isMobile && <Banner type={10} />}
                            <CopyrightInfo withSocials={true} />
                        </StickyBox>
                    </aside>
                    <div className="user-documents__right">
                        <div className="user-documents__cards">
                            <Switch>
                                <Route
                                    exact={true}
                                    path='/user/:id/documents'
                                    component={() => <Documents alias={userAlias} />}
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
                                    component={() => <PatellaForm
                                        alias={userAlias}
                                        history={history}
                                        owner={userInfo.personal_information}
                                    />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/patella/view/:docId'
                                    component={() => <PatellaForm alias={userAlias} history={history} status="view" />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/patella/edit/:docId'
                                    component={() => <PatellaForm alias={userAlias} history={history} status="edit" />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:route/documents/patella/registry'
                                    component={() => <HealthCheckRegistry history={history} distinction="patella" />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/dysplasia/form'
                                    component={() => <DysplasiaForm
                                        alias={userAlias}
                                        history={history}
                                        owner={userInfo.personal_information}
                                    />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/dysplasia/view/:docId'
                                    component={() => <DysplasiaForm alias={userAlias} history={history} status="view" />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/dysplasia/edit/:docId'
                                    component={() => <DysplasiaForm alias={userAlias} history={history} status="edit" />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:route/documents/dysplasia/registry'
                                    component={() => <HealthCheckRegistry history={history} distinction="dysplasia" />}
                                />
                                <Route
                                    exact={true}
                                    path='/user/:route/documents/application/form'
                                    component={() =>
                                        <Application
                                            alias={userAlias}
                                            history={history}
                                            owner={userInfo.personal_information}
                                        />
                                    }
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/application/view/:docId'
                                    component={() =>
                                        <Application
                                            alias={userAlias}
                                            history={history}
                                            status="view"
                                            owner={userInfo.personal_information}
                                        />
                                    }
                                />
                                <Route
                                    exact={true}
                                    path='/user/:id/documents/application/edit/:docId'
                                    component={() =>
                                        <Application
                                            alias={userAlias}
                                            history={history}
                                            status="edit"
                                            owner={userInfo.personal_information}
                                        />
                                    }
                                />
                                <Route
                                    exact={true}
                                    path='/user/:route/documents/application/registry'
                                    component={() => <ApplicationRegistry history={history} />}
                                />
                                <Route
                                    component={() => <PageNotFound />}
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