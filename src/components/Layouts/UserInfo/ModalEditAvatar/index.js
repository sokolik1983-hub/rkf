import React, {useState} from "react";
import {Upload} from "@progress/kendo-react-upload";
import {IntlProvider, LocalizationProvider, loadMessages} from "@progress/kendo-react-intl";
import {Button} from "@progress/kendo-react-buttons";
import Modal from "../../../../components/Modal";
import {getHeaders} from "../../../../utils/request";
import kendoMessages from 'kendoMessages.json';
import "./index.scss";


loadMessages(kendoMessages, 'ru-RU');


const ModalEditAvatar = ({closeModal, updateInfo}) => {
    const [isChanged, setIsChanged] = useState(false);

    const onBeforeUpload = event => {
        event.headers = getHeaders(true);
        setIsChanged(true);
    };

    const onBeforeRemove = event => {
        event.headers = getHeaders(true);
        setIsChanged(true);
    };

    return (
        <Modal
            className="edit-avatar-modal"
            showModal={true}
            handleClose={() => null}
            handleX={() => {
                closeModal();
                if(isChanged) updateInfo();
            }}
        >
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
                            onClick={() => {
                                closeModal();
                                if(isChanged) updateInfo(true);
                            }}
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