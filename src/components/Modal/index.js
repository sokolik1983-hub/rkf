import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import {blockContent} from "../../utils/blockContent";
import "./styles.scss";


const Modal = ({
    showModal,
    handleClose,
    handleX,
    children,
    noBackdrop = false,
    className,
    headerName,
    iconName='default-modal-white',
    withCloseBtn
}) => {
    useEffect(() => {
        blockContent(showModal);
    }, [showModal]);

    return (
        ReactDOM.createPortal(
            <div className={(showModal ? 'Modal' : 'Modal--hidden') + (noBackdrop ? ' no-backdrop' : '') + (className ? ' ' + className : '')}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className="Modal__inner">
                        {!!headerName &&
                            <div className="Modal__main__header">
                                <div className="Modal__icon"
                                     style={{background: `url(/static/icons/${iconName}.svg) center  no-repeat `}}>
                                </div>
                                <h3 className="Modal__header" >{headerName}</h3>
                                <div className="Modal__close" onClick={handleX ? handleX : handleClose} />
                            </div>
                        }
                        {withCloseBtn &&
                            <button type="button" className="Modal__close-btn" onClick={handleClose}>&#10006;</button>
                        }
                        <div className={'Modal__body' + (headerName ? '' : ' noheader')}>
                            {children}
                        </div>
                    </div>
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
