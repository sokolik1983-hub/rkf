import React from 'react'
import {connectAuthVisible} from 'apps/Auth/connectors'

function AuthVisible({children, isAuthenticated}) {
    return isAuthenticated ?
        children
        :
        null
};


export default connectAuthVisible(AuthVisible)
