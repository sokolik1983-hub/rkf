import React from "react";
import {Switch, Route} from "react-router-dom";
import ls from "local-storage";
import Layout from "../../components/Layouts";
import Home from "./pages/Home";
import {connectAuthVisible} from "../Login/connectors";


const UserDocuments = ({history, match, is_active_profile, isAuthenticated}) => {
    const userAlias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const isVisible = isAuthenticated && is_active_profile && match.params.id === userAlias;

    if(!isVisible) history.goBack();

    return (
        <Layout>
            <Switch>

                <Route component={() => <Home userAlias={userAlias} history={history}/>} /> {/*Все страницы с меню и баннером*/}
            </Switch>
        </Layout>
    )
};

export default React.memo(connectAuthVisible(UserDocuments));