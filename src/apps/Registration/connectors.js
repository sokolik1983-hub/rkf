import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {registerUserSuccess} from './actions'
import {defaultReduxKey} from './config'

export const connectRegistrationForm = connect(
    state => ({registrationComplete: state[defaultReduxKey].registrationComplete}),
    dispatch =>
        bindActionCreators({
            registerUserSuccess
        }, dispatch)
)