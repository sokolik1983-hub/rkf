import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DropDownItem } from 'components/DropDownItem';
import Dropdown from 'components/Dropdown';
//import { UserIcon } from './UserIcon'
import { connectWidgetLogin } from 'apps/Auth/connectors';
import { UserLogin } from './UserLogin';
import { LOGIN_URL, REGISTER_URL } from 'appConfig';
import './index.scss';
import { connect } from "react-redux";

const DropInner = ({ title = 'Личный кабинет' }) => (
    <Fragment>
        {/*<UserIcon/>*/}
        <UserLogin title={title} />
    </Fragment>
);

const Inner = () => (
    <div className="widget-login__auth-link">Личный кабинет</div>
);

function WidgetLogin({ isAuthenticated, isActiveProfile, logOutUser, club_alias, club_alias_refreshed, club_name, authId, commonId, name }) {
    // const clubName = name && name !== club_name ? name : club_name;
    const calculatedClubAlias = commonId && commonId === authId ? club_alias_refreshed || club_alias : club_alias; //косяк с club_alias_refreshed, поэтому небольшой костыль

    return isAuthenticated ? (
        <Dropdown
            className="widget-login"
            position="right"
            closeOnClick={true}
            innerComponent={<DropInner title={club_name} />}
        >
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
    ) : (
            <Dropdown className="widget-login" innerComponent={<Inner />}>
                <DropDownItem>
                    <Link to={LOGIN_URL}>Вход</Link>
                </DropDownItem>
                <DropDownItem>
                    <Link to={REGISTER_URL}>Регистрация</Link>
                </DropDownItem>
            </Dropdown>
        );
}

const mapStateToProps = state => ({
    name: state.client_club ? state.client_club.name : null,
    isActiveProfile: state.authentication ? state.authentication.is_active_profile : null,
    club_alias_refreshed: state.client_club ? state.client_club.club_alias : state.authentication.club_alias,
    authId: state.authentication ? state.authentication.profile_id : null,
    commonId: state.home_page ? state.home_page.club.common.id : null
});

export default connect(mapStateToProps)(connectWidgetLogin(WidgetLogin));
