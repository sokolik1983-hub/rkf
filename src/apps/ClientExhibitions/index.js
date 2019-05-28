import React, {PureComponent} from "react"
import {Route, Switch, Link} from 'react-router-dom'
import ExhibitionsCreate from './components/Create'
import ExhibitionDetails from './containers/Details'
import ExhibitionList from './containers/List'
import {ClientExhibitionsPathContext} from './context'



const Edit = () => <div>exhibitions edit</div>

class ClientExhibitionsProxy extends PureComponent {
    render() {
        const {path} = this.props.match;
        return (
            <ClientExhibitionsPathContext.Provider value={{path}}>
                <Switch>
                    <Route path={`${path}/add`} component={ExhibitionsCreate}/>
                    <Route path={`${path}/:id/details`} component={ExhibitionDetails}/>
                    <Route path={`${path}`} component={ExhibitionList}/>
                </Switch>
            </ClientExhibitionsPathContext.Provider>
        );
    }
}


export default ClientExhibitionsProxy