import React, { PureComponent } from "react";
import { Route, Switch } from 'react-router-dom';
import { appRoutes } from 'appConfig'
import { LoadableNotFound } from "../../appModules"
import './index.scss'
import 'components/Layout/index.scss'
import NotConfirmed from 'apps/Registration/components/Registration/NotConfirmed';
import ls from 'local-storage';
import IframePage from "../../pages/IframePage";

class App extends PureComponent {
    resetFilters = () => {
        ls.remove('ClubsFiltersValues');
        ls.remove('FiltersValues');
    };
    componentDidMount() {
        window.addEventListener('beforeunload', this.resetFilters);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.resetFilters);
    }
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
                <Route exact={true} path='/organizations/national-breed-clubs' component={() => <IframePage src="http://tables.uep24.ru/Table/tblReestrNKP.aspx" />} />
                <Route exact={true} path='/organizations/clubs-and-unions' component={() => <IframePage src="http://tables.uep24.ru/Table/tblKinologClubSojuzy.aspx" />} />
                <Route exact={true} path='/organizations/nurseries' component={() => <IframePage src="http://tables.uep24.ru/Table/tblPitomniki.aspx" />} />
                <Route exact={true} path='/results/cac' component={() => <IframePage src="http://tables.uep24.ru/Table/tblResExhibitionCAC.aspx" />} />
                <Route component={LoadableNotFound} />
            </Switch>
        );
    }
}

export default App;