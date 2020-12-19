import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ls from "local-storage";
import { Request, getHeaders } from "../utils/request";
import { appRoutes } from "../appConfig";
import IframePage from "../pages/Static/IframePage";
import { LoadableNotFound } from "../appModules";
import * as signalR from "@microsoft/signalr";
import { isDevEnv } from 'utils';
import NotificationsContext from './context';
import "./kendo.scss";
import "./index.scss";



const App = ({ history }) => {
    const [pushedNotification, setPushedNotification] = useState({ value: '', hasNewMessage: false });

    const hubUrl = isDevEnv()
        ? 'http://dev.uep24.ru/api/hubs/user_hub'
        : 'https://rkf.online/api/hubs/user_hub';

    const connectToUserHub = () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl,
                {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                    accessTokenFactory: () => getHeaders().Authorization.substring(7)
                }
            )
            .withAutomaticReconnect()
            .build();

        connection.on("sendToUser", (title, data) => {
            setPushedNotification({
                ...pushedNotification,
                value: data
            });
        });

        connection.start()
            .catch(() => console.log('Error while establishing connection :('))
            .then(function () {
                connection.invoke('GetConnectionId').then(function (data) {
                    setPushedNotification({
                        ...pushedNotification,
                        hasNewMessage: JSON.parse(data).has_new
                    });
                })
            })
    }

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
        //connectToUserHub();
        const unlisten = history.listen(() => checkAlias());

        window.addEventListener('beforeunload', resetFilters);

        return () => {
            window.removeEventListener('beforeunload', resetFilters);
            unlisten();
        }
    }, []);

    return (
        <NotificationsContext.Provider value={pushedNotification}>
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
        </NotificationsContext.Provider>
    )
};

export default React.memo(withRouter(App));