import React from "react";
import {AppBar, Dialog, DialogContent, Toolbar} from "@material-ui/core";
import "./index.scss";


const Modal = ({open, onClose, title, children}) => (
    <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        className="modal"
    >
        <div className='avatar__header'>
            <AppBar position="static" className="modal__top">
                <Toolbar className="modal__title">
                    <div className='avatar_icon'></div>
                    <div className="avatar__title">{title}</div>
                    <div className="avatar__close"><span className="modal-close" onClick={onClose}></span></div>
                </Toolbar>
            </AppBar>
        </div>
        <div className='avatar__content'>
            <DialogContent className="modal__content">
            {children}
            </DialogContent>
        </div>
    </Dialog>
);

export default Modal;