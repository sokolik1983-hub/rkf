import React from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from "react-outside-click-handler";
import Container from "../Layouts/Container";
import './styles.scss';

const PopupModal = ({ showModal, handleClose, handleX, children, noBackdrop = false, className, headerName, otherPopup }) => {

    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal-zline' : 'Modal-zline--hidden') + (noBackdrop ? ' no-backdrop' : '') + ( otherPopup ? ' otherPopup' : '') + (className ? ' ' + className : '') }>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    {
                        otherPopup
                            ?
                            <Container className='header__content'>
                                {children}
                            </Container>
                            :

                            <div className="Modal-zline__inner">
                                <div className="Modal-zline__close" onClick={handleX ? handleX : handleClose} />
                                <div className={'Modal-zline__body' + (headerName ? '' : ' noheader')}>
                                    {!!headerName && <h3 className="Modal-zline__header">{headerName}</h3>}
                                    {children}
                                </div>
                            </div>

                    }
                </OutsideClickHandler>
            </div>, document.body
        )
    );
};

export default PopupModal;
