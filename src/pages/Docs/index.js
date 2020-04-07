import React from "react";
import { Route, Switch } from "react-router-dom";
import ls from "local-storage";
import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Layout from "../../components/Layouts";
import TopComponent from "../../components/TopComponent";
import DocApply from "./components/DocApply";
import DocHome from "./components/DocHome";
import ClubDocumentsStatus from "./components/DocStatus";
import DocRegistry from "./components/Print/DocRegistry";
import { LoadableNotFound } from "../../appModules";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const Docs = ({ history, match, is_active_profile, isAuthenticated }) => {
    const clubAlias = ls.get('user_info') ? ls.get('user_info').club_alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').club_name : '';
    const clubLogo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    const isVisible = isAuthenticated && is_active_profile && match.params.route === clubAlias;

    return !isVisible
        ? <PageNotFound />
        : <Layout>
            <div className="documents-page">
                <Container className="documents-page__content">
                    <TopComponent
                        logo={clubLogo}
                        name={clubName}
                        canEdit={false}
                        withShare={false}
                    />
                    <Switch>
                        <Route exact={true} path='/:route/documents' component={() => <DocHome clubAlias={clubAlias} />} />
                        <Route exact={true} path='/:route/documents/litter/form' component={() =>
                            <DocApply clubAlias={clubAlias} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/form' component={() =>
                            <DocApply clubAlias={clubAlias} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/:id' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/:id/edit' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id/edit' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/:id/print' component={() =>
                            <DocRegistry history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id/print' component={() =>
                            <DocRegistry history={history} distinction="pedigree" />}
                        />
                        <Route component={LoadableNotFound} />
                    </Switch>
                </Container>
            </div>
        </Layout>
};

export default React.memo(connectAuthVisible(Docs));
