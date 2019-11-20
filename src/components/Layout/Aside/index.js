import React from "react";
import './index.scss'

const Aside = ({children, className}) => <aside className={className ? className : ''}>{children}</aside>;

export default Aside;