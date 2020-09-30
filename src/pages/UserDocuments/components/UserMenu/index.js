import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Alert from "../../../../components/Alert";
import {userNav} from "../../config";
import "./index.scss";


const UserMenu = ({alias}) => {
    const [alert, setAlert] = useState(false);

    const clickOnDisabledLink = e => {
        e.preventDefault();
        setAlert(true);
    };

    return (
        <div className="user-nav">
            <ul className="user-nav__list">
                {userNav(alias).map(navItem =>
                    <li className="user-nav__item" key={navItem.id}>
                        <NavLink
                            to={navItem.to}
                            exact={true}
                            className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                            onClick={e => navItem.disabled ? clickOnDisabledLink(e) : null}
                        >
                            {navItem.icon}
                            <span>{navItem.title}</span>
                        </NavLink>
                    </li>
                )}
            </ul>
            {alert &&
                <Alert
                    title="Внимание!"
                    text="Раздел находится в разработке."
                    autoclose={1.5}
                    onOk={() => setAlert(false)}
                />
            }
        </div>
    )
};

export default React.memo(UserMenu);