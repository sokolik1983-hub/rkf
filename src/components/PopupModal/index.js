import React from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from "react-outside-click-handler";
import Container from "../Layouts/Container";
import './styles.scss';

const PopupModal = ({ showModal, handleClose, handleX, children, noBackdrop = false, className, headerName }) => {

    return (
        ReactDOM.createPortal(
            <Container className="header__content">
                {children}
            </Container>
        )
    );
};

export default PopupModal;
