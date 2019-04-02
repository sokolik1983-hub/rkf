
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from "./apps/App/index";
import configureStore from './store'


//Store
const store = configureStore({}, null);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('wrap')
);
registerServiceWorker();
