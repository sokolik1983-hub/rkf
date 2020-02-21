import React from "react";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const AuthLayout = ({img = DEFAULT_IMG.authPicture, className, children}) => (
    <div className={`auth-layout${className ? ' ' + className : ''}`}>
        <div className="auth-layout__img" style={{backgroundImage:`url(${img})`}}/>
        <div className="auth-layout__content">{children}</div>
    </div>
);

export default React.memo(AuthLayout);