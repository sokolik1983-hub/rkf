import React from "react";
import { Route, Switch } from "react-router-dom";
import ls from "local-storage";
import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Layout from "../../components/Layouts";
import TopComponent from "../../components/TopComponent";
// import DocApply from "./components/DocApply";
// import DocApplyLitter from "./components/DocApplyLitter";
import DocHome from "./components/DocHome";
import ClubDocumentsStatus from "./components/DocStatus";
import PuppiesMetrics from "./components/PuppiesMetrics";
import ResponsiblePersonForm from "./components/ResponsiblePersonForm";
import ResponsivePersonTable from "./components/ResponsiblePersonTable";
import DocRegistry from "./components/Print/DocRegistry";
import PuppyMetrics from "./components/Print/PuppyMetrics";
import AddStamp from "./components/Stamps/AddStamp";
import Registry from "./components/Stamps/Registry";
import { LoadableNotFound } from "../../appModules";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const Docs = ({ history, match, is_active_profile, isAuthenticated }) => {
    const clubAlias = ls.get('user_info') ? ls.get('user_info').club_alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').club_name : '';
    const clubLogo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    // const isVisible = isAuthenticated && is_active_profile && match.params.route === clubAlias;
    const isVisible = true;
    const nurseryAlias = 1;

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
                        <Route exact={true} path='/nursery/:route/documents/litter/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/pedigree/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/litter/:id/print' component={() =>
                            <DocRegistry history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/pedigree/:id/print' component={() =>
                            <DocRegistry history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/puppy/metrics' component={() =>
                            <PuppiesMetrics clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/puppy/metrics/:id/print' component={() =>
                            <PuppyMetrics history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/stamps/add' component={() =>
                            <AddStamp history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/stamps/registry' component={() =>
                            <Registry history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/responsible/form' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/responsible/:id/edit' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/responsible/table' component={() =>
                            <ResponsivePersonTable clubAlias={clubAlias} history={history} />}
                        />
                        {/* 
                        <Route exact={true} path='/nursery/:route/documents/:distinction/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/:distinction/:id/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/:distinction/:id/:stage/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/litter/:id' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/litter/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/pedigree/:id' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction={"pedigree"} />}
                        />
                        <Route exact={true} path='/nursery/:route/documents/pedigree/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction={"pedigree"} />}
                        /> 
                        */}

                        <Route path='/nursery/:route/documents' component={() => <DocHome nurseryAlias={nurseryAlias} />} />
                        <Route component={LoadableNotFound} />
                    </Switch>
                </Container>
            </div>
        </Layout>
};

export default React.memo(connectAuthVisible(Docs));
