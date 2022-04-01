import React, {useEffect} from "react";
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

const Application = () => {
    useEffect(() => {
        if(!process || !process.env || process.env.NODE_ENV !== 'development') {
            //Яндекс метрика
            let yMeta = document.createElement('meta');
            yMeta.name = 'yandex-verification';
            yMeta.content = '0de4b2cf66676a4d';
            document.head.append(yMeta);
            let yMetrika = document.createElement('script');
            yMetrika.innerHTML = `
                (function (m, e, t, r, i, k, a) {
                  m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                  m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
                ym(61376485, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true
                });
            `;
            document.body.append(yMetrika);

            //Google аналитика
            /*const gAnalyticsSrc = document.createElement('script');
            gAnalyticsSrc.src = 'https://www.googletagmanager.com/gtag/js?id=UA-152896404-5';
            document.body.append(gAnalyticsSrc);

            let gAnalytics = document.createElement('script');
            gAnalytics.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-152896404-5');
            `;
            document.body.append(gAnalytics);*/
        }
    }, []);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ScrollToTop>
                    <App/>
                    <SignalR />
                </ScrollToTop>
            </ConnectedRouter>
        </Provider>
    )
};

ReactDOM.render(<Application/>, document.getElementById('wrap'));
unregister();
