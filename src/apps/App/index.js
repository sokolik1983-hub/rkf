import React, {Component} from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {appRoutes} from 'appConfig'
import AppLayout from "components/AppLayout/index";
import Button from 'components/Button'

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
                <AppLayout>
                    <Switch>
                        {this.renderRoutes()}
                    </Switch>
                </AppLayout>
            </BrowserRouter>
        );
    }
}

export default App;