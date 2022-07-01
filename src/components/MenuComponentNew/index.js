import React, {useState, useEffect, useRef} from "react";
import {isFederationAlias} from "../../utils";
import {useLocation, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import useIsMobile from "../../utils/useIsMobile";
import {endpointGetUserInfo, endpointGetNurseryInfo, endpointGetClubInfo, endpointGetNBCInfo} from "./config";
import {Request} from "../../utils/request";
import {clubNav} from "../../pages/Club/config";
import {kennelNav} from "../../pages/Nursery/config";
import {NBCNav, NBCNavDocs} from "../Layouts/NBCLayout/config";
import {userNav} from "../Layouts/UserLayout/config";
import {federationNav} from "../../pages/Federation/config";
import {clubNav as clubNavDocs} from "../../pages/Docs/config";
import {kennelNav as kennelNavDocs} from "../../pages/NurseryDocuments/config";
import {userNav as userNavDocs} from "../../pages/UserDocuments/config";
import PopupModal from "../PopupModal";
import {endpointGetExhibition} from "../../pages/Exhibition/config";
import {Menu} from "./components/Menu";
import HeaderMobileMenu from "./components/HeaderMobileMenu";

import "./styles.scss";

const MenuComponentNew = () => {
    const [exhibAlias, setExhibAlias] = useState(null);
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
        || url === 'client'
        || url === ''
        || location.search.includes(userAlias)
    ); // страницы профиля залогиненного юзера?

    const isExhibitionPage = useRouteMatch();

    const deleteNotification = (currentPageNav) => {
        return currentPageNav?.filter(item => (item.title !== 'Уведомления') && item);
    }

    const getMenu = (url, linkAlias) => {
        return isFederationAlias(url) ?
            federationNav(url) :
            ((url === 'club' || url === 'client') && linkAlias) ?
                isFederationAlias(linkAlias) ?
                    federationNav(linkAlias) :
                        clubNav(linkAlias) :
                        (url === 'kennel' && linkAlias) ?
                            kennelNav(linkAlias) :
                            (url === 'nbc' && linkAlias) ?
                                NBCNav(linkAlias) :
                                userNav(linkAlias)
    }

    const getMenuInfoCurrentUserPage = (url, linkAlias, isUserDocuments) => {
        if(isUserDocuments) { //подтягиваем меню юзера, на странице которого находимся
            (userType === 1) && setCurrentPageNav(userNavDocs(userAlias));
            (userType === 3 || userType === 5) && setCurrentPageNav(clubNavDocs(userAlias));
            (userType === 4) && setCurrentPageNav(kennelNavDocs(userAlias));
            (userType === 7) && setCurrentPageNav(NBCNavDocs(userAlias));
        } else {
            setCurrentPageNav(isUserProfilePage ?
                getMenu(url, linkAlias)
                :
                deleteNotification(getMenu(url, linkAlias))
            )
        }
        Request({ //подтягиваем инфу о юзере, на странице которого находимся (нужно для моб. меню)
            url:
                url === "nbc" ?
                    endpointGetNBCInfo + linkAlias :
                        url === "club" ?
                        endpointGetClubInfo + linkAlias :
                            url === "kennel" ?
                                endpointGetNurseryInfo + linkAlias :
                                url === "user" ?
                                    endpointGetUserInfo + linkAlias :
                                    endpointGetClubInfo + linkAlias
        }, data => {
            setCurrentPageUserInfo({...data });
        }, error => {
            console.log(error.response);
        });
    };

    const checkUserType = (userType) => {
        if(userType === 3 || userType === 5) {
            return 'club';
        } else if(userType === 4) {
            return 'kennel';
        } else if(userType === 7) {
            return 'nbc';
        } else {
                return 'user';
            }
    };

    const checkIsPage = (exhibAlias) => {
        //проверяем страницы на которых будем показывать то или иное меню
        if(exhibAlias) { //проверка на страницу определенного события (exhibition), где мы должны подтягивать меню клуба или фед, которые проводят это событик
            if(isFederationAlias(exhibAlias)) {
                getMenuInfoCurrentUserPage (exhibAlias, exhibAlias);
            } else {
                getMenuInfoCurrentUserPage("club", exhibAlias);
            }
        } else if (isAuth) { // юзер залогинен?
            if (isUserProfilePage) { //Это страница профиля залогиненного юзера
                if(addLink === "documents" ||
                    linkAlias === "documents" ||
                    url === "bank-details" ||
                    url.includes('base-search')
                ) { //Это страница личного кабинета залогиненного юзера с документами
                    const isUserDocuments = true;
                    getMenuInfoCurrentUserPage(checkUserType(userType), userAlias, isUserDocuments);
                } else {
                    //Это страница нашего профиля, подтягиваем меню юзера
                    console.log('url', url);
                    console.log('userAlias', userAlias);
                    isFederationAlias(url) ? getMenuInfoCurrentUserPage(url, url) : getMenuInfoCurrentUserPage(url , userAlias);
                }
            } else {
                if (isFederationAlias(url)
                    || url === 'kennel'
                    || url === 'club'
                    || url === 'user'
                    || url === 'referee'
                    || url === 'client'
                    || url === 'nbc'
                ) {//Это не страница залогиненного юзера, подтягиваем меню клуба-питомника-федерации на странице которого находимся
                    isFederationAlias(url) ? getMenuInfoCurrentUserPage(url, url) : getMenuInfoCurrentUserPage(url , linkAlias);
                } else {
                    getMenuInfoCurrentUserPage(checkUserType(userType), userAlias);
                }
            }
        } else {
            //Юзер не залогинен, подтягиваем меню клуба-питомника-федерации на странице которого находимся
            isFederationAlias(url) ? getMenuInfoCurrentUserPage(url, url) : getMenuInfoCurrentUserPage(url , linkAlias);
        }
    };

    const getExhibition = async(exhibitionId) => { //подтягиваем инфу о клубе или федерации, которые проводят выставку, если мы находимся на странице выставки
        await Request({
            url: endpointGetExhibition + exhibitionId
        }, data => {
            setExhibAlias(data.club_information.club_alias);
        }, error => {
            console.log(error.response);
        });
    };

    useEffect(() => {
        if (!!currentPageUserInfo?.club_alias) {
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
                //На странице документов личного кабинета федерации, цеплялись ссылки от пдф документов основного меню, поэтому ставим условие
                const newNavWithDocLinks = (linkAlias === 'documents') ?
                    currentPageNav?.map(item => (item.id === 7) ? {...item, to: linkFedDetails} : (item.id === 8) ? {...item, to: `/${url}/documents/bookform`}  : item) :
                    currentPageNav?.map(item => (item.id === 7) ? {...item, to: linkFeesId} : (item.id === 8) ? {...item, to: linkFedDetails}  : item);
                setCurrentPageNav(newNavWithDocLinks);
            }
        }
    }, [linkFeesId, linkFedDetails, currentPageUserInfo]);

    useEffect(() => {
        if(isExhibitionPage.path === '/exhibitions/:id') {
            getExhibition(isExhibitionPage.params.id);
        }
        checkIsPage();
    }, [location]);

    useEffect(() => {
        checkIsPage(exhibAlias)
    }, [exhibAlias]);

    useEffect(() => {
        if(addLink === "documents" ||
            linkAlias === "documents" ||
            url === "bank-details" ||
            url.includes('base-search')
        ){}
        else {
            const strOfBreeds = currentPageUserInfo?.breeds?.map(obj => `BreedIds=${obj.breed_id}`).join().replaceAll(',', '&');
            if(currentPageUserInfo?.user_type === 7) {
                if(isUserProfilePage) {
                    setCurrentPageNav(NBCNav(currentPageUserInfo?.alias, strOfBreeds));
                } else {
                    setCurrentPageNav(deleteNotification(NBCNav(currentPageUserInfo?.alias, strOfBreeds)));
                }
            }
        }
    }, [currentPageUserInfo]);

    return (
        <>
            {
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
            }
        </>
    )

};

export default MenuComponentNew;