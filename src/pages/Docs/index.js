import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
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
import CheckMembershipForm from "./components/CheckMembership/CheckMembershipForm";
import CheckMembershipRegistry from "./components/CheckMembership/CheckMembershipRegistry";
import DocRegistry from "./components/Print/DocRegistry";
import AddStamp from "./components/Stamps/AddStamp";
import Registry from "./components/Stamps/Registry";
import RequestRegistry from "./components/RequestRegistry";
import ReplaceRegistry from "./components/ReplaceRegistry";
import ReplacePedigree from "./components/ReplacePedigree";
import Patella from "components/Patella";
import PatellaRegistry from "components/PatellaRegistry";
import { connectAuthVisible } from "../Login/connectors";
import Application from "./components/Application/Form";
import ApplicationRegistry from "./components/Application/ApplicationRegistry";
import ExhibitionsForm from "./components/Exhibitions/ExhibitionsForm";
import ExhibitionsFormNew from "./components/Exhibitions/ExhibitionsFormNew";
import ExhibitionsRegistry from "./components/Exhibitions/ExhibitionsRegistry";
import ExhibitionsCancellationForm from "./components/ExhibitionsCancellation/ExhibitionsCancellationForm";
import ExhibitionsCancellationRegistry from "./components/ExhibitionsCancellation/ExhibitionsCancellationRegistry";
import ExhibitionsInventionsRegistry from "./components/Exhibitions/ExhibitionsInvitationsRegistry";
import ExhibitionsInviteClub from "./components/Exhibitions/ExhibitionsInviteClub";

import "./index.scss";

