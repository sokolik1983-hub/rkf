import React, {useState, useEffect, useRef} from "react";
import {isFederationAlias} from "../../utils";
import {NavLink, useLocation} from "react-router-dom";
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
import Modal from "../Modal";

import {blockContent} from "../../utils/blockContent";
import Loading from "../Loading";
import {clubNav as clubNavDocs} from "../../pages/Docs/config";
import {kennelNav as kennelNavDocs} from "../../pages/NurseryDocuments/config";
import {userNav as userNavDocs} from "../../pages/UserDocuments/config";
import PopupModal from "../PopupModal";
import InitialsAvatar from "../InitialsAvatar";
import Alert from "../Alert"
import ls from "local-storage";

import "./styles.scss";
import {endpointGetExhibition} from "../../pages/Exhibition/config";

const presidium = {
    rkf: {
        title: 'Состав Президиума РКФ',
        members: [
            'В.С. Голубев (ОАНКОО)',
            'В.А. Александров (РФСС)',
            'Л.В. Галиаскарова (РФСС)',
            'Т.В. Григоренко (РФСС)',
            'Н.А. Деменёв (ОАНКОО)',
            'Е.Г. Домогацкая (РФОС)',
            'Е.С. Купляускас (РФЛС)',
            'А.В. Никитин (РФЛС)',
            'Н.Б. Седых (РФЛС)',
            'А.А. Солдатов (РФОС)',
            'Н.Г. Харатишвили (ОАНКОО)',
            'Р.Р. Хомасуридзе (РФОС)'
        ]
    },
    rfls: {
        title: 'Состав Президиума СОКО РФЛС',
        members: [
            'Голубев Владимир Семенович',
            'Бычкова Елена Ивановна',
            'Ваулина Нина Павловна',
            'Горева Светлана Викторовна',
            'Городилов Станислав Валентинович',
            'Зубкова Людмила Анатольевна',
            'Купляускас Евгений Стасович',
            'Мазина Людмила Анатольевна',
            'Набиева Марина Борисовна',
            'Никитин Александр Владимирович',
            'Новиславский Олег Юрьевич',
            'Седых Николай Борисович',
            'Швец Ирина Львовна'
        ]
    },
    rfss: {
        title: 'Состав Президиума РФСС',
        members: [
            'Александров Владимир Аркадьевич - президент',
            'Галиаскарова Лариса Викторовна - вице-президент, член бюро',
            'Круценко Елена Юрьевна - вице-президент, член бюро',
            'Янчев Олег Владимирович - вице-президент, член бюро',
            'Трофимов Дмитрий Валерьевич - ответственный секретарь, член бюро',
            'Луговой Алексей Алексеевич - член бюро',
            'Коробейников Александр Филиппович - член бюро',
            'Григоренко Татьяна Васильевна',
            'Григорьева Надежда Геннадьевна',
            'Овсянникова Юлия Валерьевна',
            'Дубенский Александр Анатольевич',
            'Котельникова Ольга Капитоновна',
            'Попов Сергей Анатольевич',
            'Попов Сергей Викторович',
            'Соловьев Валерий Викторович'
        ]
    },
    rfos: {
        title: 'Состав Президиума РФОС',
        members: [
            'Домогацкая Екатерина Григорьевна - президент',
            'Солдатов Алексей Андреевич - Председатель Попечительского совета',
            'Галкин Артем Андреевич',
            'Гусева Юлия Вячеславовна',
            'Краснова Ольга Борисовна',
            'Островская Марина Григорьевна',
            'Синяк Александр Николаевич',
            'Стусь Виктор Николаевич',
            'Чалдина Татьяна Алексеевна'
        ]
    },
    oankoo: {
        title: 'Состав Президиума ОАНКОО',
        members: [
            'Голубев Владимир Семенович - президент'
        ]
    }
};

