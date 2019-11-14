import React from "react";
import { compose } from "redux";
import { Route, Switch } from 'react-router-dom';
import { getPathFromRouterParams } from 'utils/index';
import reducer from './reducer';
import ExhibitionsList from './components/ExhibitionsList/';
import ReportDetails from './components/ReportDetails/';
import PublicLayout from 'components/Layout';
import { defaultReduxKey } from "./config";
import { ReportsPathContext } from './context'
import FooterSmall from 'components/Layout/FooterSmall';
import injectReducer from "utils/injectReducer";

function ExhibitionsProxy(props) {
    const path = getPathFromRouterParams(props);
    return (
        <ReportsPathContext.Provider value={{ path }}>
            <PublicLayout>
                <div style={{ padding: '60px 10px 10px', maxWidth: 'none', minHeight: 'calc(100vh - 267px)' }}>
                    <Switch>
                        <Route exact path={path} component={() => <ExhibitionsList path={path} />} />
                        <Route path={`${path}/:id`} component={ReportDetails} />
                    </Switch>
                </div>
                <FooterSmall />
            </PublicLayout>
        </ReportsPathContext.Provider>
    );

}

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(
    withReducer,
)(ExhibitionsProxy)