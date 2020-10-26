import React from "react";
import {Button} from "@progress/kendo-react-buttons";
import Modal from "../../../../components/Modal";
import "./index.scss";


const ModalPasswordSuccess = ({closeModal}) => (
    <Modal className="password-success-modal" showModal={true} handleClose={() => null}>
        <div className="password-success-modal__content">
            <h3 className="password-success-modal__title">Изменение пароля</h3>
            <img src="/static/images/edit/dog-left.svg" className="password-success-modal__img" alt="собака"/>
            <p className="password-success-modal__describe">На Ваш e-mail было отправлено письмо с ссылкой для подтверждения смены пароля.</p>
            <div className="password-success-modal__buttons k-form-buttons">
                <Button
                    primary={true}
                    type="button"
                    onClick={closeModal}
                >Закрыть</Button>
            </div>
        </div>
    </Modal>
);

export default React.memo(ModalPasswordSuccess);