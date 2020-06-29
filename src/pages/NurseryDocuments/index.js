import React from "react";
import { Route, Switch } from "react-router-dom";
import ls from "local-storage";
import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Layout from "../../components/Layouts";
import TopComponent from "../../components/TopComponent";
import DocApply from "./components/DocApply";
import DocApplyLitter from "./components/DocApplyLitter";
import DocHome from "./components/DocHome";
import NurseryDocumentsStatus from "./components/DocStatus";
import PuppiesMetrics from "./components/PuppiesMetrics";
import ResponsiblePersonForm from "./components/ResponsiblePersonForm";
import ResponsivePersonTable from "./components/ResponsiblePersonTable";
import DocRegistry from "./components/Print/DocRegistry";
import PuppyMetrics from "./components/Print/PuppyMetrics";
// import AddStamp from "./components/Stamps/AddStamp";
// import Registry from "./components/Stamps/Registry";
import RequestRegistry from "./components/RequestRegistry";
import ReplaceRegistry from "./components/ReplaceRegistry";
import ReplacePedigree from "./components/ReplacePedigree";
import { LoadableNotFound } from "../../appModules";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const Docs = ({ history, match, is_active_profile, isAuthenticated }) => {
    const nurseryAlias = ls.get('user_info') ? ls.get('user_info').alias : 1;
    const nurseryName = ls.get('user_info') ? ls.get('user_info').name : '';
    const nurseryLogo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    const personalAccess = ls.get('personal_office_access') ? ls.get('personal_office_access') : false;
    //const isVisible = isAuthenticated && is_active_profile && match.params.route === nurseryAlias;
    const isVisible = personalAccess;

    console.log('isVisible', isVisible)

    return !isVisible
        ? <PageNotFound />
        : <Layout>
            <div className="documents-page">
                <Container className="documents-page__content">
                    <TopComponent
                        logo={nurseryLogo}
                        name={nurseryName}
                        canEdit={false}
                        withShare={false}
                    />
                    <Switch>
                        <Route exact={true} path='/kennel/:route/documents/replace-pedigree/registry' component={() =>
                            <ReplaceRegistry alias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/replace-pedigree/:reqtype/:action/:id' component={() =>
                            <ReplacePedigree alias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/replace-pedigree/:reqtype/:action' component={() =>
                            <ReplacePedigree alias={nurseryAlias} history={history} />}
                        />

                       <Route exact={true} path='/kennel/:route/documents/litter/status' component={() =>
                            <NurseryDocumentsStatus nurseryAlias={nurseryAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/pedigree/status' component={() =>
                            <NurseryDocumentsStatus nurseryAlias={nurseryAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/litter/requests' component={() =>
                            <RequestRegistry nurseryAlias={nurseryAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/pedigree/requests' component={() =>
                            <RequestRegistry nurseryAlias={nurseryAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/litter/:id/print' component={() =>
                            <DocRegistry history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/pedigree/:id/print' component={() =>
                            <DocRegistry history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/puppy/metrics' component={() =>
                            <PuppiesMetrics nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/puppy/metrics/:id/print' component={() =>
                            <PuppyMetrics history={history} />}
                        />
                        {/*<Route exact={true} path='/kennel/:route/documents/stamps/add' component={() =>
                            <AddStamp history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/stamps/registry' component={() =>
                            <Registry history={history} />}
                        />*/}
                        <Route exact={true} path='/kennel/:route/documents/responsible/form' component={() =>
                            <ResponsiblePersonForm nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/responsible/:id/edit' component={() =>
                            <ResponsiblePersonForm nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/responsible/table' component={() =>
                            <ResponsivePersonTable nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/:distinction/form' component={() =>
                            <DocApply nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/:distinction/:id/form' component={() =>
                            <DocApply nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/:distinction/:id/:stage/form' component={() =>
                            <DocApply nurseryAlias={nurseryAlias} history={history} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/litter/:id' component={() =>
                            <DocApplyLitter nurseryAlias={nurseryAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/litter/:id/edit' component={() =>
                            <DocApplyLitter nurseryAlias={nurseryAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/pedigree/:id' component={() =>
                            <DocApplyLitter nurseryAlias={nurseryAlias} history={history} distinction={"pedigree"} />}
                        />
                        <Route exact={true} path='/kennel/:route/documents/pedigree/:id/edit' component={() =>
                            <DocApplyLitter nurseryAlias={nurseryAlias} history={history} distinction={"pedigree"} />}
                        />

                        <Route path='/kennel/:route/documents/bookform' component={() => <DocHome bookform={true} nurseryAlias={nurseryAlias} />} />
                        <Route path='/kennel/:route/documents' component={() => <DocHome nurseryAlias={nurseryAlias} />} />
                        <Route component={LoadableNotFound} />
                    </Switch>
                </Container>
            </div>
        </Layout>
};

export default React.memo(connectAuthVisible(Docs));
