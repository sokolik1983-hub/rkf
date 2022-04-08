import React, {useState, useEffect, useRef} from "react";
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
import {clubNav as clubNavDocs} from "../../pages/Docs/config";
import {kennelNav as kennelNavDocs} from "../../pages/NurseryDocuments/config";
import {userNav as userNavDocs} from "../../pages/UserDocuments/config";
import PopupModal from "../PopupModal";


const MenuComponentNew = ({exhibAlias, isDocsPage}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUserPages, setIsUserPages] = useState(true);
    const [currentPageUserInfo, setCurrentPageUserInfo] = useState(null);
    const [notificationCounter, setNotificationCounter] = useState(null);
    const [currentPageNav, setCurrentPageNav] = useState(null);
    const [fedFeesId, setFedFeesId] = useState(null);
    const [fedDetails, setFedDetails] = useState(null);
    const [linkFeesId, setLinkFeesId] = useState('');
    const [linkFedDetails, setLinkFedDetails] = useState('');
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const moreRef = useRef();

    const userAlias = useSelector(state => state.authentication.user_info?.alias);
    const userType = useSelector(state => state.authentication.user_info?.user_type);

    const isMobile = useIsMobile(1080);
    const location = useLocation();
    const url = location.pathname.split('/')[1];
    const linkAlias = location.pathname.split('/')[2];
    const addLink = location.pathname.split('/')[3];
    const isUserProfilePage = (
        userAlias === url
        || userAlias === linkAlias
        || url === 'base-search'
        || url === 'bank-details'
        || url === 'client'
        || location.search.includes(userAlias)
        || userAlias === exhibAlias //страница мероприятия залогиненного пользователя?
    ); // страницы профиля залогиненного юзера?

    // const newArr = federationNav(currentUserAlias).map(item => {
    //                     if(item.id === 7) {
    //                         item.to = linkFeesId;
    //                         return item;
    //                     } else if (item.id === 8) {
    //                         item.to = linkFedDetails;
    //                         return item;
    //                     } else {
    //                         return item;
    //                     }
    //                 });
    //
    //                 setCurrentPageNav(newArr);

    const getMenuCurrentUserPage = (url, linkAlias) => {
        if(isFederationAlias(url)) {
            getCurrentPageUserInfo(url);
            setCurrentPageNav(federationNav(url));
        }
        (url === 'club' && linkAlias) && setCurrentPageNav(clubNav(linkAlias));
        (url === 'kennel' && linkAlias) && setCurrentPageNav(kennelNav(linkAlias));
    }

    const getMyMenu = () => {
        (userType === 1) && setCurrentPageNav(userNav(userAlias));
        (userType === 3 && userAlias !== "rkf") &&  setCurrentPageNav(clubNav(userAlias));
        (userAlias === "rkf") && setCurrentPageNav(federationNav(userAlias));
        (userType === 4) && setCurrentPageNav(kennelNav(userAlias));
        (userType === 5) && setCurrentPageNav(federationNav(userAlias).map(item => (item.id === 7) ? item.to = linkFeesId : (item.id === 8) ? item.to = linkFedDetails : item))
    }

    const getMyMenuWithDocs = () => {
        (userType === 1) && setCurrentPageNav(userNavDocs(userAlias));
        (userType === 3 && userAlias !== "rkf") &&  setCurrentPageNav(clubNavDocs(userAlias));
        // (userAlias === "rkf") && setCurrentPageNav(federationNav(userAlias));
        (userType === 4) && setCurrentPageNav(kennelNavDocs(userAlias));
        // (userType === 5) && setCurrentPageNav(federationNav(userAlias));
    }



    const checkIsProfilePage = () => { //проверяем страницы на котрых будем показывать то или иное меню
        if (userAlias) { // юзер залогинен?
            if (isUserProfilePage) { //проверка на страницу своего профиля залогиненного юзера
                alert('Это страница профиля залогиненного юзера')
                if(addLink === "documents" || url === "bank-details") { //проверка на страницу личного кабинета с документами залогиненного юзера
                    alert('Это страница личного кабинета залогиненного юзера с документами');
                    getMyMenuWithDocs();
                    // setCurrentPageNav(userNav);
                } else {
                    alert('Это страница нашего профиля, подтягиваем меню юзера');
                    setIsUserPages(true);
                    getMyMenu();
                    getCurrentPageUserInfo(userAlias);
                }
            } else {
                if (
                    isFederationAlias(url)
                    || url === 'kennel'
                    || url === 'club'
                    ) { //проверка: если это 1) стр. Федерации 2) Питомника


                    alert('111Это не страница залогиненного юзера, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
                    setIsUserPages(false);
                    getMenuCurrentUserPage(url, linkAlias);
                    isFederationAlias(url) ? getCurrentPageUserInfo(exhibAlias || url) : getCurrentPageUserInfo(exhibAlias || linkAlias);
                    //если страница мероприятия (linkAlias && url === 'exhibitions'), то записываем в getCurrentPageUserInfo значение exhibAlias===алиас организации которая проводит мероприятие
                    if(url.includes('exhibitions') && !(location.search.includes(userAlias)) ||
                        (linkAlias && url === 'exhibitions')
                    ) //1) Клуба 2) Страница выбранного мероприятия и страница мероприятий , которая не содержит в ссылке имя залогиненного юзера
                    {
                        alert('555555Это не страница залогиненного юзера, это страница мероприятий');
                    }
                } else {
                    alert('Это остальные страницы, подтягиваем меню юзера');
                    setIsUserPages(true);
                    getCurrentPageUserInfo(userAlias);
                    getMyMenu();
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

    const getNotifications = async () => {
        await Request({
            url: `/api/article/notifications`,
        }, (data) => {
            setNotificationCounter(data?.counters?.counter_of_new);
        }, error => {
            console.log(error)
        });
    };

    const clickOnDisabledLink = e => {
        e.preventDefault();
    };

    // useEffect(() => {
    //
    //     console.log('currentPageUserInfo', currentPageUserInfo)
    //
    //     const currentUserAlias = (userType === 1) ? currentPageUserInfo?.alias : currentPageUserInfo?.club_alias;
    //     const currentUserType = currentPageUserInfo?.user_type;
    //
    //     switch (currentUserType) {
    //         case 0:
    //             setCurrentPageNav(userNav(currentUserAlias));
    //             break;
    //         case 1:
    //             console.log('userNav(currentUserAlias)', userNav(currentUserAlias));
    //             setCurrentPageNav(userNav(currentUserAlias));
    //             break;
    //         case 3:
    //             if (currentUserAlias === 'rkf' || currentUserAlias === 'rkf-online') {
    //                 const newArr = federationNav(currentUserAlias).filter(item => !(item.id === 7 || item.id === 8));
    //                 setCurrentPageNav(newArr);
    //             } else {
    //                 // setCurrentPageNav(clubNav(currentUserAlias));
    //             }
    //             break;
    //         case 4:
    //             setCurrentPageNav(kennelNav(currentUserAlias));
    //             break;
    //         case 5:
    //             const newArr = federationNav(currentUserAlias).map(item => {
    //                 if(item.id === 7) {
    //                     item.to = linkFeesId;
    //                     return item;
    //                 } else if (item.id === 8) {
    //                     item.to = linkFedDetails;
    //                     return item;
    //                 } else {
    //                     return item;
    //                 }
    //             });
    //
    //             setCurrentPageNav(newArr);
    //             break;
    //         default:
    //             setCurrentPageNav(null);
    //     };
    // }, [currentPageUserInfo, linkFeesId, linkFedDetails]);

    useEffect(() => {
        if (showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [showModal]);
    // }, [showModal]);

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
    }, [fedDetails, fedFeesId]);//подтягиваем документы для клубов??

    useEffect(() => {
        checkIsProfilePage();
    }, [location]);

    useEffect(() => {
        getNotifications()
    }, []);

    // useEffect(() => {
    //     console.log('currentPageNav', currentPageNav)
    // }, [currentPageNav]);

    useEffect(() => {
        if(isFederationAlias(url) && currentPageNav) {
            const newNavWithDocLinks = currentPageNav.map(item => (item.id === 7) ? {...item, to: linkFeesId} : (item.id === 8) ? {...item, to: linkFedDetails}  : item)
            setCurrentPageNav(newNavWithDocLinks);
        }
    }, [linkFeesId, linkFedDetails]);

    return (
        <>
            {
                isMobile
                ?
                    <>
                        {isMobile &&
                            <button onClick={() => setOpenUserMenu(!openUserMenu)}
                                    className={`user-nav__button more-btn${openUserMenu ? ' _open' : ''}`}
                                    ref ={moreRef}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04099 13.8913C3.99341 13.5411 3.42809 12.4079 3.7783 11.3604C4.12852 10.3128 5.26165 9.74745 6.30923 10.0977C7.35681 10.4479 7.92214 11.581 7.57192 12.6286C7.40374 13.1317 7.04261 13.5473 6.56797 13.7841C6.09333 14.0209 5.54406 14.0595 5.04099 13.8913ZM11.3655 13.8968C10.318 13.5466 9.75264 12.4135 10.1029 11.3659C10.4531 10.3183 11.5862 9.753 12.6338 10.1032C13.6814 10.4534 14.2467 11.5866 13.8965 12.6341C13.7283 13.1372 13.3672 13.5529 12.8925 13.7897C12.4179 14.0265 11.8686 14.065 11.3655 13.8968ZM17.6901 13.9024C16.6425 13.5522 16.0772 12.419 16.4274 11.3715C16.7776 10.3239 17.9108 9.75855 18.9583 10.1088C20.0059 10.459 20.5712 11.5921 20.221 12.6397C20.0528 13.1428 19.6917 13.5584 19.2171 13.7952C18.7424 14.032 18.1932 14.0706 17.6901 13.9024Z"/>
                                </svg>
                                Еще
                            </button>
                        }
                        <PopupModal
                            showModal={openUserMenu}
                            handleClose={(e) => !moreRef.current.contains(e.target) && setOpenUserMenu(false)}
                            bottomStyle
                        >
                            <div className="user-nav__inner">
                                {
                                    currentPageNav?.map(navItem => <li
                                        className={`user-nav__item${(navItem.title === 'Уведомления' && !isUserProfilePage) ? ' _hidden' : ''}`}
                                        key={navItem.id}>
                                        {navItem.title === 'Уведомления' && notificationCounter !== 0 && notificationCounter && //по какой то причине не работают, проверить
                                            <span
                                                className={`user-nav__item-notification${notificationCounter > 99 ? ' _plus' : ''}`}>
                                    {notificationCounter > 99 ? 99 : notificationCounter}
                                </span>
                                        }
                                        123
                                        {
                                            navItem.onClick
                                                ?
                                                <NavLink
                                                    to={navItem.to}
                                                    exact={navItem.exact}
                                                    className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                                    onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
                                                >
                                                    {navItem.icon}
                                                    <span>{navItem.title}</span>
                                                </NavLink>
                                                :
                                                <NavLink
                                                    to={navItem.to}
                                                    exact={navItem.exact}
                                                    className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                                    onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
                                                >
                                                    {navItem.icon}
                                                    <span>{navItem.title}</span>
                                                </NavLink>
                                        }
                                    </li>)
                                }
                            </div>

                        </PopupModal>
                    </>
                :
                    <div
                        className={`user-nav${isMobile ? '' : ' _desktop_card'}`}
                    >
                        <ul className="user-nav__list">
                            {
                                currentPageNav?.map(navItem => <li
                                    className={`user-nav__item${(navItem.title === 'Уведомления' && !isUserProfilePage) ? ' _hidden' : ''}`}
                                    key={navItem.id}>
                                    {navItem.title === 'Уведомления' && notificationCounter !== 0 && notificationCounter && //по какой то причине не работают, проверить
                                        <span
                                            className={`user-nav__item-notification${notificationCounter > 99 ? ' _plus' : ''}`}>
                                    {notificationCounter > 99 ? 99 : notificationCounter}
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
            }
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