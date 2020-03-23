import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../404";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import DocApply from './components/DocApply';
import DocHome from './components/DocHome';
import "./index.scss";

const Docs = () => {
    const loading = false;
    const isError = false;
    return isError ?
        <PageNotFound /> :
        loading ?
            <Loading /> :
            <div className="docs-page">
                <Container className="docs-page__content">
                    <Switch>
                        <Route exact={true} path='/docs' component={() => <DocHome />} />
                        <Route exact={true} path='/docs/apply-litter' component={() => <DocApply />} />
                        <Route exact={true} path='/docs/apply-pedigree' component={() => <DocApply />} />
                    </Switch>
                </Container>
            </div>
};

export default React.memo(Docs);