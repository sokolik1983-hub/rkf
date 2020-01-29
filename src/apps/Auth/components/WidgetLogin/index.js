import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Dropdown from 'components/Dropdown';
import { DropDownItem } from 'components/DropDownItem';
import { LOGIN_URL } from 'appConfig';
import ls from 'local-storage';
import { connectWidgetLogin } from 'apps/Auth/connectors';
import './index.scss';


const WidgetLogin = ({ isAuthenticated, isActiveProfile, logOutUser, logo_link }) => {
    const clubAlias = ls.get('user_info') ? ls.get('user_info').club_alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').club_name : '';
    const clubLogo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;

    return isAuthenticated
        ? <Dropdown
            className="widget-login"
            position="right"
            closeOnClick={true}
            innerComponent={
                <div className="widget-login__user-icon"
                    style={{ backgroundImage: `url(${clubLogo ? clubLogo : '/static/icons/default/club-avatar.svg'})` }}
                />
            }
        >
            <span className="club-name">{clubName}</span>
            <DropDownItem>
                <Link to={isActiveProfile ? `/${clubAlias}` : "/not-confirmed"}>Личный кабинет</Link>
            </DropDownItem>
            {isActiveProfile && <DropDownItem><Link to="/reports">Отчёты</Link></DropDownItem>}
            <DropDownItem>
                <Link to={'/'} onClick={logOutUser}>Выход</Link>
            </DropDownItem>
        </Dropdown>
        : <Link className="login-link" to={LOGIN_URL}>Войти</Link>
};

const mapStateToProps = state => ({
    isActiveProfile: state.authentication ? state.authentication.is_active_profile : null,
});

export default connect(mapStateToProps)(connectWidgetLogin(WidgetLogin));
