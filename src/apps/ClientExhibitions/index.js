import React, {PureComponent} from "react"
import ClientLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {ClientPathContext} from 'apps/Client/context'


const Test=()=><div>s</div>
class ClientProxy extends PureComponent {

    render() {
        const {path} = this.props.match;
        return (

            <ClientPathContext.Provider value={{path}}>
                <ClientLayout>
                    <Switch>
                        <Route path={`${path}`} component={Test}/>
                    </Switch>
                </ClientLayout>
            </ClientPathContext.Provider>

        );
    }
}


export default ClientProxy