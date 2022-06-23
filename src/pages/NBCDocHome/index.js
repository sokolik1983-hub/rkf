import React from "react";
import { Route, Switch } from "react-router-dom";
import ls from "local-storage";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import NBCDocuments from "../NBCDocuments"
import { LoadableNotFound } from "../../appModules";
import ExhibitionsInventionsRegistry from "../Docs/components/Exhibitions/ExhibitionsInvitationsRegistry";
import NBCInvite from "../NBCInvite";

import "./styles.scss";


const NBCDocHome = () => {
    const { alias } = ls.get('user_info') || {};

    return <Layout>
        <div className="documents-page content">
            <Container className="documents-page__content">
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