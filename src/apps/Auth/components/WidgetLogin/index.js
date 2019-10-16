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

function WidgetLogin({ isAuthenticated, isActiveProfile, logOutUser, club_alias, club_name, name }) {
    // const clubName = name && name !== club_name ? name : club_name;

    return isAuthenticated ? (
        <Dropdown
            className="widget-login"
            position="right"
            closeOnClick={true}
            innerComponent={<DropInner title={club_name} />}
        >
            <DropDownItem>
                <Link to={isActiveProfile ? `/${club_alias}` : "/not-confirmed"}>Личный кабинет</Link>
            </DropDownItem>
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
    isActiveProfile: state.authentication ? state.authentication.is_active_profile : null
});

export default connect(mapStateToProps)(connectWidgetLogin(WidgetLogin));
