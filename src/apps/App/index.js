import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import { Request } from "utils/request";
import { appRoutes } from 'appConfig'
import { LoadableNotFound } from "../../appModules"
import './index.scss'
import 'components/Layout/index.scss'
import NotConfirmed from 'apps/Registration/components/Registration/NotConfirmed';
import ls from 'local-storage';
import IframePage from "../../pages/Static/IframePage";


class App extends PureComponent {
    constructor(props) {
        super(props);
        this.props.history.listen(() => {
            this.checkAlias();
        });
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.resetFilters);
        this.checkAlias();
    };

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.resetFilters);
    };

    resetFilters = () => {
        ls.remove('ClubsFiltersValues');
        ls.remove('FiltersValues');
    };

    checkAlias = () => {
        ls.get('profile_id') &&
            Request({
                url: `/api/Alias/profile/${ls.get('profile_id')}`,
                method: "GET"
            }, (result) => {
                if (result.alias_name !== ls.get('user_info').club_alias) { // Updating club alias if it changed
                    ls.set('user_info', { ...ls.get('user_info'), club_alias: result.alias_name });
                }
            });
    };

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
                <Route exact={true} path='/results/cacib' component={() => <IframePage src="http://tables.uep24.ru/Table/tblResExhibitionCACIB.aspx" />} />
                <Route component={LoadableNotFound} />
            </Switch>
        );
    }
}

export default withRouter(App);