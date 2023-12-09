import React, {useState} from "react";
import {Upload} from "@progress/kendo-react-upload";
import {IntlProvider, LocalizationProvider, loadMessages} from "@progress/kendo-react-intl";
import {Button} from "@progress/kendo-react-buttons";
import Modal from "../../../../components/Modal";
import {getHeaders} from "../../../../utils/request";
import kendoMessages from 'kendoMessages.json';
import {blockContent} from "../../../../utils/blockContent";
import OutsideClickHandler from "react-outside-click-handler";

import "./index.scss";


loadMessages(kendoMessages, 'ru-RU');


const ModalEditBanner = ({closeModal, updateInfo}) => {
    const [isChanged, setIsChanged] = useState(false);

    const onBeforeUpload = event => {
        event.headers = getHeaders(true);
        setIsChanged(true);
    };

    const onBeforeRemove = event => {
        event.headers = getHeaders(true);
        setIsChanged(true);
    };

    const handleClose = () => {
        closeModal();
        blockContent();
    }

    return (
        <Modal
            className="edit-banner-modal"
            showModal={true}
            handleX={() => {
                closeModal();
                if(isChanged) updateInfo();
                blockContent(false);
            }}
            headerName = "Редактирование фото"
        >
            <OutsideClickHandler onOutsideClick={handleClose}>
                <div className="edit-banner-modal__content">
                    <div className="edit-banner-modal__content">

                        <LocalizationProvider language="ru-RU">
                            <IntlProvider locale="ru" >
                                <Upload
                                    batch={true}
                                    multiple={false}
                                    maxFileSize={10485760}
                                    restrictions={{
                                        allowedExtensions: ['.jpg', '.jpeg']
                                    }}
                                    withCredentials={false}
                                    defaultFiles={[]}
                                    onBeforeUpload={onBeforeUpload}
                                    onBeforeRemove={onBeforeRemove}
                                    saveUrl="/api/headerpicture/full_v2"
                                    removeUrl="/api/headerpicture/delete_v2"
                                />
                            </IntlProvider>
                        </LocalizationProvider>
                        <p>поддерживаемые форматы: JPG и JPEG</p>
                        <div className="k-form-buttons">
                            <Button
                                primary={true}
                                type="button"
                                onClick={() => {
                                    closeModal();
                                    if(isChanged) updateInfo();
                                    blockContent();
                                }}
                            >
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </Modal>
    )
};

export default React.memo(ModalEditBanner);