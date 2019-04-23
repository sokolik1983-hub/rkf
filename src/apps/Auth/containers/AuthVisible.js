import {connect} from 'react-redux'

const AuthVisible = ({children, isAuthenticated}) =>
    isAuthenticated ?
        children
        :
        null;

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
});

export default connect(
    mapStateToProps,
)(AuthVisible)
