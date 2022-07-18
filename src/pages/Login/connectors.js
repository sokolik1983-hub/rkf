import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {selectIsAuthenticated, selectUserInfo, selectWidgetLogin} from "./selectors";
import {loginUserSuccess, logOutUser, updateUserInfo} from "./actions";


export const connectAuthVisible = connect(selectIsAuthenticated);

export const connectLogin = connect(
    null,
    dispatch => bindActionCreators({ loginUserSuccess }, dispatch)
);

export const connectWidgetLogin = connect(
    selectWidgetLogin,
    dispatch => bindActionCreators({logOutUser, loginUserSuccess}, dispatch)
);

export const connectAuthUserInfo = connect(
    selectUserInfo,
    dispatch => bindActionCreators({updateUserInfo}, dispatch)
);