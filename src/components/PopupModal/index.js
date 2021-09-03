import React from "react";
import ReactDOM from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Container from "../Layouts/Container";
import "./styles.scss";

const PopupModal = ({ showModal, handleClose, children }) => {
    return (
        ReactDOM.createPortal(
            <div className={(showModal ? "Modal-popup" : "Modal-popup--hidden")}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                            <Container className="header__content">
                                {children}
                            </Container>
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default PopupModal;
