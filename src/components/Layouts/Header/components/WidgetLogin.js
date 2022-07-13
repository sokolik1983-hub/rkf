import React, {memo, useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import Avatar from "../../Avatar";
import AuthButtons from "./AuthButtons";
import LoginAsUser from "./LoginAsUser";
import Content from "./Content/Content";
import Modal from "../../../Modal";
import PopupModal from "../../../PopupModal";
import {connectWidgetLogin} from "../../../../pages/Login/connectors";
import useIsMobile from "../../../../utils/useIsMobile";
import {blockContent} from "../../../../utils/blockContent";


const WidgetLogin = ({
    open,
    setOpen,
    login_page,
    footerNav,
    loginUserSuccess,
    logOutUser,
    isAuthenticated,
    is_active_profile,
    account_type,
    user_info
}) => {
    const [desktop, setDesktop] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isMobile1080 = useIsMobile(1080);
    const {alias, name, user_type, first_name, last_name, logo_link, headliner_link} = user_info || {};

    const widgetLoginRef = useRef();

    useEffect(() => {
        setOpen(desktop);
    }, [desktop]);

    useEffect(() => {
        blockContent(open);
    }, [open]);

    const handleChecked = () => {
        setDesktop(!desktop);
    };

    const handleOutsideClick = event => {
        if(!widgetLoginRef.current?.contains(event.target)) {
            setDesktop(false);
        }
    };

    return (
        <div className={`widget-login class-for-grid-block3${!isAuthenticated ? ' __no-auth' : ''}`}>
            {isAuthenticated ?
                <section>
                    <div
                        className={`widget-login__wrap${open ? ' _login_open' : ''}`}
                        ref={widgetLoginRef}
                        onClick={handleChecked}
                    >
                        {isMobile1080 ?
                            <div className="widget-login__user-icon">
                                {footerNav?.image}
                                <span>
                                    {footerNav?.title}
                                </span>
                            </div>
                            :
                            <Avatar
                                data="logo"
                                logo={logo_link}
                                card="user-icon"
                                open={open}
                                userType={user_type}
                                name={name}
                                subclass="user-icon"
                            />
                        }
                        {!isMobile1080 &&
                            <span>
                                Профиль
                            </span>
                        }
                    </div>
                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                        <CSSTransition
                            in={open}
                            timeout={350}
                            classNames="widget-login-transition"
                            unmountOnExit
                        >
                            <PopupModal
                                showModal={open}
                                handleClose={(event) => {
                                    !widgetLoginRef.current.contains(event.target) && setOpen(false)
                                }}
                                bottomStyle={isMobile1080}
                            >
                                <div className="widget-login__inner">
                                    <Content
                                        open={open}
                                        setOpen={setOpen}
                                        setShowModal={setShowModal}
                                        loginUserSuccess={loginUserSuccess}
                                        logOutUser={logOutUser}
                                        isMobile1080={isMobile1080}
                                        alias={alias}
                                        userType={user_type}
                                        accountType={account_type}
                                        is_active_profile={is_active_profile}
                                        name={name}
                                        lastName={last_name}
                                        firstName={first_name}
                                        logo={logo_link}
                                        menuBackground={headliner_link}
                                    />
                                </div>
                            </PopupModal>
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
                <LoginAsUser closeModal={() => setShowModal(false)}/>
            </Modal>
        </div>
    )
};

export default connectWidgetLogin(memo(WidgetLogin));