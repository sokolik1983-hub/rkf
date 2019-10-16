import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectIsAuthenticated, selectWidgetLogin } from './selectors';
import { logOutUser } from './actions';

export const connectAuthVisible = connect(selectIsAuthenticated);

export const connectWidgetLogin = connect(
    selectWidgetLogin,
    dispatch =>
        bindActionCreators(
            {
                logOutUser
            },
            dispatch
        )
);
