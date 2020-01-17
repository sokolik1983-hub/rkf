import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SlideDownComponent from "../../../SlideDown";

const NavSublist = ({ navItem, setIsOpen }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false);
        setIsOpen(false);
    };

    return (
        <>
            <p className={`Header__nav-sublist-title${open ? ' _open' : ''}`}
                onClick={() => setOpen(!open)}>
                {navItem.title}
                <i className="icon-right-open" />
            </p>
            <SlideDownComponent open={open}>
                <ul className="Header__nav-sublist">
                    {navItem.children.map(item =>
                        <li className="Header__nav-subitem" key={item.id}>
                            {
                                item.children
                                    ? <NavSublist setIsOpen={setIsOpen} navItem={item} />
                                    : <NavLink to={item.to} exact={item.exact} onClick={handleClick}>{item.title}</NavLink>
                            }
                        </li>
                    )}
                </ul>
            </SlideDownComponent>
        </>
    )
};

export default React.memo(NavSublist);