const presidiumRfls = <>
    <table className="menu-component__table">
        <tbody>
        <tr>
            <td>1.</td>
            <td>Голубев Владимир Семенович</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Бычкова Елена Ивановна</td>
            <td>Тел.: +7-918-748-85-20</td>
            <td>E-mail:elena 69@bk.ru</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>Ваулина Нина Павловна</td>
            <td>Тел.: +7-922-236-44-13</td>
            <td>E-mail:chelregools@gmail.com</td>
        </tr>
        <tr>
            <td>4.</td>
            <td>Горева Светлана Викторовна</td>
            <td>Тел.: +7-926-580-79-29</td>
            <td>E-mail: sgoreva@inbox.ru</td>
        </tr>
        <tr>
            <td>5.</td>
            <td>Городилов Станислав Валентинович</td>
            <td>Тел.: +7-914-237-24-66</td>
            <td>E-mail: yras89142732466@icloud.com</td>
        </tr>
        <tr>
            <td>6.</td>
            <td>Зубкова Людмила Анатольевна</td>
            <td>Тел.: +7-903-947-07-35</td>
            <td>E-mail: zubkova-69@mail.ru</td>
        </tr>
        <tr>
            <td>7.</td>
            <td>Купляускас Евгений Стасович</td>
            <td>Тел.: +7-903-509-57-68</td>
            <td>E-mail: koulstas@mail.ru</td>
        </tr>
        <tr>
            <td>8.</td>
            <td>Мазина Людмила Анатольевна</td>
            <td>Тел.: +7-917-219-50-00</td>
            <td>E-mail: volga.rfls.info@yandex.ru</td>
        </tr>
        <tr>
            <td>9.</td>
            <td>Набиева Марина Борисовна</td>
            <td>Тел.: +7-921-261-72-12</td>
            <td>E-mail: m.b.nabieva@yandex.ru</td>
        </tr>
        <tr>
            <td>10.</td>
            <td>Никитин Александр Владимирович</td>
            <td>Тел.: +7-903-856-87-80</td>
            <td>E-mail: cacchr@mail.ru</td>
        </tr>
        <tr>
            <td>11.</td>
            <td>Новиславский Олег Юрьевич</td>
            <td>Тел.: +7-926-211-39-39</td>
            <td>E-mail: denfris@gmail.com</td>
        </tr>
        <tr>
            <td>12.</td>
            <td>Седых Николай Борисович</td>
            <td>Тел.: +7-911-241-34-16</td>
            <td>E-mail: nik5978824@yandex.ru</td>
        </tr>
        <tr>
            <td>13.</td>
            <td>Швец Ирина Львовна</td>
            <td>Тел.: +7-916-145-16-41</td>
            <td>E-mail: icetoifel@mail.ru</td>
        </tr>
        </tbody>
    </table>
    <br/>
    <h4 className="menu-component__wrap-title">СПИСОК ЧЛЕНОВ РЕВИЗИОННОЙ КОМИССИИ РФЛС:</h4>
    <table className="menu-component__table" style={{maxWidth: '68%'}}>
        <tbody>
        <tr>
            <td>
                Председатель:
            </td>
            <td>
                Бородин Дмитрий
            </td>
            <td>
                Тел.: +7-919-247-69065
            </td>
        </tr>
        <tr>
            <td>
                Члены:
            </td>
            <td>
                Бойко Надежда
            </td>
            <td>
                Тел.: +7-915-089-81-58
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                Эглит Вероника
            </td>
            <td>
                Тел.: +7-909-670-35-54
            </td>
        </tr>
        </tbody>
    </table>
</>;
const showPresidium = (currentPageAlias) => {
    if (currentPageAlias === 'rfls') {
        return presidiumRfls
    } else {
        return <>
            <ol className="menu-component__wrap-list">
                {presidium[currentPageAlias].members.map((member, i) =>
                    <li className="menu-component__wrap-item" key={i}>{member}</li>
                )}
            </ol>
        </>
    }
};

