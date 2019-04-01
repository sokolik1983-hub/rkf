import Loadable from "react-loadable";
import Loading from 'components/Loading'


export const LoadableDemo = Loadable({
    loader: () => import(/* webpackChunkName: "app.demo" */ './apps/Demo/index'),
    loading: Loading,
});

