import React from "react";
import {Upload} from "@progress/kendo-react-upload";
import {IntlProvider, LocalizationProvider, loadMessages} from "@progress/kendo-react-intl";
import {Button} from "@progress/kendo-react-buttons";
import Modal from "../../../../components/Modal";
import {getHeaders} from "../../../../utils/request";
import ruMessages from "./ru.json";
import "./index.scss";


loadMessages(ruMessages, 'ru-RU');


const ModalEditAvatar = ({closeModal}) => {
    const onBeforeUpload = event => {
        event.headers = getHeaders(true);
    };

    const onBeforeRemove = event => {
        event.headers = getHeaders(true);
    };

    return (
        <Modal className="edit-avatar-modal" showModal={true} handleClose={() => null}>
            <div className="edit-avatar-modal__content">
                <h3 className="edit-avatar-modal__title">Редактирование фото</h3>
                <div className="edit-avatar-modal__content">
                    <LocalizationProvider language="ru-RU">
                        <IntlProvider locale="ru" >
                            <Upload
                                batch={true}
                                multiple={false}
                                maxFileSize={10485760}
                                restrictions={{
                                    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif']
                                }}
                                withCredentials={false}
                                defaultFiles={[]}
                                onBeforeUpload={onBeforeUpload}
                                onBeforeRemove={onBeforeRemove}
                                saveUrl="/api/avatar/full_v2"
                                removeUrl="/api/avatar/delete_v2"
                            />
                        </IntlProvider>
                    </LocalizationProvider>
                    <div className="k-form-buttons">
                        <Button
                            primary={true}
                            type="button"
                            onClick={closeModal}
                        >
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default React.memo(ModalEditAvatar);