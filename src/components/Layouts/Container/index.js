import React from "react";
import './index.scss';

const Container = ({className, children}) => (
    <div className={`container${className ? ' ' + className : ''}`}>
        {children}
    </div>
);

export default Container;