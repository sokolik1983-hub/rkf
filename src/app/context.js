
import React, { useState } from 'react';
import * as signalR from "@microsoft/signalr";
import { isDevEnv } from 'utils';
import { getHeaders } from "../utils/request";
import { connectAuthVisible } from "pages/Login/connectors";

export const NotificationsContext = React.createContext(null);

const hubUrl = isDevEnv()
    ? 'https://notification.stage.uep24.ru/api/hubs/user_hub'
    : 'https://rkf.online/api/hubs/user_hub';

const NotificationsProvider = ({ isAuthenticated, children }) => {
    const [pushedNotification, setPushedNotification] = useState({ value: '', hasNewMessage: false });
    const [currentConnection, setCurrentConnection] = useState(null);

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
                if (connection.state === 'Connected') {
                    connection.invoke('GetConnectionId').then(function (data) {
                        setPushedNotification({
                            ...pushedNotification,
                            hasNewMessage: JSON.parse(data).has_new
                        });
                    })
                }
            })
        setCurrentConnection(connection);
    }

    if (isAuthenticated) {
        !currentConnection && connectToUserHub();
    } else {
        if (currentConnection) {
            setCurrentConnection(null);
            currentConnection.stop();
        }
    }

    return (
        <NotificationsContext.Provider value={{
            notification: pushedNotification
        }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export default connectAuthVisible(NotificationsProvider);