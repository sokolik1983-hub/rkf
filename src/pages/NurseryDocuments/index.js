import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ls from "local-storage";
// import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Layout from "../../components/Layouts";
import TopComponent from "../../components/TopComponent";
import DocApply from "./components/DocApply";
import DocApplyLitter from "./components/DocApplyLitter";
import DocHome from "./components/DocHome";
import NurseryDocumentsStatus from "./components/DocStatus";
import PuppiesMetrics from "../Docs/components/PuppiesMetrics";
import ResponsiblePersonForm from "./components/ResponsiblePersonForm";
import ResponsivePersonTable from "./components/ResponsiblePersonTable";
import DocRegistry from "./components/Print/DocRegistry";
import PuppyMetrics from "./components/Print/PuppyMetrics";
// import AddStamp from "./components/Stamps/AddStamp";
// import Registry from "./components/Stamps/Registry";
import RequestRegistry from "./components/RequestRegistry";
import ReplaceRegistry from "./components/ReplaceRegistry";
import ReplacePedigree from "./components/ReplacePedigree";
import Patella from "components/Patella";
import PatellaRegistry from "components/PatellaRegistry";
import Application from "./components/Application/Form";
import ApplicationRegistry from "./components/Application/ApplicationRegistry";
import CheckMembershipForm from "./components/CheckMembership/CheckMembershipForm";
import CheckMembershipRegistry from "./components/CheckMembership/CheckMembershipRegistry";
import { LoadableNotFound } from "../../appModules";
import { connectAuthVisible } from "../Login/connectors";
import HorizontalMenu from "../../components/HorizontalMenu";
import useIsMobile from "../../utils/useIsMobile";
import {kennelNav} from "../../pages/NurseryDocuments/config"
import "./index.scss";



const Docs = ({ history }) => {
    const nurseryAlias = ls.get('user_info') ? ls.get('user_info').alias : 1;
    const nurseryName = ls.get('user_info') ? ls.get('user_info').name : '';
    const nurseryLogo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    //const isVisible = isAuthenticated && is_active_profile && match.params.route === nurseryAlias;
    // const isVisible = ls.get('personal_office_access') ? ls.get('personal_office_access') : false;
    const isWithFilters = !!useRouteMatch('/kennel/:route/documents/replace-pedigree/registry');
    const isMobile = useIsMobile(1080);



    return <Layout withFilters={isWithFilters}>
        <div className="documents-page content">
            <Container className="documents-page__content">
                <TopComponent
                    logo={nurseryLogo}
                    name={nurseryName}
                    canEdit={false}
                    withShare={false}
                />
                <Switch>
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/application/form'
                        component={() => <Application alias={nurseryAlias} history={history} />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/application/view/:docId'
                        component={() => <Application alias={nurseryAlias} history={history} status="view" />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/application/edit/:docId'
                        component={() => <Application alias={nurseryAlias} history={history} status="edit" />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/application/registry'
                        component={() => <ApplicationRegistry history={history} />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/responsible/checkmembership/form'
                        component={() => <CheckMembershipForm nurseryAlias={nurseryAlias} history={history} />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/responsible/checkmembership/form/view/:docId'
                        component={() => <CheckMembershipForm nurseryAlias={nurseryAlias} history={history} status="view" />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/responsible/checkmembership/form/edit/:docId'
                        component={() => <CheckMembershipForm nurseryAlias={nurseryAlias} history={history} status="edit" />}
                    />
                    <Route
                        exact={true}
                        path='/kennel/:route/documents/responsible/checkmembership/registry'
                        component={() => <CheckMembershipRegistry history={history} />}
                    />

                    <Route exact={true} path='/kennel/:route/documents/replace-pedigree/registry' component={() =>
                        <ReplaceRegistry alias={nurseryAlias} history={history} />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/replace-pedigree/:reqtype/:action/:id' component={() =>
                        <ReplacePedigree alias={nurseryAlias} history={history} />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/replace-pedigree/:reqtype/:action' component={() =>
                        <ReplacePedigree alias={nurseryAlias} history={history} />}
                    />

                    <Route exact={true} path='/kennel/:route/documents/dysplasia/registry' component={() =>
                        <PatellaRegistry alias={nurseryAlias} history={history} distinction="dysplasia" profileType="kennel" />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/dysplasia/:action/:id' component={() =>
                        <Patella alias={nurseryAlias} history={history} distinction="dysplasia" profileType="kennel" />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/dysplasia/:action' component={() =>
                        <Patella alias={nurseryAlias} history={history} distinction="dysplasia" profileType="kennel" />}
                    />

                    <Route exact={true} path='/kennel/:route/documents/patella/registry' component={() =>
                        <PatellaRegistry alias={nurseryAlias} history={history} profileType="kennel" />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/patella/:action/:id' component={() =>
                        <Patella alias={nurseryAlias} history={history} profileType="kennel" />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/patella/:action' component={() =>
                        <Patella alias={nurseryAlias} history={history} profileType="kennel" />}
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
                        <PuppiesMetrics nurseryAlias={nurseryAlias} history={history} distinction='metrics' />}
                    />
                    <Route exact={true} path='/kennel/:route/documents/puppy/metrics/:id/print' component={() =>
                        <PuppiesMetrics history={history} />}
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