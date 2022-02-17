import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ls from "local-storage";
import { Request } from "../utils/request";
import { appRoutes } from "../appConfig";
import IframePage from "../pages/Static/IframePage";
import { LoadableNotFound } from "../appModules";
import NotificationsProvider from './context';
import {useSelector} from "react-redux";
import Header from "../components/Layouts/Header";

import "./kendo.scss";
import "./index.scss";
import FooterMenu from "../components/Layouts/FooterMenu";


const App = ({history}) => {
    const layout = useSelector(state => state.layout);

    const {isOpen, setIsOpen} = useState(layout?.isOpen);

    const resetFilters = () => {
        ls.remove('ClubsFiltersValues');
        ls.remove('FiltersValues');
    };

    const checkAlias = () => {
        ls.get('profile_id') &&
            Request({
                url: `/api/Alias/profile/${ls.get('profile_id')}`
            }, result => {
                if (result.alias_name !== ls.get('user_info').alias) { // Updating club alias if it changed
                    ls.set('user_info', { ...ls.get('user_info'), alias: result.alias_name });
                }
            });
    };

    useEffect(() => {
        checkAlias();
        const unlisten = history.listen(() => checkAlias());

        window.addEventListener('beforeunload', resetFilters);

        return () => {
            window.removeEventListener('beforeunload', resetFilters);
            unlisten();
        }
    }, []);

    return (
        <NotificationsProvider>
            <Header withFilters={layout?.withFilters} login_page={layout?.login_page} isOpen={isOpen} />
            <Switch>
                {!!appRoutes.length && appRoutes.map(route =>
                    <Route
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                    />
                )}
                <Route exact={true} path='/results/cac' component={() => <IframePage src="https://tables.rkf.org.ru/Table/tblResExhibitionCAC.aspx" />} />
                <Route exact={true} path='/results/cacib' component={() => <IframePage src="https://tables.rkf.org.ru/Table/tblResExhibitionCACIB.aspx" />} />
                <Route component={LoadableNotFound} />
            </Switch>
            <FooterMenu login_page={layout?.login_page} isOpen={isOpen} />
        </NotificationsProvider>
    )
};

export default React.memo(withRouter(App));