import React, {PureComponent} from "react"
import {Route, Switch, Link} from 'react-router-dom'
import ExhibitionsCreate from './components/Create'
import {ClientExhibitionsPathContext} from './context'

const List = () => <ClientExhibitionsPathContext.Consumer>{
    ({path}) =>
        <div>

            <div style={{textAlign:'right'}}><Link className="btn btn-primary" to={`${path}/add`}>Создать выставку</Link></div>
            exhibitions list
        </div>
}

</ClientExhibitionsPathContext.Consumer>

const Edit = () => <div>exhibitions edit</div>

class ClientExhibitionsProxy extends PureComponent {
    render() {
        const {path} = this.props.match;
        return (
            <ClientExhibitionsPathContext.Provider value={{path}}>
                <Switch>
                    <Route path={`${path}/add`} component={ExhibitionsCreate}/>
                    <Route path={`${path}/:id/edit`} component={Edit}/>
                    <Route path={`${path}`} component={List}/>
                </Switch>
            </ClientExhibitionsPathContext.Provider>
        );
    }
}


export default ClientExhibitionsProxy