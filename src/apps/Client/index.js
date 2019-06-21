import React, {PureComponent} from "react"
import ClientLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {ClientPathContext} from 'apps/Client/context'
import ClientExhibitions from 'apps/ClientExhibitions'
import UserProfile from 'apps/Auth/containers/UserProfile'
import ClientProfile from 'apps/ClientProfile'
import AuthOrLogin from 'apps/Auth/containers/AuthOrLogin'

class ClientProxy extends PureComponent {
    componentDidMount() {
        this.wrap = document.getElementById("wrap");
        this.wrap.classList.add('client_layout')
    }

    componentWillUnmount() {
        this.wrap.classList.remove('client_layout')
    }

    render() {
        const {path} = this.props.match;
        return (

            <ClientPathContext.Provider value={{path}}>
                <AuthOrLogin>
                    <ClientLayout>
                        <Switch>
                            <Route exact path={`${path}`} component={UserProfile}/>
                            <Route path={`${path}/profile`} component={ClientProfile}/>
                            <Route path={`${path}/exhibitions`} component={ClientExhibitions}/>

                        </Switch>
                    </ClientLayout>
                </AuthOrLogin>
            </ClientPathContext.Provider>

        );
    }
}


export default ClientProxy