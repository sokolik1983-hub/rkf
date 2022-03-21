import React from "react";
import {Link} from "react-router-dom";
import {widgetLoginIcon} from "../../../../../appConfig";
import {Request} from "../../../../../utils/request";
import history from "../../../../../utils/history";


const MenuLinks = ({
    alias,
    setOpen,
    logInLogOut,
    userTypes,
    accountType,
    setShowModal,
    loginUserSuccess,
    is_active_profile,
}) => {
    let profileEdit,
        profileCabinet,
        profilePage,
        profileType,
        text,
        method

    switch (userTypes){
        case 'user':
            profileEdit = `/user/${alias}/edit`;
            profileCabinet = `/user/${alias}/documents`;
            profilePage = `/user/${alias}`;
            profileType = 'пользователя';
            break;
        case 'club':
            profileEdit = '/client';
            profileCabinet = `/club/${alias}/documents/`;
            profilePage = is_active_profile ? `/club/${alias}` : '/not-confirmed';
            profileType = 'клуба';
            break;
        case 'federation':
            profileEdit = '/client';
            profileCabinet = `/${alias}/documents/`;
            profilePage = is_active_profile ? `/${alias}` : '/not-confirmed';
            profileType = 'федерации';
            break;
        case 'kennel':
            profileEdit = `/kennel/${alias}/edit`;
            profileCabinet = `/kennel/${alias}/documents`;
            profilePage = is_active_profile ? `/kennel/${alias}` : '/kennel/activation';
            profileType = 'питомника';
            break;
        default:
            break;
    }

    switch (logInLogOut){
        case 'in':
            text = 'Войти в аккаунт клуба';
            method = () => setShowModal(true);
            break;
        case 'out':
            text = 'Выйти из аккаунта клуба';
            method = () => logoutAsUser();
            break;
        default:
            break;
    }

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
                <Link to={profileEdit} >{widgetLoginIcon.editProfile}Редактировать профиль</Link>
            </li>
            <li className="widget-login__item" onClick={() => setOpen(false)}>
                <Link to={profileCabinet} >{widgetLoginIcon.lk}Личный кабинет</Link>
            </li>
            <li className="widget-login__item" onClick={() => setOpen(false)}>
                <Link to={profilePage} >{widgetLoginIcon.profile}Страница {profileType}</Link>
            </li>
            {accountType === 5 &&
                <li className="widget-login__item" onClick={() => setOpen(false)}>
                    <span onClick={method}>{widgetLoginIcon.exitInClub}{text}</span>
                </li>
            }
        </menu>
    );
};

export default MenuLinks;
