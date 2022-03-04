import React, {useState, useEffect} from "react";
import {isFederationAlias} from "../../utils";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import useIsMobile from "../../utils/useIsMobile";
import {endpointGetClubInfo} from "../../pages/Club/config";
import {endpointGetUserInfo} from "../Layouts/UserLayout/config";
import {Request} from "../../utils/request";
import {clubNav} from "../../pages/Club/config";
import {kennelNav} from "../../pages/Nursery/config";
import {userNav} from "../Layouts/UserLayout/config";
import {federationNav} from "../../pages/Federation/config";

const MenuComponentNew = ({exhibAlias, notificationsLength}) => {
    const [isUserPages, setIsUserPages] = useState(true);
    const [currentPageUserInfo, setCurrentPageUserInfo] = useState(null);
    const [currentPageNav, setCurrentPageNav] = useState(null);

    // console.log('currentPageNav', currentPageNav);
    // console.log('notificationsLength', notificationsLength);

    const userAlias = useSelector(state => state.authentication.user_info?.alias);
    const userType = useSelector(state => state.authentication.user_info?.user_type);

    console.log('currentPageUserInfo', currentPageUserInfo);

    const isMobile = useIsMobile(1080);
    const location = useLocation();
    const url =  location.pathname.split('/')[1];
    const linkAlias = location.pathname.split('/')[2];
    const isUserProfilePage = (userAlias === url || userAlias === linkAlias); // страница профиль залогиненного юзера?

    const checkIsProfilePage = () => { //проверяем страницы на котрых будем показывать то или иное меню
        if(userAlias) { // юзер залогинен?
            if(isUserProfilePage) { //проверка на страницу своего профиля залогиненного юзера
                alert('Это страница нашего профиля, подтягиваем меню юзера');
                setIsUserPages(true);
                getCurrentPageUserInfo(userAlias);
            } else {
                if(isFederationAlias(url) || url === 'kennel' || url === 'club' || (linkAlias && url === 'exhibitions') || (url.includes('exhibitions'))) { //проверка: если это 1) стр. Федерации 2) Питомника 3) Клуба 4) Страница выбранного мероприятия
                    alert('111Это не страница залогиненного юзера, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
                    setIsUserPages(false);
                    console.log('22222222222222222222', url, linkAlias)
                    isFederationAlias(url) ? getCurrentPageUserInfo(exhibAlias || url) : getCurrentPageUserInfo(exhibAlias || linkAlias);
                    //если страница мероприятия (linkAlias && url === 'exhibitions'), то записываем в getCurrentPageUserInfo значение exhibAlias===алиас организации которая проводит мероприятие
                } else {
                    alert('Это остальные страницы, подтягиваем меню юзера');
                    setIsUserPages(true);
                    getCurrentPageUserInfo(userAlias);
                };
            }
        } else {
            alert('Юзер не залогинен, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
            setIsUserPages(false);
            isFederationAlias(url) ? getCurrentPageUserInfo(url) : getCurrentPageUserInfo(linkAlias);
        };
    };

    const getCurrentPageUserInfo = (userAlias) => {
        Request({
            url: isUserPages
                ?
                    (userType === 1)
                    ?
                    endpointGetUserInfo + userAlias
                    :
                    endpointGetClubInfo + userAlias
                :
                endpointGetClubInfo + userAlias
        }, data => {
            setCurrentPageUserInfo({...data});
        }, error => {
            console.log(error.response);
        });
    };

    useEffect(() => {
        checkIsProfilePage();
    },[isUserProfilePage]);

    useEffect(() => {

        const currentUserAlias = (userType === 1) ?  currentPageUserInfo?.alias : currentPageUserInfo?.club_alias;
        const currentUserType = currentPageUserInfo?.user_type;

        console.log('currentUserAlias', currentUserType)

        switch (currentUserType) {
            case 0:
                setCurrentPageNav(userNav(currentUserAlias));
                break;
            case 1:
                setCurrentPageNav(userNav(currentUserAlias));
                break;
            case 3:
                if(currentUserAlias === 'rkf' || currentUserAlias === 'rkf-online')
                {
                    setCurrentPageNav(federationNav(currentUserAlias));
                } else {
                    setCurrentPageNav(clubNav(currentUserAlias));
                }
                break;
            case 4:
                setCurrentPageNav(kennelNav(currentUserAlias));
                break;
            case 5:
                setCurrentPageNav(federationNav(currentUserAlias));
                break;
            default:
                setCurrentPageNav(null);
        };
    }, [currentPageUserInfo]);

    return (
        <>
            {
                currentPageNav?.map(navItem => <li className={`user-nav__item${(navItem.title === 'Уведомления' && !isUserProfilePage) ? ' _hidden' : ''}`}
                                                  key={navItem.id}>
                    {navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength && //по какой то причине не работают, проверить
                        <span
                            className={`user-nav__item-notification${notificationsLength > 99 ? ' _plus' : ''}`}>
                                    {notificationsLength > 99 ? 99 : notificationsLength}
                                </span>
                    }
                    {
                        console.log('111111111111111!!!!!!!!!!!' , navItem.onClick)
                    }
                    {
                        navItem.onClick
                        ?
                            <NavLink
                                to={navItem.to}
                                exact={navItem.exact}
                                onClick={navItem.onClick}
                                className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                // onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
                            >
                                {navItem.icon}
                                <span>{navItem.title}</span>
                            </NavLink>
                            :
                            <NavLink
                                to={navItem.to}
                                exact={navItem.exact}
                                className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                // onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
                            >
                                {navItem.icon}
                                <span>{navItem.title}</span>
                            </NavLink>
                    }

                </li>)
            }
        </>
    )

};

export default MenuComponentNew;