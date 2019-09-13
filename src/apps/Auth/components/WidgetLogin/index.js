import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DropDownItem } from 'components/DropDownItem';
import Dropdown from 'components/Dropdown';
//import { UserIcon } from './UserIcon'
import { connectWidgetLogin } from 'apps/Auth/connectors';
import { UserLogin } from './UserLogin';
import { LOGIN_URL, REGISTER_URL } from 'appConfig';
import './index.scss';

const DropInner = ({ title = 'Личный кабинет' }) => (
    <Fragment>
        {/*<UserIcon/>*/}
        <UserLogin title={title} />
    </Fragment>
);

const Inner = () => (
    <div className="widget-login__auth-link">Личный кабинет</div>
);

function WidgetLogin({ isAuthenticated, logOutUser, club_alias, club_name }) {
    return isAuthenticated ? (
        <Dropdown
            className="widget-login"
            position="right"
            closeOnClick={true}
            innerComponent={<DropInner title={club_name} />}
        >
            <DropDownItem>
                <Link to={`/${club_alias}`}>Личный кабинет</Link>
            </DropDownItem>
            <DropDownItem onClick={logOutUser}>Выход</DropDownItem>
        </Dropdown>
    ) : (
        <Dropdown className="widget-login" innerComponent={<Inner />}>
            <DropDownItem>
                <Link to={LOGIN_URL}>Вход</Link>
            </DropDownItem>
            {/* <DropDownItem>
                <Link to={REGISTER_URL}>Регистрация</Link>
            </DropDownItem> */}
        </Dropdown>
    );
}

export default connectWidgetLogin(WidgetLogin);
