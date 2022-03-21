import React, {forwardRef, useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import ls from "local-storage";
import {endpointGetClubInfo} from "../../ClubLayout/config";
import {endpointGetUserInfo} from "../../UserLayout/config";
import {connectLogin, connectWidgetLogin} from "../../../../pages/Login/connectors";
import AuthButtons from "./AuthButtons";
import LoginAsUser from "./LoginAsUser";
import Content from "./Content/Content";
import Modal from "../../../Modal";
import PopupModal from "../../../PopupModal";
import {DEFAULT_IMG} from "../../../../appConfig";
import history from "../../../../utils/history";
import {Request} from "../../../../utils/request";
import useIsMobile from "../../../../utils/useIsMobile";


const WidgetLogin = forwardRef(
    ({
    isAuthenticated,
    is_active_profile,
    loginUserSuccess,
    logOutUser,
    logo_link,
    login_page,
    footerNav,
    withFilters,
    setOpen,
    open
}, ref) => {
    const [desktop, setDesktop] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [menuBackground, setMenuBackground] = useState(null);

    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const name = ls.get('user_info') ? ls.get('user_info').name : '';
    const logo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;
    const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
    const accountType = ls.get('account_type') ? ls.get('account_type') : '';
    const firstName = ls.get('user_info') ? ls.get('user_info').first_name : '';
    const lastName = ls.get('user_info') ? ls.get('user_info').last_name : '';
    const isMobile1080 = useIsMobile(1080);

    const widgetLoginRef = useRef();

    useEffect(() => {
        backgroundForPage(alias);
    }, [alias]);

    useEffect(() => {
        setOpen(desktop);
    }, [desktop]);

    const handleChecked = () => {
        setDesktop(!desktop);
    };

    const handleOutsideClick = (event) => {
        !widgetLoginRef.current?.contains(event.target) && setDesktop(false);
    }

    const backgroundForPage = async (alias) => {
        await Request({
            url: `${(userType === 1) ? endpointGetUserInfo : endpointGetClubInfo}${alias}`
        }, data => {
            setMenuBackground(data.headliner_link);
        }, error => {
            console.log(error.response);
        });
    };


    return (
        <div className={`widget-login class-for-grid-block3 ${login_page ? "active" : !isAuthenticated && "__noAuth"}`}>
            {isAuthenticated ?
                <section>
                    <div
                        className={`widget-login__wrap ${open && "_login_open "}`}
                        ref={widgetLoginRef}
                        onClick={handleChecked}
                    >
                        {isMobile1080 ?
                            <div className={`widget-login__user-icon`}>
                                {footerNav?.image}
                                <span style={{color: open && '#3366FF', userSelect: "none"}}>
                                    {footerNav?.title}
                                </span>
                            </div> :
                            <div className={`widget-login__user-icon ${open ? ` _active` : !logo && ` _no-logo`}`}
                                style={{backgroundImage: `url(${logo ? logo : userType === 1 ? DEFAULT_IMG.userAvatar : DEFAULT_IMG.clubAvatar})`}}
                            />
                        }
                        {!isMobile1080 && <span>Профиль</span>}
                    </div>
                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="widget-login-transition"
                            unmountOnExit
                        >
                            {isMobile1080 ?
                                <PopupModal
                                    showModal={open}
                                    handleClose={(event) => {
                                        !widgetLoginRef.current.contains(event.target) && setOpen(false)
                                    }}
                                    bottomStyle
                                >
                                    <div className="widget-login__inner">
                                        <Content
                                            open={open}
                                            name={name}
                                            logo={logo}
                                            alias={alias}
                                            setOpen={setOpen}
                                            userType={userType}
                                            lastName={lastName}
                                            firstName={firstName}
                                            logOutUser={logOutUser}
                                            accountType={accountType}
                                            setShowModal={setShowModal}
                                            isMobile1080={isMobile1080}
                                            menuBackground={menuBackground}
                                            loginUserSuccess={loginUserSuccess}
                                            is_active_profile={is_active_profile}
                                        />
                                    </div>
                                </PopupModal> :
                                <Content
                                    open={open}
                                    name={name}
                                    logo={logo}
                                    alias={alias}
                                    setOpen={setOpen}
                                    userType={userType}
                                    lastName={lastName}
                                    firstName={firstName}
                                    logOutUser={logOutUser}
                                    accountType={accountType}
                                    setShowModal={setShowModal}
                                    isMobile1080={isMobile1080}
                                    menuBackground={menuBackground}
                                    loginUserSuccess={loginUserSuccess}
                                    is_active_profile={is_active_profile}
                                />
                            }
                        </CSSTransition>
                    </OutsideClickHandler>
                </section> :
                <AuthButtons login_page={login_page}/>
            }
            <Modal
                className="widget-login__modal"
                iconName="enter-white"
                headerName="Войти как клуб"
                showModal={showModal}
                handleClose={() => setShowModal(false)}
            >
                <LoginAsUser
                    history={history}
                    closeModal={() => setShowModal(false)}
                />
            </Modal>
        </div>
    )
});

export default connectWidgetLogin(connectLogin(React.memo(WidgetLogin)));
