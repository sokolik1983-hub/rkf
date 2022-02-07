import React from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from "react-outside-click-handler";
import './styles.scss';

const ZlineModal = ({ showModal, handleClose, handleX, children, noBackdrop = false, className, headerName }) => {


    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal-zline' : 'Modal-zline--hidden') + (noBackdrop ? ' no-backdrop' : '') + (className ? ' ' + className : '')}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="Modal-zline__inner">
                        {/*<div className="Modal-zline__close" onClick={handleX ? handleX : handleClose} />*/}
                        <div className={'Modal-zline__body' + (headerName ? '' : ' noheader')}>
                            {!!headerName && <h3 className="Modal-zline__header">{headerName}</h3>}
                            {children}
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default ZlineModal;
