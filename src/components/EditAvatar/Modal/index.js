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
        <AppBar position="static" className="modal__top">
            <Toolbar className="modal__title">
                {title}
                <span className="modal-close" onClick={onClose}></span>
            </Toolbar>
        </AppBar>
        <DialogContent className="modal__content">
            {children}
        </DialogContent>
    </Dialog>
);

export default Modal;