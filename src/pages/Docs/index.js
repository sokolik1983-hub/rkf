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
import ClubDocumentsStatus from "./components/DocStatus";
import PuppiesMetrics from "./components/PuppiesMetrics";
import ResponsiblePersonForm from "./components/ResponsiblePersonForm";
import ResponsivePersonTable from "./components/ResponsiblePersonTable";
import DocRegistry from "./components/Print/DocRegistry";
import PuppyMetrics from "./components/Print/PuppyMetrics";
import AddStamp from "./components/Stamps/AddStamp";
import Registry from "./components/Stamps/Registry";
import RequestRegistry from "./components/RequestRegistry";
import ReplaceRegistry from "./components/ReplaceRegistry";
import ReplacePedigree from "./components/ReplacePedigree";
import Patella from "components/Patella";
import PatellaRegistry from "components/PatellaRegistry";
import { LoadableNotFound } from "../../appModules";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const Docs = ({ history, match, is_active_profile, isAuthenticated }) => {
    const clubAlias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').name : '';
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
                        <Route exact={true} path='/:route/documents/replace-pedigree/registry' component={() =>
                            <ReplaceRegistry alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/replace-pedigree/:reqtype/:action/:id' component={() =>
                            <ReplacePedigree alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/replace-pedigree/:reqtype/:action' component={() =>
                            <ReplacePedigree alias={clubAlias} history={history} />}
                        />

                        <Route exact={true} path='/:route/documents/dysplasia/registry' component={() =>
                            <PatellaRegistry alias={clubAlias} history={history} distinction="dysplasia" />}
                        />
                        <Route exact={true} path='/:route/documents/dysplasia/:action/:id' component={() =>
                            <Patella alias={clubAlias} history={history} distinction="dysplasia" />}
                        />
                        <Route exact={true} path='/:route/documents/dysplasia/:action' component={() =>
                            <Patella alias={clubAlias} history={history} distinction="dysplasia" />}
                        />

                        <Route exact={true} path='/:route/documents/patella/registry' component={() =>
                            <PatellaRegistry alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/patella/:action/:id' component={() =>
                            <Patella alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/patella/:action' component={() =>
                            <Patella alias={clubAlias} history={history} />}
                        />

                        <Route exact={true} path='/:route/documents/litter/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/requests' component={() =>
                            <RequestRegistry clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/requests' component={() =>
                            <RequestRegistry clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/:id/print' component={() =>
                            <DocRegistry history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id/print' component={() =>
                            <DocRegistry history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/puppy/metrics' component={() =>
                            <PuppiesMetrics clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/puppy/metrics/:id/print' component={() =>
                            <PuppyMetrics history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/stamps/add' component={() =>
                            <AddStamp history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/stamps/registry' component={() =>
                            <Registry history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/form' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/:id/edit' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/table' component={() =>
                            <ResponsivePersonTable clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/:distinction/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/:distinction/:id/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/:distinction/:id/:stage/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/litter/:id' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/litter/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction={"pedigree"} />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction={"pedigree"} />}
                        />

                        <Route path='/:route/documents' component={() => <DocHome clubAlias={clubAlias} history={history} />} />
                        <Route component={LoadableNotFound} />
                    </Switch>
                </Container>
            </div>
        </Layout>
};

export default React.memo(connectAuthVisible(Docs));
