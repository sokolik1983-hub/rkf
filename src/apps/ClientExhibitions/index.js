import React, {PureComponent} from "react"
import {Route, Switch} from 'react-router-dom'

const List = () => <div>exhibitions list</div>
const Create = () => <div>exhibitions create</div>
const Edit = () => <div>exhibitions edit</div>

class ClientExhibitionsProxy extends PureComponent {
    render() {
        const {path} = this.props.match;
        return (
                <Switch>
                    <Route path={`${path}/new`} component={Create}/>
                    <Route path={`${path}/:id/edit`} component={Edit}/>
                    <Route path={`${path}`} component={List}/>
                </Switch>
        );
    }
}


export default ClientExhibitionsProxy