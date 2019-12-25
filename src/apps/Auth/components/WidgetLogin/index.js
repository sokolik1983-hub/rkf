import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DropDownItem } from 'components/DropDownItem';
import Dropdown from 'components/Dropdown';
import { connectWidgetLogin } from 'apps/Auth/connectors';
import { LOGIN_URL } from 'appConfig';
import './index.scss';
import { connect } from "react-redux";
import ls from 'local-storage';

const DropInner = ({ logo_link }) => {
    const logo = logo_link ? logo_link : '/static/icons/default/club-avatar.svg';
    return <Fragment>
        <div className="widget-login__user-icon" style={{ backgroundImage: `url(${logo})` }}></div>
    </Fragment>

};

function WidgetLogin({ isAuthenticated, isActiveProfile, logOutUser, logo_link }) {
    // const clubName = name && name !== club_name ? name : club_name;
    //const calculatedClubAlias = commonId && commonId === authId ? club_alias_refreshed || club_alias : club_alias; //косяк с club_alias_refreshed, поэтому небольшой костыль
    const clubAlias = ls.get('user_info') ? ls.get('user_info').club_alias : '';
    const clubName = ls.get('user_info') ? ls.get('user_info').club_name : '';

    return isAuthenticated
        ? <Dropdown
            className="widget-login"
            position="right"
            closeOnClick={true}
            innerComponent={<DropInner logo_link={logo_link} />}
        >
            <span className="club-name">{clubName}</span>
            <DropDownItem>
                <Link to={isActiveProfile ? `/${clubAlias}` : "/not-confirmed"}>Личный кабинет</Link>
            </DropDownItem>
            {
                isActiveProfile
                    ? <DropDownItem><Link to="/reports">Отчёты</Link></DropDownItem>
                    : null
            }
            <DropDownItem>
                <Link to={'/'} onClick={logOutUser}>Выход</Link>
            </DropDownItem>
        </Dropdown>
        : <Link className="login-link" to={LOGIN_URL}>Вход</Link>;
}

const mapStateToProps = state => ({
    isActiveProfile: state.authentication ? state.authentication.is_active_profile : null,
});

export default connect(mapStateToProps)(connectWidgetLogin(WidgetLogin));
