import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectIsAuthenticated, selectWidgetLogin, selectCreateArticleForm } from './selectors';
import { logOutUser } from './actions';

export const connectAuthVisible = connect(selectIsAuthenticated);
export const connectClubArticleForm = connect(selectCreateArticleForm);

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