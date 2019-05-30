import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import {appRoutes} from 'appConfig'
import 'components/Layout/index.scss'


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
            <Switch>
                {this.renderRoutes()}
            </Switch>
        );
    }
}

export default App;