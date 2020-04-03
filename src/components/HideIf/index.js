import React from "react";

const HideIf = props => {
    let {cond, children, ...other} = props;
    return cond ? (<div style={{display : 'none'}} {...other}>{children}</div>) : <>{children}</>;
}

export default HideIf;
