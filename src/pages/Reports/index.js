import React from "react";
import { compose } from "redux";
import { Route, Switch } from 'react-router-dom';
import { getPathFromRouterParams } from 'utils/index';
import reducer from './reducer';
import ExhibitionsList from './components/ExhibitionsList/';
import ReportDetails from './components/ReportDetails/';
import { defaultReduxKey } from "./config";
import { ReportsPathContext } from './context'
import injectReducer from "utils/injectReducer";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";

function ExhibitionsProxy(props) {
    const path = getPathFromRouterParams(props);
    return (
        <ReportsPathContext.Provider value={{ path }}>
            <Layout>
                <Container className="content reports-page">
                    <Switch>
                        <Route exact path={path} component={() => <ExhibitionsList path={path} />} />
                        <Route path={`${path}/:id`} component={ReportDetails} />
                    </Switch>
                </Container>
            </Layout>
        </ReportsPathContext.Provider>
    );

}

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(
    withReducer,
)(ExhibitionsProxy)