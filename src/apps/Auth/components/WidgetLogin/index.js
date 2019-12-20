import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DropDownItem } from 'components/DropDownItem';
import Dropdown from 'components/Dropdown';
//import { UserIcon } from './UserIcon'
import { connectWidgetLogin } from 'apps/Auth/connectors';
import { LOGIN_URL } from 'appConfig';
import './index.scss';
import { connect } from "react-redux";

const DropInner = ({ logo_link }) => {
    const logo = logo_link ? logo_link : '/static/icons/default/club-avatar.svg';
    return <Fragment>
        <div className="widget-login__user-icon" style={{ backgroundImage: `url(${logo})` }}></div>
    </Fragment>
};

function WidgetLogin({ isAuthenticated, isActiveProfile, logOutUser, club_alias, club_alias_refreshed, club_name, authId, commonId, name, logo_link }) {
    // const clubName = name && name !== club_name ? name : club_name;
    const calculatedClubAlias = commonId && commonId === authId ? club_alias_refreshed || club_alias : club_alias; //косяк с club_alias_refreshed, поэтому небольшой костыль

    return isAuthenticated
        ? <Dropdown
            className="widget-login"
            position="right"
            closeOnClick={true}
            innerComponent={<DropInner logo_link={logo_link} />}
        >
            <span class="club-name">{club_name}</span>
            <DropDownItem>
                <Link to={isActiveProfile ? `/${calculatedClubAlias}` : "/not-confirmed"}>Личный кабинет</Link>
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
    name: state.client_club ? state.client_club.name : null,
    isActiveProfile: state.authentication ? state.authentication.is_active_profile : null,
    club_alias_refreshed: state.client_club ? state.client_club.club_alias : state.authentication.club_alias,
    authId: state.authentication ? state.authentication.profile_id : null,
    commonId: state.home_page ? state.home_page.club.common.id : null
});

export default connect(mapStateToProps)(connectWidgetLogin(WidgetLogin));
