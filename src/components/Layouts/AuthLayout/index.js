import React from "react";
import Container from "../Container";
import "./index.scss";


const AuthLayout = ({className, children}) => (
    <Container className="content">
        <div className={`auth-layout${className ? ' ' + className : ''}`}>
            <div className="auth-layout__content">
                {children}
            </div>
        </div>
    </Container>
);

export default React.memo(AuthLayout);