import React from "react";
import {Switch, Route} from "react-router-dom";
import ls from "local-storage";
import Layout from "../../components/Layouts";
import Home from "./pages/Home";
import {connectAuthVisible} from "../Login/connectors";
import HorizontalMenu from "../../components/HorizontalMenu";
import {userNav} from "./config";
import useIsMobile from "../../utils/useIsMobile";
import "./index.scss";


const UserDocuments = ({history, match, is_active_profile, isAuthenticated}) => {
    const userAlias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const isVisible = isAuthenticated && is_active_profile && match.params.id === userAlias;
    const isMobile = useIsMobile(1080);

    if(!isVisible) history.goBack();

    return (
        <Layout className="user-documents">


            <div className="container user-documents__horizontal-menu">
                { isMobile && <HorizontalMenu menu={userNav(userAlias).filter(item => item.id !== 4 && item.id !== 3 && item.id !== 8)} />}
            </div>
            <Switch>

                {/*Здесь страницы без меню*/}
                <Route component={() => <Home userAlias={userAlias} history={history}/>} /> {/*Все страницы с меню*/}
            </Switch>
        </Layout>
    )
};

export default React.memo(connectAuthVisible(UserDocuments));