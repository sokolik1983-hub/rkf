import React from "react";
import {Link} from "react-router-dom";
import {widgetLoginIcon} from "../../../../../appConfig";
import {Request} from "../../../../../utils/request";
import history from "../../../../../utils/history";


const MenuLinks = ({
    accountType,
    alias,
    is_active_profile,
    logInLogOut,
    loginUserSuccess,
    setOpen,
    setShowModal,
    userTypes,
}) => {
    const profileEdit = () => {
        return userTypes === 'user' ? `/user/${alias}/edit` :
            userTypes === 'club' ? '/client' :
            userTypes === 'federation' ? '/client' :
            userTypes === 'kennel' ? `/kennel/${alias}/edit` :
            userTypes === 'nbc' && `/nbc/${alias}/edit`;
    };

    const profileCabinet = () => {
        return userTypes === 'user' ? `/user/${alias}/documents` :
            userTypes === 'club' ? `/club/${alias}/documents/` :
            userTypes === 'federation' ? `/${alias}/documents/` :
            userTypes === 'kennel' ? `/kennel/${alias}/documents` :
            userTypes === 'nbc' && `/nbc/${alias}/documents`;
    };

    const profilePage = () => {
        return userTypes === 'user' ? `/user/${alias}` :
            userTypes === 'club' ? is_active_profile ? `/club/${alias}` : '/not-confirmed' :
            userTypes === 'federation' ? is_active_profile ? `/${alias}` : '/not-confirmed' :
            userTypes === 'nbc' ? is_active_profile ? `/nbc/${alias}` : '/not-confirmed' :
            userTypes === 'kennel' && is_active_profile ? `/kennel/${alias}` : '/kennel/activation';
    };

    const loginItem = () => {
        return logInLogOut === 'in' ? () => setShowModal(true) : () => logoutAsUser();
    };

    const logoutAsUser = async () => {
        await Request({
            url: '/api/administration/authentication/logout',
            method: 'POST'
        }, data => {
            loginUserSuccess(data);
            history.replace('/');
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    return (
        <menu>
            <li className="widget-login__item" onClick={() => setOpen(false)}>
                <Link to={profileEdit} >
                    {widgetLoginIcon.editProfile}
                    Редактировать профиль
                </Link>
            </li>
            <li className="widget-login__item" onClick={() => setOpen(false)}>
                <Link to={profileCabinet} >
                    {widgetLoginIcon.lk}
                    Личный кабинет
                </Link>
            </li>
            <li className="widget-login__item" onClick={() => setOpen(false)}>
                <Link to={profilePage} >
                    {widgetLoginIcon.profile}
                    Страница {
                        userTypes === 'user' ? 'пользователя' :
                        userTypes === 'club' ? 'клуба' :
                        userTypes === 'federation' ? 'федерации' :
                        userTypes === 'kennel' ? 'питомника' :
                        userTypes === 'nbc' && 'НКП'}
                </Link>
            </li>
            {accountType === 5 &&
                <li className="widget-login__item" onClick={() => setOpen(false)}>
                    <span onClick={loginItem()}>
                        {widgetLoginIcon.exitInClub}
                        {logInLogOut === 'in' ? 'Войти в аккаунт клуба' : 'Выйти из аккаунта клуба'}
                    </span>
                </li>
            }
        </menu>
    );
};

export default MenuLinks;
