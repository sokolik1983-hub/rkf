// import React from 'react'
import {connectAuthVisible} from "../../../pages/Login/connectors";

function AuthVisible({children, isAuthenticated}) {
    return isAuthenticated ?
        children
        :
        null
};


export default connectAuthVisible(AuthVisible)
