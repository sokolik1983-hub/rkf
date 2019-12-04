import React from "react";
import './index.scss';

const Aside = ({ children, className }) => (
    <aside className={`side${className ? ' ' + className : ''}`}>
        {children}
    </aside>
);

export default Aside;