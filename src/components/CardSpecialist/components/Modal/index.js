import React from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from "react-outside-click-handler";
import './styles.scss';

const Modal = ({ showModal, handleClose, handleX, children, noBackdrop = false, className, headerName }) => {

    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal-specialist' : 'Modal-specialist--hidden') + (noBackdrop ? ' no-backdrop' : '') + (className ? ' ' + className : '')}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="Modal-specialist__wrap">
                        <div style={{ backgroundColor: 'transparent', width: '100px', height: '40px' }}>
                            <div className="Modal-specialist__close" onClick={handleX ? handleX : handleClose} />
                        </div>
                        <div className="Modal-specialist__inner">
                            <div className={'Modal-specialist__body' + (headerName ? '' : ' noheader')}>
                                {!!headerName && <h3 className="Modal-specialist__header">{headerName}</h3>}
                                {children}
                            </div>
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default Modal;