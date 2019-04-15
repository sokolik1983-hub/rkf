import React, {Component, Fragment} from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'
import Container from 'components/Layout/Container'

import {appRoutes} from 'appConfig'

import 'components/Layout/index.scss'

class App extends Component {
    renderRoutes = () => {
        return appRoutes.length > 0 ?
            appRoutes.map(route =>
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                />
            )
            : null
    };

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header/>
                    <Container className="container--content">
                        <Switch>
                            {this.renderRoutes()}
                        </Switch>
                    </Container>
                    <Footer/>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;