const Docs = ({ history, match, is_active_profile, isAuthenticated }) => {
    const clubAlias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').name : '';
    const clubLogo = ls.get('user_info') ? ls.get('user_info').logo_link : '';
    const isVisible = isAuthenticated && is_active_profile && match.params.route === clubAlias;
    const isWithFilters = !!useRouteMatch('/club/:route/documents/replace-pedigree/registry');

    return !isVisible
        ?
        <PageNotFound />
        :
        isWithFilters
            ?
            <Layout layoutWithFilters={isWithFilters}>
                <div className="documents-page content">
                    <Container className="documents-page__content">
                        <TopComponent
                            logo={clubLogo}
                            name={clubName}
                            canEdit={false}
                            withShare={false}
                        />
                        <Switch>
                            <Route exact={true} path='/club/:route/documents/replace-pedigree/registry' component={() =>
                                <ReplaceRegistry alias={clubAlias} history={history} />}
                            />
                        </Switch>
                    </Container>
                </div>
            </Layout>
            :
            <div className="documents-page content">
                <Container className="documents-page__content">
                    <TopComponent
                        logo={clubLogo}
                        name={clubName}
                        canEdit={false}
                        withShare={false}
                    />
                    <Switch>
                        <Route
                            exact={true}
                            path='/club/:route/documents/application/form'
                            component={() => <Application alias={clubAlias} history={history} />}
                        />
                        <Route
                            exact={true}
                            path='/club/:route/documents/application/view/:docId'
                            component={() => <Application alias={clubAlias} history={history} status="view" />}
                        />
                        <Route
                            exact={true}
                            path='/club/:route/documents/application/edit/:docId'
                            component={() => <Application alias={clubAlias} history={history} status="edit" />}
                        />
                        <Route
                            exact={true}
                            path='/club/:route/documents/application/registry'
                            component={() => <ApplicationRegistry history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/replace-pedigree/:reqtype/:action/:id' component={() =>
                            <ReplacePedigree alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/replace-pedigree/:reqtype/:action' component={() =>
                            <ReplacePedigree alias={clubAlias} history={history} />}
                        />

                        <Route exact={true} path='/club/:route/documents/dysplasia/registry' component={() =>
                            <PatellaRegistry alias={clubAlias} history={history} distinction="dysplasia" />}
                        />
                        <Route exact={true} path='/club/:route/documents/dysplasia/:action/:id' component={() =>
                            <Patella alias={clubAlias} history={history} distinction="dysplasia" />}
                        />
                        <Route exact={true} path='/club/:route/documents/dysplasia/:action' component={() =>
                            <Patella alias={clubAlias} history={history} distinction="dysplasia" />}
                        />

                        <Route exact={true} path='/club/:route/documents/patella/registry' component={() =>
                            <PatellaRegistry alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/patella/:action/:id' component={() =>
                            <Patella alias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/patella/:action' component={() =>
                            <Patella alias={clubAlias} history={history} />}
                        />

                        <Route exact={true} path='/club/:route/documents/litter/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/club/:route/documents/pedigree/status' component={() =>
                            <ClubDocumentsStatus clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/club/:route/documents/litter/requests' component={() =>
                            <RequestRegistry clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/club/:route/documents/pedigree/requests' component={() =>
                            <RequestRegistry clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/club/:route/documents/litter/:id/print' component={() =>
                            <DocRegistry history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/club/:route/documents/pedigree/:id/print' component={() =>
                            <DocRegistry history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/club/:route/documents/puppy/metrics' component={() =>
                            <PuppiesMetrics clubAlias={clubAlias} history={history} distinction='metrics' />}
                        />
                        <Route exact={true} path='/club/:route/documents/puppy/metrics/:id/print' component={() =>
                            <PuppiesMetrics history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/stamps/add' component={() =>
                            <AddStamp history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/stamps/registry' component={() =>
                            <Registry history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/application/form' component={() =>
                            <ExhibitionsFormNew clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/application/registry' component={() =>
                            <ExhibitionsRegistry clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/invite/registry' component={() =>
                            <ExhibitionsInventionsRegistry clubAlias={clubAlias} userType="club" component/>}
                        />
                        <Route exact={false} path='/club/:route/documents/exhibitions/invite' component={() =>
                            <ExhibitionsInviteClub clubAlias={clubAlias} userType="club" component/>}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/application/form/view/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="view" />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/application/form/edit/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="edit" />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/application/form/change/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="change" />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/application/form/cancel/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="cancel" />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/cancellation/form' component={() =>
                            <ExhibitionsCancellationForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/cancellation/registry' component={() =>
                            <ExhibitionsCancellationRegistry clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/cancellation/form/view/:docId' component={() =>
                            <ExhibitionsCancellationForm clubAlias={clubAlias} history={history} status="view" />}
                        />
                        <Route exact={true} path='/club/:route/documents/exhibitions/cancellation/form/edit/:docId' component={() =>
                            <ExhibitionsCancellationForm clubAlias={clubAlias} history={history} status="edit" />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/form' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/:id/edit' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/checkmembership/form' component={() =>
                            <CheckMembershipForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/checkmembership/registry' component={() =>
                            <CheckMembershipRegistry clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/checkmembership/form/view/:docId' component={() =>
                            <CheckMembershipForm clubAlias={clubAlias} history={history} status="view" />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/checkmembership/form/edit/:docId' component={() =>
                            <CheckMembershipForm clubAlias={clubAlias} history={history} status="edit" />}
                        />
                        <Route exact={true} path='/club/:route/documents/responsible/table' component={() =>
                            <ResponsivePersonTable clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/:distinction/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/:distinction/:id/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/:distinction/:id/:stage/form' component={() =>
                            <DocApply clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/club/:route/documents/litter/:id' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/club/:route/documents/litter/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="litter" />}
                        />
                        <Route exact={true} path='/club/:route/documents/pedigree/:id' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/club/:route/documents/pedigree/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />

                        <Route path='/club/:route/documents' component={() => <DocHome clubAlias={clubAlias} history={history} />} />





                        <Route
                            exact={true}
                            path='/:route/documents/application/form'
                            component={() => <Application alias={clubAlias} history={history} />}
                        />
                        <Route
                            exact={true}
                            path='/:route/documents/application/view/:docId'
                            component={() => <Application alias={clubAlias} history={history} status="view" />}
                        />
                        <Route
                            exact={true}
                            path='/:route/documents/application/edit/:docId'
                            component={() => <Application alias={clubAlias} history={history} status="edit" />}
                        />
                        <Route
                            exact={true}
                            path='/:route/documents/application/registry'
                            component={() => <ApplicationRegistry history={history} />}
                        />

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
                            <PuppiesMetrics clubAlias={clubAlias} history={history} distinction='metrics'/>}
                        />
                        <Route exact={true} path='/:route/documents/puppy/metrics/:id/print' component={() =>
                            <PuppiesMetrics history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/stamps/add' component={() =>
                            <AddStamp history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/stamps/registry' component={() =>
                            <Registry history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/application/form' component={() =>
                            <ExhibitionsFormNew clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/application/registry' component={() =>
                            <ExhibitionsRegistry clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/invite/registry' component={() =>
                            <ExhibitionsInventionsRegistry alias={clubAlias} userType="club" />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/application/form/view/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="view" />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/application/form/edit/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="edit" />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/application/form/change/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="change" />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/application/form/cancel/:docId' component={() =>
                            <ExhibitionsForm clubAlias={clubAlias} history={history} status="cancel" />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/cancellation/form' component={() =>
                            <ExhibitionsCancellationForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/cancellation/registry' component={() =>
                            <ExhibitionsCancellationRegistry clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/cancellation/form/view/:docId' component={() =>
                            <ExhibitionsCancellationForm clubAlias={clubAlias} history={history} status="view" />}
                        />
                        <Route exact={true} path='/:route/documents/exhibitions/cancellation/form/edit/:docId' component={() =>
                            <ExhibitionsCancellationForm clubAlias={clubAlias} history={history} status="edit" />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/form' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/:id/edit' component={() =>
                            <ResponsiblePersonForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/checkmembership/form' component={() =>
                            <CheckMembershipForm clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/checkmembership/registry' component={() =>
                            <CheckMembershipRegistry clubAlias={clubAlias} history={history} />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/checkmembership/form/view/:docId' component={() =>
                            <CheckMembershipForm clubAlias={clubAlias} history={history} status="view" />}
                        />
                        <Route exact={true} path='/:route/documents/responsible/checkmembership/form/edit/:docId' component={() =>
                            <CheckMembershipForm clubAlias={clubAlias} history={history} status="edit" />}
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
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />
                        <Route exact={true} path='/:route/documents/pedigree/:id/edit' component={() =>
                            <DocApplyLitter clubAlias={clubAlias} history={history} distinction="pedigree" />}
                        />

                        <Route path='/:route/documents' component={() => <DocHome clubAlias={clubAlias} history={history} />} />



                        {/*<Route component={LoadableNotFound} />*/}
                    </Switch>
                </Container>
            </div>
};

export default React.memo(connectAuthVisible(Docs));
