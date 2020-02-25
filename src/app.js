import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import App from "./app/index";
import configureStore from "./store";
import registerServiceWorker from "./registerServiceWorker";
import history from "./utils/history";
import ScrollToTop from "./utils/ScrollToTop";


//Store
const store = configureStore({}, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop>
                <App/>
            </ScrollToTop>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('wrap')
);
registerServiceWorker();