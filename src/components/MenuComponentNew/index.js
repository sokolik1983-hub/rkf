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
import Modal from "../Modal";
import {showPresidium} from "./utils";
import {blockContent} from "../../utils/blockContent";
import Loading from "../Loading";


const MenuComponentNew = ({exhibAlias, notificationsLength, userNav, isDocsPage}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUserPages, setIsUserPages] = useState(true);
    const [currentPageUserInfo, setCurrentPageUserInfo] = useState(null);
    const [currentPageNav, setCurrentPageNav] = useState(null);
    const [fedFeesId, setFedFeesId] = useState(null);
    const [fedDetails, setFedDetails] = useState(null);
    const [linkFeesId, setLinkFeesId] = useState('');
    const [linkFedDetails, setLinkFedDetails] = useState('');

    const userAlias = useSelector(state => state.authentication.user_info?.alias);
    const userType = useSelector(state => state.authentication.user_info?.user_type);

    const isMobile = useIsMobile(1080);
    const location = useLocation();
    const url = location.pathname.split('/')[1];
    const linkAlias = location.pathname.split('/')[2];
    const isUserProfilePage = (
        userAlias === url
        || userAlias === linkAlias
        || url === 'base-search'
        || url === 'bank-details'
        || location.search.includes(userAlias)
        || userAlias === exhibAlias //страница мероприятия залогиненного пользователя?
    ); // страницы профиля залогиненного юзера?

    console.log('url', url, linkAlias);

    const checkIsProfilePage = () => { //проверяем страницы на котрых будем показывать то или иное меню
        if (userAlias) { // юзер залогинен?
            if (isUserProfilePage) { //проверка на страницу своего профиля залогиненного юзера
                if(isDocsPage) { //проверка на страницу личного кабинета с документами залогиненного юзера
                    console.log('userNav111111111', userNav);
                    alert('Это страница личного кабинета залогиненного юзера с документами');
                    setCurrentPageNav(userNav);
                } else {
                    alert('Это страница нашего профиля, подтягиваем меню юзера');
                    setIsUserPages(true);
                    getCurrentPageUserInfo(userAlias);
                }
            } else {
                if (
                    isFederationAlias(url)
                    || url === 'kennel'
                    || url === 'club'
                    || (linkAlias && url === 'exhibitions')
                    || (url.includes('exhibitions') && !(location.search.includes(userAlias)))) { //проверка: если это 1) стр. Федерации 2) Питомника 3) Клуба 4) Страница выбранного мероприятия и страница мероприятий , которая не содержит в ссылке имя залогиненного юзера
                    alert('111Это не страница залогиненного юзера, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
                    setIsUserPages(false);
                    isFederationAlias(url) ? getCurrentPageUserInfo(exhibAlias || url) : getCurrentPageUserInfo(exhibAlias || linkAlias);
                    //если страница мероприятия (linkAlias && url === 'exhibitions'), то записываем в getCurrentPageUserInfo значение exhibAlias===алиас организации которая проводит мероприятие
                } else {
                    alert('Это остальные страницы, подтягиваем меню юзера');
                    setIsUserPages(true);
                    getCurrentPageUserInfo(userAlias);
                }
                ;
            }
        } else {
            alert('Юзер не залогинен, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
            setIsUserPages(false);
            isFederationAlias(url) ? getCurrentPageUserInfo(url) : getCurrentPageUserInfo(linkAlias);
        }
        ;
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
        const currentUserAlias = (userType === 1) ? currentPageUserInfo?.alias : currentPageUserInfo?.club_alias;
        const currentUserType = currentPageUserInfo?.user_type;
        switch (currentUserType) {
            case 0:
                setCurrentPageNav(userNav(currentUserAlias));
                break;
            case 1:
                setCurrentPageNav(userNav(currentUserAlias));
                break;
            case 3:
                if (currentUserAlias === 'rkf' || currentUserAlias === 'rkf-online') {
                    const newArr = federationNav(currentUserAlias).filter(item => !(item.id === 7 || item.id === 8));
                    setCurrentPageNav(newArr);
                } else {
                    setCurrentPageNav(clubNav(currentUserAlias));
                }
                break;
            case 4:
                setCurrentPageNav(kennelNav(currentUserAlias));
                break;
            case 5:
                const newArr = federationNav(currentUserAlias).map(item => {
                    if(item.id === 7) {
                        item.to = linkFeesId;
                        return item;
                    } else if (item.id === 8) {
                        item.to = linkFedDetails;
                        return item;
                    } else {
                        return item;
                    }
                });

                setCurrentPageNav(newArr);
                break;
            default:
                setCurrentPageNav(null);
        };
    }, [currentPageUserInfo, linkFeesId, linkFedDetails]);

    useEffect(() => {
        if (showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [showModal]);

    useEffect(() => {
        if (currentPageUserInfo?.club_alias) {
            //FederationDocumentType (1 - Реквизиты, 2 - членские взносы)
            //Alias (алиас федерации)
            (() => Request({
                url: `/api/federation/federation_documents?Alias=${currentPageUserInfo.club_alias}`
            }, data => {
                setFedFeesId(data[0]?.documents?.filter(i => i.document_type_id === 2)[0].document_id);
                setFedDetails(data[0]?.documents?.filter(i => i.document_type_id === 1)[0].document_id);
            }, error => {
                console.log(error.response);
            }))();
        }
    }, [currentPageUserInfo]); //подтягиваем документы для федераций

    useEffect(() => {
        if (fedFeesId) {
            (() => Request({
                url: `/api/document/document/public?id=${fedFeesId}`
            }, data => {
                setLinkFeesId(data);
            }, error => {
                console.log(error.response);
                // history.replace('/404');
            }))();
        }

        if (fedDetails) {
            (() => Request({
                url: `/api/document/document/public?id=${fedDetails}`
            }, data => {
                setLinkFedDetails(data);
            }, error => {
                console.log(error.response);
            }))();
        }
    }, [fedDetails, fedFeesId]);//подтягиваем документы для федераций

    useEffect(() => {
        checkIsProfilePage();
    }, [isUserProfilePage, isDocsPage, userNav]);

    return (
        <>
            <div
                className={`user-nav${isMobile ? '' : ' _desktop_card'}`}
            >
                <ul className="user-nav__list">
                    {
                        currentPageNav?.map(navItem => <li
                            className={`user-nav__item${(navItem.title === 'Уведомления' && !isUserProfilePage) ? ' _hidden' : ''}`}
                            key={navItem.id}>
                            {navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength && //по какой то причине не работают, проверить
                                <span
                                    className={`user-nav__item-notification${notificationsLength > 99 ? ' _plus' : ''}`}>
                                    {notificationsLength > 99 ? 99 : notificationsLength}
                                </span>
                            }
                            123
                            {
                                navItem.onClick
                                    ?
                                    <NavLink
                                        to={navItem.to}
                                        exact={navItem.exact}
                                        onClick={e => navItem.onClick(e, setShowModal)}
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
                </ul>
            </div>
            {showModal &&
                <Modal
                    iconName="icon-presidium-white"
                    headerName={currentPageUserInfo?.club_alias === 'rfls' ? "Президиум РФЛС" : "Президиум"}
                    className="menu-component__modal"
                    showModal={showModal} handleClose={() => setShowModal(false)}
                    noBackdrop={true}>
                    <div className="menu-component__wrap">
                        {showModal === 'presidium' && showPresidium(currentPageUserInfo?.club_alias)}
                    </div>
                </Modal>
            }
        </>
    )

};

export default MenuComponentNew;