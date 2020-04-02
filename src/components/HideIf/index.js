import React from "react";

const HideIf = props => {
    let {cond, children, ...other} = props;
    return <div style={cond ? {display : 'none'} : {}} {...other}>{children}</div>;
}

export default HideIf;
