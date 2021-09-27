import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from "react-outside-click-handler";
import {blockContent} from "../../utils/blockContent";

import './styles.scss';

const Modal = ({ showModal, handleClose, handleX, children, noBackdrop = false, className, headerName}) => {
    useEffect(() => {
        blockContent(showModal);
    });
    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal' : 'Modal--hidden') + (noBackdrop ? ' no-backdrop' : '') + (className ? ' ' + className : '')}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="Modal__inner">
                        <div className="Modal__close" onClick={handleX ? handleX : handleClose} />
                        <div className={'Modal__body' + (headerName ? '' : ' noheader')}>
                            {!!headerName && <h3 className="Modal__header">{headerName}</h3>}
                            {children}
                        </div>
                    </div>
                    {/*<div className="Modal__close-text" onClick={handleClose}>Закрыть</div>*/}
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export const VideoModal = ({ showModal, handleClose, children, noBackdrop = false, className }) => {
    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal' : 'Modal--hidden') + (noBackdrop ? ' no-backdrop' : '') + (className ? ' ' + className : '') + ' VideoModal'}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="VideoModal__close" onClick={handleClose} />
                    {children}
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default Modal;