const MenuComponentNew = ({isDocsPage}) => {
    const [showModal, setShowModal] = useState(false);
    const [exhibAlias, setExhibAlias] = useState(null);

    const [linkForName, setLinkForName] = useState('');
    const [name, setName] = useState(null);
    const [headliner, setHeadliner] = useState('');
    const [logoLink, setLogoLink] = useState('');
    const [alert, setAlert] = useState(false);
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
    const isAuth = useSelector(state => state.authentication.isAuthenticated);

    const isMobile = useIsMobile(1080);
    const location = useLocation();
    const url = location.pathname.split('/')[1];
    const linkAlias = location.pathname.split('/')[2];
    const addLink = location.pathname.split('/')[3];
    const isUserProfilePage = (
        userAlias === url
        || userAlias === linkAlias
        // || url === 'base-search'
        || url === 'bank-details'
        || url === 'client'
        || location.search.includes(userAlias)
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
        if(url === 'club' && linkAlias) {
            getCurrentPageUserInfo(linkAlias, 'club');
            setCurrentPageNav(clubNav(linkAlias));
        }
        if(url === 'kennel' && linkAlias) {
            getCurrentPageUserInfo(linkAlias, 'kennel');
            setCurrentPageNav(kennelNav(linkAlias))
        };
        if(url === 'user' && linkAlias) {
            getCurrentPageUserInfo(linkAlias, 'user');
            setCurrentPageNav(userNav(linkAlias))
        };
    }

    const getMyMenu = () => {
        (userType === 1) && setCurrentPageNav(userNav(userAlias));
        (userType === 3 && userAlias !== "rkf") &&  setCurrentPageNav(clubNav(userAlias));
        (userAlias === "rkf") && setCurrentPageNav(federationNav(userAlias));
        (userType === 4) && setCurrentPageNav(kennelNav(userAlias));
        if(userType === 5) {
            const newArr = federationNav(userAlias).map(item => (item.id === 7) ? {...item, to: linkFeesId} : (item.id === 8) ? {...item, to: linkFedDetails}  : item)
            setCurrentPageNav(newArr);
        }
    }

    const getMyMenuWithDocs = () => {
        (userType === 1) && setCurrentPageNav(userNavDocs(userAlias));
        (userType === 3 || userType === 5) &&  setCurrentPageNav(clubNavDocs(userAlias));
        (userType === 4) && setCurrentPageNav(kennelNavDocs(userAlias));
    }

    const checkIsProfilePage = (exhibAlias) => { //проверяем страницы на котрых будем показывать то или иное меню
        if(exhibAlias) {
                if(isFederationAlias(exhibAlias)) {
                    console.log('Federation!!!!', exhibAlias)
                    getMenuCurrentUserPage (exhibAlias, exhibAlias);
                    getCurrentPageUserInfo (exhibAlias, exhibAlias)
                } else {
                    console.log('Club!!!!', exhibAlias)
                    getMenuCurrentUserPage("club", exhibAlias);
                    getCurrentPageUserInfo (exhibAlias,"club");
                }
        } else if (userAlias) { // юзер залогинен?
            if (isUserProfilePage) { //проверка на страницу своего профиля залогиненного юзера
                console.log('Это страница профиля залогиненного юзера')
                if(addLink === "documents" || linkAlias === "documents" || url === "bank-details") { //проверка на страницу личного кабинета с документами залогиненного юзера
                    console.log('Это страница личного кабинета залогиненного юзера с документами');
                    getMyMenuWithDocs();
                    getCurrentPageUserInfo(userAlias,
                        userType === 3 || userType === 5
                            ?
                            'club'
                            :
                            userType === 4
                                ?
                                'kennel'
                                :
                                'user'
                    )
                    // setCurrentPageNav(userNav);
                } else {
                    console.log('Это страница нашего профиля, подтягиваем меню юзера');
                    setIsUserPages(true);
                    getMyMenu();
                    getCurrentPageUserInfo(userAlias, url);
                }
            } else {
                if (
                    isFederationAlias(url)
                    || url === 'kennel'
                    || url === 'club'
                    || url === 'user'
                    || url === 'referee'
                ) { //проверка: если это 1) стр. Федерации 2) Питомника

                    console.log('111Это не страница залогиненного юзера, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
                    console.log('linkAlias', linkAlias);
                    console.log('url', url);
                    if(url === 'referee') {
                        getMenuForReferee(url, linkAlias)
                    } else {
                        getMenuCurrentUserPage(url, linkAlias);
                        isFederationAlias(url) ? getCurrentPageUserInfo(url, url) : getCurrentPageUserInfo(linkAlias, url);
                    }
                    // setIsUserPages(false);

                } else {
                    console.log('Это остальные страницы, подтягиваем меню юзера');

                    getCurrentPageUserInfo(userAlias,
                        userType === 3 || userType === 5
                            ?
                            'club'
                            :
                            userType === 4
                                ?
                                'kennel'
                                :
                                'user'
                    )
                    setIsUserPages(true);
                    getMyMenu();
                };
            }
        } else {
            console.log('Юзер не залогинен, подтягиваем меню клуба-питомника-федерации на странице которого находимся');
            // setIsUserPages(false);
            getMenuCurrentUserPage(url, linkAlias);
            isFederationAlias(url) ? getCurrentPageUserInfo(url, 'club') : getCurrentPageUserInfo(linkAlias, url);
        }
        ;

    };

    const getMenuForReferee = (linkAlias) => {
        setLoading(true);
        Request({
            url: `/api/referee/alias?judgeId=${linkAlias}`
        }, data => {
            getCurrentPageUserInfo(data, 'user');
        }, error => {
            console.log('error', error);
        });
        setLoading(false);
    }

    const getCurrentPageUserInfo = (userAlias, url) => {
        console.log('5555555555555555', userAlias);
        console.log('url', url)
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
                            endpointGetClubInfo + url
        }, data => {
            console.log('data', data);
            if(url === 'user') { //ждём от беков когда пропишут type_id: 1 для юзера
                setCurrentPageUserInfo({...data, user_type: 1});
            } else {
                setCurrentPageUserInfo({...data });
            }
        }, error => {
            console.log(error.response);
        });
    };

    const getMeLinkForName = () => {
        console.log('9999999999999999999999', currentPageUserInfo?.user_type)
        switch(currentPageUserInfo?.user_type || userType) {
            case 5:
                setLinkForName(`/${currentPageUserInfo?.club_alias}`);
                break;
            case 4:
                setLinkForName(`/kennel/${currentPageUserInfo?.alias}`);
                break;
            case 3:
                if(currentPageUserInfo?.club_alias === "rkf") {
                    setLinkForName("/rkf")
                } else {
                    setLinkForName(`/club/${currentPageUserInfo?.club_alias}`);
                }
                break;
            case 1:
                setLinkForName(`/user/${currentPageUserInfo?.alias}`);
                break;
        }
    };

    const getMeName = () => {
        switch(currentPageUserInfo?.user_type || userType) {
            case 1:
                setName(`${currentPageUserInfo?.personal_information.first_name} ${currentPageUserInfo?.personal_information.last_name}`);
                break;
            case 4:
                setName(`${currentPageUserInfo?.name}`);
                break;
            case 3:
                if(currentPageUserInfo?.club_alias === "rkf") {
                    setName(`${currentPageUserInfo?.federation_name}`);
                } else {
                    setName(`${currentPageUserInfo?.short_name}`);
                }
                break;
            case 5:
                setName(`${currentPageUserInfo?.federation_name}`);
                break;
            default:
                break;
        }
    };

    const getMeHeadliner = () => {
        if (currentPageUserInfo?.headliner_link) {
            setHeadliner(currentPageUserInfo.headliner_link);
        } else if(currentPageUserInfo?.club_alias === "rkf") {
            setHeadliner("/static/images/slider/1.jpg");
        } else {
            setHeadliner("/static/images/noimg/no-banner.png");
        }
    };

    const getMeLogoLink = () => {
        if(currentPageUserInfo?.logo_link) {
            setLogoLink(currentPageUserInfo.logo_link);
        } else {
            setLogoLink(null);
        }
    };

    const getNotifications = async () => {
        await Request({
            url: `/api/article/notifications`,
        }, (data) => {
            setNotificationCounter(data?.counters?.counter_of_new);
        }, error => {
            console.log(error);
        });
    };

    const clickOnDisabledLink = e => {
        e.preventDefault();
        setOpenUserMenu(false);
        setAlert(true);
    };

    const clickOnPresidium = (e) => {
        e.preventDefault();
        setOpenUserMenu(false);
        setShowModal('presidium');
    };

    const getExhibition = async(exhibitionId) => {
        setLoading(true);

        await Request({
            url: endpointGetExhibition + exhibitionId
        }, data => {
            setExhibAlias(data.club_information.club_alias);
        }, error => {
            console.log(error.response);
        });

        setLoading(false);
    }

    useEffect(() => {
        if (openUserMenu || showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [openUserMenu, showModal]);

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
    }, [fedDetails, fedFeesId, currentPageUserInfo]);//подтягиваем документы для клубов??

    useEffect(() => {
        checkIsProfilePage();
    }, [location]);

    useEffect(() => {
        getNotifications()
    }, []);

    useEffect(() => {
        if(isFederationAlias(url) && currentPageNav) {
            if(currentPageUserInfo.club_alias === 'rkf' || currentPageUserInfo.club_alias === 'rkf-online') {
                const newNavWithoutDocLinks = currentPageNav.filter(item =>(item.id !== 7 && item.id !== 8));
                setCurrentPageNav(newNavWithoutDocLinks);

            } else {
                const newNavWithDocLinks = currentPageNav.map(item => (item.id === 7) ? {...item, to: linkFeesId} : (item.id === 8) ? {...item, to: linkFedDetails}  : item)
                setCurrentPageNav(newNavWithDocLinks);
            }
        }
    }, [linkFeesId, linkFedDetails, currentPageUserInfo]);

    useEffect(() => {
        console.log('currentPageUserInfo', currentPageUserInfo);
        getMeLogoLink();
        getMeHeadliner();
        getMeName();
        getMeLinkForName();
    }, [currentPageUserInfo]);

    useEffect(() => {
        if(location.pathname.includes('exhibitions/')) {
            const exhibitionId = location.pathname.split('/')[2]
            getExhibition(exhibitionId);
        }
    }, [location]);

    useEffect(() => {
        checkIsProfilePage(exhibAlias)
    }, [exhibAlias]);

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
                                <div className="user-nav__bg-wrap">
                                    <img src={headliner} alt="menu-background" />
                                    <div className="user-nav__userpic">
                                        {
                                            logoLink
                                                ?
                                                <img src={logoLink} alt="menu-logo" />
                                                :
                                                (currentPageUserInfo?.user_type >= 3 || userType >= 3)
                                                    ?
                                                    <img src={'/static/icons/default/club-avatar.svg'} />
                                                    :
                                                    <InitialsAvatar card="mobile-user-menu" name={`${name}`} />
                                        }
                                    </div>
                                </div>
                                <div className="user-nav__alias-name">
                                    <a href={linkForName}>
                                    {name}
                                </a>
                                </div>
                                <ul className="user-nav__new-menu">
                                    {
                                        currentPageNav?.map(navItem => <li
                                            className={`user-nav__item${(navItem.title === 'Уведомления' && (!isUserProfilePage || !isAuth)) ? ' _hidden' : ''}`}
                                            key={navItem.id}>
                                            {navItem.title === 'Уведомления' &&
                                                notificationCounter !== 0 &&
                                                notificationCounter &&
                                                <span
                                                    className={`user-nav__item-notification${notificationCounter > 99 ? ' _plus' : ''}`}
                                                >
                                                { notificationCounter > 99 ? 99 : notificationCounter }
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
                                                        onClick={e => clickOnPresidium(e, currentPageUserInfo?.club_alias)}
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
                                </ul>
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
            {alert && <Alert
                title="Внимание!"
                text="Раздел находится в разработке."
                autoclose={1.5}
                onOk={() => setAlert(false)}
            />}
        </>
    )

};

export default MenuComponentNew;