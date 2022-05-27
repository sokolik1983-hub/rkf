import React from "react";
import { Route, Switch } from "react-router-dom";
import ls from "local-storage";
import Layout from "../../components/Layouts";
import TopComponent from "../../components/TopComponent";
import Container from "../../components/Layouts/Container";
import NBCDocuments from "../NBCDocuments"
import { LoadableNotFound } from "../../appModules";
import ExhibitionsInventionsRegistry from "../Docs/components/Exhibitions/ExhibitionsInvitationsRegistry";
import NBCInvite from "../NBCInvite";

import "./styles.scss";


const NBCDocHome = () => {
    const { alias, name, logo_link } = ls.get('user_info') || {};

    return <Layout>
        <div className="documents-page content">
            <Container className="documents-page__content">
                <TopComponent
                    logo={logo_link}
                    name={name}
                    canEdit={false}
                    withShare={false}
                    userType ={7}
                />
                    <Switch>
                        <Route
                            exact={true}
                            path='/nbc/:route/documents/'
                            component={() => <NBCDocuments alias={alias}/>}
                        />
                        <Route
                            exact={false}
                            path='/nbc/:route/documents/exhibitions/invite/registry'
                            component={() => <ExhibitionsInventionsRegistry alias={alias} userType="nbc" />}
                        />
                        <Route
                            exact={false}
                            path='/nbc/:route/documents/exhibitions/invite'
                            component={() => <NBCInvite alias={alias} userType="nbc"/>}
                        />
                        <Route component={LoadableNotFound} />
                    </Switch>
            </Container>
        </div>
    </Layout>;
};

export default NBCDocHome;