import React, {PureComponent} from "react"
import ClientLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {ClientPathContext} from 'apps/Client/context'
import ShowDemo from './components/ShowDemo'


class ClientProxy extends PureComponent {
    state = {
        path: this.props.match.path
    };


    render() {
        const {path} = this.props.match;
        console.log(path)
        return (

            <ClientPathContext.Provider value={{path: this.state.path}}>
                <ClientLayout>
                    <Switch>
                        <Route path={`${path}/show_demo`} component={ShowDemo}/>
                    </Switch>
                </ClientLayout>
            </ClientPathContext.Provider>

        );
    }
}


export default ClientProxy