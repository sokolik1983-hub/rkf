import React from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from "react-outside-click-handler";
import './styles.scss';

const Modal = ({ showModal, handleClose, children, noBackdrop = false, className }) => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';

    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal' : 'Modal--hidden') + (noBackdrop ? ' no-backdrop' : '') + (className ? ' ' + className : '')}>
                <div className="Modal__close" onClick={handleClose} />
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="Modal__inner">
                        {children}
                    </div>
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default Modal;