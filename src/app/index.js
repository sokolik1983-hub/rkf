import React, {useEffect} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import ls from "local-storage";
import {Request} from "../utils/request";
import {appRoutes} from "../appConfig";
import IframePage from "../pages/Static/IframePage";
import {LoadableNotFound} from "../appModules";
import "./index.scss";


const App = ({history}) => {
    const resetFilters = () => {
        ls.remove('ClubsFiltersValues');
        ls.remove('FiltersValues');
    };

    const checkAlias = () => {
        ls.get('profile_id') &&
        Request({
            url: `/api/Alias/profile/${ls.get('profile_id')}`
        }, result => {
            if (result.alias_name !== ls.get('user_info').club_alias) { // Updating club alias if it changed
                ls.set('user_info', { ...ls.get('user_info'), club_alias: result.alias_name });
            }
        });
    };

    useEffect(() => {
        checkAlias();

        history.listen(() => checkAlias());

        window.addEventListener('beforeunload', resetFilters);

        return () => window.removeEventListener('beforeunload', resetFilters);
    }, []);

    return (
        <Switch>
            {!!appRoutes.length && appRoutes.map(route =>
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                />
            )}
            <Route exact={true} path='/organizations/national-breed-clubs' component={() => <IframePage src="http://tables.uep24.ru/Table/tblReestrNKP.aspx" />} />
            <Route exact={true} path='/organizations/clubs-and-unions' component={() => <IframePage src="http://tables.uep24.ru/Table/tblKinologClubSojuzy.aspx" />} />
            <Route exact={true} path='/organizations/nurseries' component={() => <IframePage src="http://tables.uep24.ru/Table/tblPitomniki.aspx" />} />
            <Route exact={true} path='/results/cac' component={() => <IframePage src="http://tables.uep24.ru/Table/tblResExhibitionCAC.aspx" />} />
            <Route exact={true} path='/results/cacib' component={() => <IframePage src="http://tables.uep24.ru/Table/tblResExhibitionCACIB.aspx" />} />
            <Route component={LoadableNotFound} />
        </Switch>
    )
};

export default React.memo(withRouter(App));