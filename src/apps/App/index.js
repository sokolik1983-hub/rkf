import React, {Component} from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {appRoutes} from 'appConfig'
import Layout from "components/Layout/index";

class App extends Component {
    renderRoutes = () => {
        return appRoutes.length > 0 ?
            appRoutes.map(route =>
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                />
            )
            : null
    };

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        {this.renderRoutes()}
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;