import React from "react";
import {Switch, Route} from "react-router-dom";
import ls from "local-storage";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Home from "./pages/Home";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const UserDocuments = ({history, match, is_active_profile, isAuthenticated}) => {
    const userAlias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const isVisible = isAuthenticated && is_active_profile && match.params.id === userAlias;

    if(!isVisible) history.goBack();

    return (
        <Layout>
            <div className="user-documents">
                <Container className="user-documents__content content">
                    <Switch>

                        <Route component={() => <Home userAlias={userAlias}/>} />
                    </Switch>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(connectAuthVisible(UserDocuments));