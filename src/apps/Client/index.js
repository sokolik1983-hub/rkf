import React, {Component} from "react"
import ClientLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {ClientPathContext} from 'apps/Client/context'


const Temp = () => <div>client</div>;

class Client extends Component {
    state = {
        path: this.props.match.path
    };


    render() {

        return (

            <ClientPathContext.Provider value={{path: this.state.path}}>
                <ClientLayout>
                    <Switch>
                        <Route path={`${this.state.path}/`} component={Temp}/>
                    </Switch>
                </ClientLayout>
            </ClientPathContext.Provider>

        );
    }
}


export default Client