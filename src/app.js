import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import App from "./app/index";
import configureStore from "./store";
import {unregister} from "./registerServiceWorker";
import history from "./utils/history";
import ScrollToTop from "./utils/ScrollToTop";
import SignalR from 'components/SignalR';


//Store
export const store = configureStore({}, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop>
                <App/>
                <SignalR />
            </ScrollToTop>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('wrap')
);
unregister();
