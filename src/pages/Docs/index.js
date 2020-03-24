import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Layout from 'components/Layouts';
import TopComponent from 'components/TopComponent';
import DocApply from './components/DocApply';
import DocHome from './components/DocHome';
import ClubDocumentsStatus from "./components/DocStatus";
import { LoadableNotFound } from "appModules";
import ls from "local-storage";
import "./index.scss";

const Docs = ({history}) => {
    const loading = false;
    const isError = false;
    const clubAlias = ls.get('user_info') ? ls.get('user_info').club_alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').club_name : '';
    const clubLogo = ls.get('user_info') ? ls.get('user_info').logo_link : '';

    return isError ?
        <PageNotFound /> :
        loading ?
            <Loading /> :
            <Layout>
                <div className="documents-page">
                    <Container className="documents-page__content">
                        <TopComponent
                            logo={clubLogo}
                            name={clubName}
                            canEdit={true}
                            withShare={false}
                        />
                        <Switch>
                            <Route exact={true} path='/:route/documents' component={() => <DocHome clubAlias={clubAlias} />} />
                            <Route exact={true} path='/:route/documents/apply-litter' component={() => <DocApply clubAlias={clubAlias} />} />
                            <Route exact={true} path='/:route/documents/apply-pedigree' component={() => <DocApply clubAlias={clubAlias} />} />
                            <Route exact={true} path='/:route/documents/status' component={() => <ClubDocumentsStatus clubAlias={clubAlias} history={history} />} />
                            <Route component={LoadableNotFound} />
                        </Switch>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(Docs);