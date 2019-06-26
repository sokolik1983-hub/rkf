import React, {PureComponent} from "react"
import DogOwnerLayout from './components/Layout'
import {Route, Switch} from 'react-router-dom'
import {DogOwnerPathContext} from 'apps/DogOwner/context'
import AuthOrLogin from 'apps/Auth/containers/AuthOrLogin'
import DogOwnerHome from 'apps/DogOwner/components/Home'

class DogOwnerProxy extends PureComponent {
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

            <DogOwnerPathContext.Provider value={{path}}>
                <AuthOrLogin>
                    <DogOwnerLayout>
                        <Switch>
                            <Route exact path={`${path}`} component={DogOwnerHome}/>
                        </Switch>
                    </DogOwnerLayout>
                </AuthOrLogin>
            </DogOwnerPathContext.Provider>

        );
    }
}


export default DogOwnerProxy