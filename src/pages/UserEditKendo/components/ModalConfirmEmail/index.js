import React from "react";
import Modal from "../../../../components/Modal";
import "./index.scss";


const ModalConfirmEmail = ({email, closeModal}) => {


    return (
        <Modal className="confirm-email-modal" showModal={true} handleClose={closeModal}>

        </Modal>
    )
};

export default React.memo(ModalConfirmEmail);