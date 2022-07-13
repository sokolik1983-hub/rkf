import React, {memo, useCallback, useEffect} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import ls from "local-storage";
import NotificationsProvider from "./context";
import Header from "../components/Layouts/Header";
import FooterMenu from "../components/Layouts/FooterMenu";
import IframePage from "../pages/Static/IframePage";
import {appRoutes} from "../appConfig";
import {LoadableNotFound} from "../appModules";
import {Request} from "../utils/request";
import useIsMobile from "../utils/useIsMobile";
import "./kendo.scss";
import "./index.scss";


const App = ({history}) => {
    const isMobile1080 = useIsMobile(1080);

    const resetFilters = useCallback(() => {
        ls.remove('ClubsFiltersValues');
        ls.remove('FiltersValues');
    }, []);

    const checkAlias = useCallback(() => {
        const profileId = ls.get('profile_id');

        if(profileId) {
            const userInfo = ls.get('user_info') || {};

            Request({
                url: `/api/Alias/profile/${profileId}`
            }, result => {
                if (result.alias_name !== userInfo.alias) { //Перезаписываем алиас, если тот изменился
                    ls.set('user_info', { ...userInfo, alias: result.alias_name });
                }
            });
        }
    }, []);

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
            <Header />
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
            {isMobile1080 &&
                <FooterMenu />
            }
        </NotificationsProvider>
    )
};

export default memo(withRouter(App));