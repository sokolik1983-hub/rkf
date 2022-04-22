import React, {useState, useEffect, useRef} from "react";
import {isFederationAlias} from "../../utils";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import useIsMobile from "../../utils/useIsMobile";
import {endpointGetClubInfo} from "../../pages/Club/config";
import {endpointGetNurseryInfo} from "../../pages/Nursery/config";
import {endpointGetUserInfo} from "./config";
import {Request} from "../../utils/request";
import {clubNav} from "../../pages/Club/config";
import {kennelNav} from "../../pages/Nursery/config";
import {userNav} from "../Layouts/UserLayout/config";
import {federationNav} from "../../pages/Federation/config";
import Loading from "../Loading";
import {clubNav as clubNavDocs} from "../../pages/Docs/config";
import {kennelNav as kennelNavDocs} from "../../pages/NurseryDocuments/config";
import {userNav as userNavDocs} from "../../pages/UserDocuments/config";
import PopupModal from "../PopupModal";
import Alert from "../Alert"
import {endpointGetExhibition} from "../../pages/Exhibition/config";
import {Menu} from "./components/Menu";
import HeaderMobileMenu from "./components/HeaderMobileMenu";

import "./styles.scss";


const MenuComponentNew = () => {
    const [exhibAlias, setExhibAlias] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPageUserInfo, setCurrentPageUserInfo] = useState(null);
    const [currentPageNav, setCurrentPageNav] = useState(null);
    const [fedFeesId, setFedFeesId] = useState(null);
    const [fedDetails, setFedDetails] = useState(null);
    const [linkFeesId, setLinkFeesId] = useState('');
    const [linkFedDetails, setLinkFedDetails] = useState('');
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const moreRef = useRef();

    const userAlias = useSelector(state => state.authentication.user_info?.alias);
    const userType = useSelector(state => state.authentication.user_info?.user_type);
    const isAuth = useSelector(state => state.authentication.isAuthenticated);

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
        || url === ''
        || location.search.includes(userAlias)
    ); // страницы профиля залогиненного юзера?

    const getMenuCurrentUserPage = (url, linkAlias) => {
        if(isFederationAlias(url)) {
            getCurrentPageUserInfo(url);
            setCurrentPageNav(federationNav(url));
        };
        if(url === 'client' && linkAlias) {
            getCurrentPageUserInfo(linkAlias);
            setCurrentPageNav(federationNav(linkAlias));
        };
        if(url === 'club' && linkAlias) {
            getCurrentPageUserInfo( 'club', linkAlias);
            setCurrentPageNav(clubNav(linkAlias));
        };
        if(url === 'kennel' && linkAlias) {
            getCurrentPageUserInfo( 'kennel', linkAlias);
            setCurrentPageNav(kennelNav(linkAlias));
        };
        if(url === 'user' && linkAlias) {
            getCurrentPageUserInfo( 'user', linkAlias);
            setCurrentPageNav(userNav(linkAlias))
        };
    };

    const getCurrentPageUserInfo = (url, userAlias ) => {
        Request({
            url:
                url === "club"
                    ?
                    endpointGetClubInfo + userAlias
                    :
                    url === "kennel"
                        ?
                        endpointGetNurseryInfo + userAlias
                        :
                        url === "user"
                            ?
                            endpointGetUserInfo + userAlias
                            :
                            endpointGetClubInfo + userAlias
        }, data => {
            setCurrentPageUserInfo({...data });
        }, error => {
            console.log(error.response);
        });
    };

    const getMyMenu = () => {
        (userType === 1) && setCurrentPageNav(userNav(userAlias));
        (userType === 3 && userAlias !== "rkf") &&  setCurrentPageNav(clubNav(userAlias));
        (userAlias === "rkf") && setCurrentPageNav(federationNav(userAlias));
        (userType === 4) && setCurrentPageNav(kennelNav(userAlias));
        if(userType === 5) {
            const newArr = federationNav(userAlias).map(item => (item.id === 7) ? {...item, to: linkFeesId} : (item.id === 8) ? {...item, to: linkFedDetails}  : item)
            setCurrentPageNav(newArr);
        }
    };

    const getMyMenuWithDocs = () => {
        (userType === 1) && setCurrentPageNav(userNavDocs(userAlias));
        (userType === 3 || userType === 5) &&  setCurrentPageNav(clubNavDocs(userAlias));
        (userType === 4) && setCurrentPageNav(kennelNavDocs(userAlias));
    };

    const checkIsProfilePage = (exhibAlias) => {
        //проверяем страницы на котрых будем показывать то или иное меню
        if(exhibAlias) { //проверка на страницу определенного события (exhibition), где мы должны подтягивать меню клуба или фед, которые проводят это событик
                if(isFederationAlias(exhibAlias)) {
                    getMenuCurrentUserPage (exhibAlias, exhibAlias);
                    getCurrentPageUserInfo (exhibAlias, exhibAlias)
                } else {
                    getMenuCurrentUserPage("club", exhibAlias);
                    getCurrentPageUserInfo ("club", exhibAlias);
                }
            } else if (isAuth) { // юзер залогинен?

                if (isUserProfilePage) { //Это страница профиля залогиненного юзера
                    if(addLink === "documents" ||
                        linkAlias === "documents" ||
                        url === "bank-details" ||
                        url.includes('base-search'))
                        { //Это страница личного кабинета залогиненного юзера с документами
                            getMyMenuWithDocs();
                            getCurrentPageUserInfo(
                                userType === 3 || userType === 5
                                    ?
                                    'club'
                                    :
                                    userType === 4
                                        ?
                                        'kennel'
                                        :
                                        'user',
                                userAlias
                            )
                        } else {
                            //Это страница нашего профиля, подтягиваем меню юзера
                            getMyMenu();
                            getCurrentPageUserInfo(
                                userType === 3 || userType === 5
                                    ?
                                    'club'
                                    :
                                    userType === 4
                                        ?
                                        'kennel'
                                        :
                                        'user', userAlias);
                        }
                    } else {
                    if (isFederationAlias(url)
                        || url === 'kennel'
                        || url === 'club'
                        || url === 'user'
                        || url === 'referee'
                        || url === 'client'
                    ) {//Это не страница залогиненного юзера, подтягиваем меню клуба-питомника-федерации на странице которого находимся
                        if(url === 'referee') { //страница специалистов
                            getMenuForReferee(url, linkAlias)
                        } else if(url === 'client') { //Страница редактирования профиля /client
                            getMenuCurrentUserPage(url, userAlias);
                            isFederationAlias(url) ? getCurrentPageUserInfo(url, userAlias) : getCurrentPageUserInfo(url , userAlias);
                        } else {
                            getMenuCurrentUserPage(url, linkAlias);
                            isFederationAlias(url) ? getCurrentPageUserInfo(url, url) : getCurrentPageUserInfo(url , linkAlias);
                        }
                    } else {
                        getMyMenu();
                        getCurrentPageUserInfo( url, userAlias);
                    }
                }
        } else {
            //Юзер не залогинен, подтягиваем меню клуба-питомника-федерации на странице которого находимся
            getMenuCurrentUserPage(url, linkAlias);
            isFederationAlias(url) ? getCurrentPageUserInfo( 'club', url) : getCurrentPageUserInfo( url, linkAlias);
        }
    };

    const getMenuForReferee = (linkAlias) => {
        setLoading(true);
        Request({
            url: `/api/referee/alias?judgeId=${linkAlias}`
        }, data => {
            getCurrentPageUserInfo( 'user', data);
        }, error => {
            console.log('error', error);
        });
        setLoading(false);
    };

    const getExhibition = async(exhibitionId) => { //подтягиваем инфу о клубе или федерации, которые проводят выставку, если мы находимся на странице выставки
        setLoading(true);
        await Request({
            url: endpointGetExhibition + exhibitionId
        }, data => {
            setExhibAlias(data.club_information.club_alias);
        }, error => {
            console.log(error.response);
        });
        setLoading(false);
    };

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
    }, [currentPageUserInfo]); //подтягиваем айди документов для федераций

    useEffect(() => {
        if (fedFeesId) {
            (() => Request({
                url: `/api/document/document/public?id=${fedFeesId}`
            }, data => {
                setLinkFeesId(data);
            }, error => {
                console.log(error.response);
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
    }, [fedDetails, fedFeesId, currentPageUserInfo]);//подтягиваем линки для документов федераций

    useEffect(() => {
        if(url === 'client' || (isFederationAlias(url) && currentPageNav)) {
            if(currentPageUserInfo?.club_alias === 'rkf' || currentPageUserInfo?.club_alias === 'rkf-online') {
                const newNavWithoutDocLinks = currentPageNav.filter(item =>(item.id !== 7 && item.id !== 8));
                setCurrentPageNav(newNavWithoutDocLinks);

            } else {
                const newNavWithDocLinks = currentPageNav?.map(item => (item.id === 7) ? {...item, to: linkFeesId} : (item.id === 8) ? {...item, to: linkFedDetails}  : item)
                setCurrentPageNav(newNavWithDocLinks);
            }
        }
    }, [linkFeesId, linkFedDetails, currentPageUserInfo]);

    useEffect(() => {
        if(location.pathname.includes('exhibitions/')) {
            const exhibitionId = location.pathname.split('/')[2]
            getExhibition(exhibitionId);
        }
        checkIsProfilePage();
    }, [location]);

    useEffect(() => {
        checkIsProfilePage(exhibAlias)
    }, [exhibAlias]);

    return (
        <>
            {
                loading
                ?
                    isMobile
                        ?
                        <>

                            <button onClick={() => setOpenUserMenu(!openUserMenu)}
                                    className={`menu-component-new__button more-btn${openUserMenu ? ' _open' : ''}`}
                                    ref ={moreRef}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04099 13.8913C3.99341 13.5411 3.42809 12.4079 3.7783 11.3604C4.12852 10.3128 5.26165 9.74745 6.30923 10.0977C7.35681 10.4479 7.92214 11.581 7.57192 12.6286C7.40374 13.1317 7.04261 13.5473 6.56797 13.7841C6.09333 14.0209 5.54406 14.0595 5.04099 13.8913ZM11.3655 13.8968C10.318 13.5466 9.75264 12.4135 10.1029 11.3659C10.4531 10.3183 11.5862 9.753 12.6338 10.1032C13.6814 10.4534 14.2467 11.5866 13.8965 12.6341C13.7283 13.1372 13.3672 13.5529 12.8925 13.7897C12.4179 14.0265 11.8686 14.065 11.3655 13.8968ZM17.6901 13.9024C16.6425 13.5522 16.0772 12.419 16.4274 11.3715C16.7776 10.3239 17.9108 9.75855 18.9583 10.1088C20.0059 10.459 20.5712 11.5921 20.221 12.6397C20.0528 13.1428 19.6917 13.5584 19.2171 13.7952C18.7424 14.032 18.1932 14.0706 17.6901 13.9024Z"/>
                                </svg>
                                Еще
                            </button>
                            <PopupModal
                                showModal={openUserMenu}
                                handleClose={(e) => !moreRef.current.contains(e.target) && setOpenUserMenu(false)}
                                bottomStyle
                            >
                                <div className="menu-component-new__inner">
                                    <HeaderMobileMenu
                                        currentPageUserInfo={currentPageUserInfo}
                                        userType={userType}
                                    />
                                    <ul className="menu-component-new__list">
                                        <Menu
                                            currentPageNav={currentPageNav}
                                            setOpenUserMenu={setOpenUserMenu}
                                            currentPageUserInfo={currentPageUserInfo}
                                            isMobile
                                            openUserMenu={openUserMenu}
                                        />
                                    </ul>
                                </div>
                            </PopupModal>
                        </>
                        :
                        <Menu
                            currentPageNav={currentPageNav}
                            setOpenUserMenu={setOpenUserMenu}
                            isMobile={false}
                            currentPageUserInfo={currentPageUserInfo}
                            openUserMenu={openUserMenu}
                        />
                    :
                    <Loading />
            }
        </>
    )

};

export default MenuComponentNew;