import React from "react";
import {Redirect} from "react-router-dom";
import {connectAuthVisible} from "../../connectors";
import {LOGIN_URL} from "../../../../appConfig";


const AuthOrLogin = ({children, isAuthenticated}) => (
    isAuthenticated ?
        children :
        <Redirect to={LOGIN_URL}/>
);

export default connectAuthVisible(React.memo(AuthOrLogin));