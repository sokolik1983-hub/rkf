import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectIsAuthenticated, selectWidgetLogin } from "./selectors";
import { loginUserSuccess, logOutUser } from "./actions";

export const connectAuthVisible = connect(selectIsAuthenticated);

export const connectLogin = connect(
    null,
    dispatch => bindActionCreators({ loginUserSuccess }, dispatch)
);

export const connectWidgetLogin = connect(
    selectWidgetLogin,
    dispatch => bindActionCreators({ logOutUser }, dispatch)
);