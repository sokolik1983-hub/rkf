import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import WidgetLogin from 'apps/Auth/components/WidgetLogin'
import {
    logOutUser
} from 'apps/Auth/actions'
import {bindActionCreators} from "redux";

class HeaderLogin extends PureComponent {

    render() {
        const {isAuthenticated, logOutUser} = this.props;
        return <WidgetLogin logOutUser={logOutUser} isAuthenticated={isAuthenticated}/>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        logOutUser
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderLogin)