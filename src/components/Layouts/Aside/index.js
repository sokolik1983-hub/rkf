import React from "react";
import Card from "../../Card";
import './index.scss';

const Aside = ({children, className}) => (
    <aside className={`side${className ? ' ' + className : ''}`}>
        <Card>
            {children}
        </Card>
    </aside>
);

export default Aside;