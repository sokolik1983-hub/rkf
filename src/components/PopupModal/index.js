import React from "react";
import ReactDOM from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Container from "../Layouts/Container";

import "./styles.scss";

const PopupModal = ({ showModal, handleClose, children, bottomStyle, zIndexStyle }) => {

    return (
        ReactDOM.createPortal(
            <div className={(showModal ? "Modal-popup" : "Modal-popup--hidden") + " " + (bottomStyle ? "bottomStyle" : "") + " " + (zIndexStyle ? "zIndexStyle" : "") }>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <Container className="popup__content">
                        {children}
                    </Container>
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default PopupModal;
