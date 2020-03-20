import React, { useEffect, useState } from "react";
import Card from "../Card";
import "../MenuComponent/index.scss";

const CustomMenu = ({ children, title }) => (
        <Card className="menu-component">
            <h4 className="menu-component__title">{title}</h4>
            <ul className="menu-component__list">
                {children.map((c,i) => <li key={i} className="menu-component__item">
                    {c}
                </li>)}
            </ul>
        </Card>
)

export default React.memo(CustomMenu);
