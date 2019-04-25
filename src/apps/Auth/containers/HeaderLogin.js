import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import WidgetLogin from 'apps/Auth/components/WidgetLogin'

class HeaderLogin extends PureComponent {

    render() {
        const {isAuthenticated} = this.props;
        return <WidgetLogin isAuthenticated={isAuthenticated}/>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
});

export default connect(
    mapStateToProps
)(HeaderLogin)