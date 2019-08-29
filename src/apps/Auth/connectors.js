import {connect} from 'react-redux'
import {selectIsAuthenticated} from './selectors'

export const connectAuthVisible = connect(
    selectIsAuthenticated,
);