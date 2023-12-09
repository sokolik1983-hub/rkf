import React, {useRef} from "react";
import {NavLink} from "react-router-dom";
import HorizontalSwipe from "../HorozintalSwipe";
import mobileMenuAccountPage from "../../utils/mobileMenuAccountPage"
import './styles.scss'



const HorizontalMenu = ({menu}) => {
    const wrap = useRef();
    const handleClick = (place, e) => {
        mobileMenuAccountPage(place, e.target, wrap.current)
    }
    return (
        <ul className="horizontal-menu" ref={wrap}>
            <HorizontalSwipe id="horizontal-menu__swipe">
                {
                    menu.map((navItem, index) =>
                        <li key={navItem.id}>
                            <NavLink
                                to={navItem.to}
                                exact={navItem.exact}
                                className={`${navItem.disabled ? ' _disabled' : ''}`}
                                activeClassName="active"
                            >
                                <span onClick={(e) => handleClick(index,e)}>{navItem.title}</span>
                            </NavLink>
                        </li>)
                }
            </HorizontalSwipe>
        </ul>
    )
}

export default HorizontalMenu;