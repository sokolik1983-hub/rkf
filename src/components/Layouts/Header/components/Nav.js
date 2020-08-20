import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { mainNavIcons } from "../../../../appConfig";
import Tooltip from "@material-ui/core/Tooltip";
import Feedback from "../../../Feedback";
import { connectAuthVisible } from "../../../../pages/Login/connectors";

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#fffeff',
        color: '#72839c',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        boxShadow: '0px 4px 25px rgba(51, 102, 255, 0.15)',
        lineHeight: 1,
        paddingBottom: 6,
    },
}))(Tooltip);

const Nav = ({isAuthenticated}) => {

    return (
        <nav className="header__nav">
            <ul className="header__nav-list">
                {mainNavIcons.map(icon =>
                    <li className={`header__nav-item ${icon.disabled ? `disabled` : ``}`} key={icon.id}>
                        <LightTooltip title={icon.title} enterDelay={200} leaveDelay={200}>
                            <NavLink className={icon.disabled ? `_disabled` : ``} to={icon.to} exact={icon.exact}>
                                {icon.image}
                            </NavLink>
                        </LightTooltip>
                    </li>
                )}
            </ul>
            {!isAuthenticated ? <div className="header__nav-item _feedback">
                <Feedback isMainNav={true} />
            </div> : ``}
        </nav>
    )
};

export default React.memo(connectAuthVisible(Nav));