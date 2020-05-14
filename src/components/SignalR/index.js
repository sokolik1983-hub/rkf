import React, { useState, useEffect } from 'react';
import Alert from 'components/Alert';
import { isDevEnv } from 'utils';
import * as signalR from "@microsoft/signalr";

const SignalR = () => {
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const hubUrl = isDevEnv()
        ? 'http://dev.uep24.ru/api/hubs/deploy_hub'
        : 'https://rkf.online/api/hubs/deploy_hub';

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl,
                {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                }
            )
            .withAutomaticReconnect()
            //.configureLogging(signalR.LogLevel.Debug)
            .build();

        connection.on("display_notification", data => {
            setMessage(data);
            setAlert(true);
        });

        connection.start()
            //.then(() => console.log(connection))
            .catch(() => console.log('Error while establishing connection :('));
    }, []);

    const handleClose = () => {
        setMessage('');
        setAlert(false);
    };

    return alert &&
        <Alert
            title="Внимание!"
            text={message}
            onOk={() => handleClose(false)}
        />
};

export default SignalR;