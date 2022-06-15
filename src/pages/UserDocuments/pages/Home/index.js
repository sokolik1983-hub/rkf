import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ls from "local-storage";
import Loading from "../../../../components/Loading";
import Container from "../../../../components/Layouts/Container";
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
import { connectAuthVisible } from "../../../Login/connectors";
import { endpointGetUserInfo } from "components/Layouts/UserLayout/config";
import ApplicationRegistry from "../Application/ApplicationRegistry";
import ExhibitionsInventionsRegistry from "../../../Docs/components/Exhibitions/ExhibitionsInvitationsRegistry";
import JudgeInvite from "../JudgeInvite";
import TopComponent from "../../../../components/TopComponent";

import "./index.scss";


const Home = ({ userAlias, history }) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    const { alias, name, logo_link } = ls.get('user_info') || {};

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
        }, error => {
            console.log(error.response);
        });

        setLoading(false);
    };

    return (
        <div className="user-documents">
            { loading ?
                <Loading/> :
                <div className="user-documents__content">
                    <Container className="documents-page__content">
                        <TopComponent
                            logo={ logo_link }
                            name={ name }
                            canEdit={ false }
                            withShare={ false }
                            userType={ 7 }
                        />
                        <Switch>
                            <Route
                                exact={ true }
                                path='/user/:id/documents'
                                component={ () => <Documents alias={ userAlias }/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/specialization'
                                component={ () => <Specialization alias={ userAlias }/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/meeting-registration'
                                component={ () => <MeetingRegistration/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/federation-assessment'
                                component={ () => <FederationAssessment/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/patella/form'
                                component={ () => <PatellaForm
                                    alias={ userAlias }
                                    history={ history }
                                    owner={ userInfo.personal_information }
                                /> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/patella/view/:docId'
                                component={ () => <PatellaForm alias={ userAlias } history={ history } status="view"/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/patella/edit/:docId'
                                component={ () => <PatellaForm alias={ userAlias } history={ history } status="edit"/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:route/documents/patella/registry'
                                component={ () => <HealthCheckRegistry history={ history } distinction="patella"/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/dysplasia/form'
                                component={ () => <DysplasiaForm
                                    alias={ userAlias }
                                    history={ history }
                                    owner={ userInfo.personal_information }
                                /> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/dysplasia/view/:docId'
                                component={ () => <DysplasiaForm alias={ userAlias } history={ history }
                                                                 status="view"/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/dysplasia/edit/:docId'
                                component={ () => <DysplasiaForm alias={ userAlias } history={ history }
                                                                 status="edit"/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:route/documents/dysplasia/registry'
                                component={ () => <HealthCheckRegistry history={ history } distinction="dysplasia"/> }
                            />
                            <Route
                                exact={ true }
                                path='/user/:route/documents/application/form'
                                component={ () =>
                                    <Application
                                        alias={ userAlias }
                                        history={ history }
                                        owner={ userInfo.personal_information }
                                    />
                                }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/application/view/:docId'
                                component={ () =>
                                    <Application
                                        alias={ userAlias }
                                        history={ history }
                                        status="view"
                                        owner={ userInfo.personal_information }
                                    />
                                }
                            />
                            <Route
                                exact={ true }
                                path='/user/:id/documents/application/edit/:docId'
                                component={ () =>
                                    <Application
                                        alias={ userAlias }
                                        history={ history }
                                        status="edit"
                                        owner={ userInfo.personal_information }
                                    />
                                }
                            />
                            <Route
                                exact={ true }
                                path='/user/:route/documents/application/registry'
                                component={ () => <ApplicationRegistry history={ history } /> }
                            />
                            <Route
                                exact={ false }
                                path='/user/:route/documents/exhibitions/invite/registry'
                                component={ () => <ExhibitionsInventionsRegistry alias={ alias } userType="user" /> }
                            />
                            <Route
                                exact={ false }
                                path='/user/:route/documents/exhibitions/invite'
                                component={ () => <JudgeInvite alias={ alias } /> }
                            />
                            <Route
                                component={ () => <PageNotFound/> }
                            />
                        </Switch>
                    </Container>
                </div>
            }
        </div>
    )
};

export default React.memo(connectAuthVisible(Home));