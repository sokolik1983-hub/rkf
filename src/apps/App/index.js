import React, {PureComponent} from "react";
import {Route, Switch} from 'react-router-dom';
import {appRoutes} from 'appConfig'
import 'components/Layout/index.scss'


class App extends PureComponent {
    render() {
        return (
            <Switch>
                {appRoutes.length > 0 ?
                    appRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    )
                    : null}
            </Switch>
        );
    }
}

export default App;