import React from "react";
import ReactDOM from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Container from "../Layouts/Container";
import "./styles.scss";

const PopupModal = ({ showModal, handleClose, children, bottomStyle }) => {
    return (
        ReactDOM.createPortal(
            <div className={(showModal ? "Modal-popup" : "Modal-popup--hidden") + " " + (bottomStyle ? "bottomStyle" : "") }>
                            <Container className="popup__content">
                                {children}
                            </Container>
            </div>, document.body
        )
    );
};

export default PopupModal;
