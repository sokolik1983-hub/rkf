import React, {memo, useEffect} from "react";
import ReactDOM from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import {blockContent} from "../../utils/blockContent";
import {connectAuthVisible} from "../../pages/Login/connectors";
import AuthCard from "../Layouts/AuthLayout/components/AuthCard/AuthCard";
import "./index.scss";


const ZlineWidget = ({isAuthenticated, className, iframeLink, isModalShow, handleClose}) => {
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
                            {isAuthenticated ?
                                <iframe src={iframeLink} title="unique_iframe" /> :
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