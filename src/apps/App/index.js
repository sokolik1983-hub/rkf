import React, { PureComponent } from "react";
import { Route, Switch } from 'react-router-dom';
import { appRoutes } from 'appConfig'
import { LoadableNotFound } from "../../appModules"
import 'components/Layout/index.scss'
import NotConfirmed from 'apps/Registration/components/Registration/NotConfirmed'


class App extends PureComponent {
    render() {
        return (
            <Switch>
                <Route path="/not-confirmed" component={NotConfirmed} />
                {appRoutes.length > 0 &&
                    appRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    )
                }
                <Route component={LoadableNotFound} />
            </Switch>
        );
    }
}

export default App;