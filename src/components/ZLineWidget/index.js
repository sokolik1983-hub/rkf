import React, {memo, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import {blockContent} from "../../utils/blockContent";
import {connectAuthVisible} from "../../pages/Login/connectors";
import AuthCard from "../Layouts/AuthLayout/components/AuthCard/AuthCard";
import "./index.scss";
import Button from "../Button";


const ZlineWidget = ({isAuthenticated, access_token, className, iframeLink, isModalShow, handleClose}) => {
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    useEffect(() => {
        blockContent(isModalShow);

        return () => blockContent(false);
    }, [isModalShow]);

    return (
        ReactDOM.createPortal(
            <div className={`zline-modal${!isModalShow ? ' _hidden' : ''}${className ? ' ' + className : ''}`}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="zline-modal__inner">

                        <div className="zline-modal__content">
                            <p className="zline-modal__close" onClick={handleClose}>Закрыть</p>
                            {isAuthenticated ?
                                <iframe src={`${iframeLink}&ak=${access_token}`} title="unique_iframe" /> :
                                showDisclaimer ?
                                    <div className="disclaimer">
                                        <p className="disclaimer__text">Для того, чтобы записаться на посещение офиса в РКФ и Федераций, необходимо быть зарегистрированным и авторизованным пользователем на портале RKF.ONLINE.</p>
                                        <Button
                                            type="button"
                                            className="btn btn-primary btn-lg"
                                            onClick={() => setShowDisclaimer(false)}
                                        >
                                            Войти
                                        </Button>
                                    </div> :
                                    <AuthCard/>
                            }
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default connectAuthVisible(memo(ZlineWidget));