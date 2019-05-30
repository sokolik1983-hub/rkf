import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from "./apps/App/index";
import configureStore from './store'
import history from 'utils/history';
import {ConnectedRouter} from 'connected-react-router';
//Store
const store = configureStore({}, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('wrap')
);
registerServiceWorker();
