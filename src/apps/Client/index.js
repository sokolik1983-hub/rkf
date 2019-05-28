import React, {PureComponent} from "react"
import ClientLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {ClientPathContext} from 'apps/Client/context'
import ClientExhibitions from 'apps/ClientExhibitions'

const Test=()=><div>Client Home</div>
class ClientProxy extends PureComponent {
    componentDidMount(){
        this.wrap=document.getElementById("wrap");
        this.wrap.classList.add('client_layout')
    }
    componentWillUnmount(){
        this.wrap.classList.remove('client_layout')
    }
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