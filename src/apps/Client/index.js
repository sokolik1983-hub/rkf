import React, {PureComponent} from "react"
import ClientLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {ClientPathContext} from 'apps/Client/context'
import ClientExhibitions from 'apps/ClientExhibitions'

const Test=()=><div>Client Home</div>
class ClientProxy extends PureComponent {

    render() {
        const {path} = this.props.match;
        return (

            <ClientPathContext.Provider value={{path}}>
                <ClientLayout>
                    <Switch>
                        <Route exact path={`${path}`} component={Test}/>
                        <Route path={`${path}/exhibitions`} component={ClientExhibitions}/>

                    </Switch>
                </ClientLayout>
            </ClientPathContext.Provider>

        );
    }
}


export default ClientProxy