import React, {useState} from "react";
import { Upload } from "@progress/kendo-react-upload";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import {Button} from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
// import {Request} from "../../../../utils/request";
import ruMessages from "./ru.json";
import "./index.scss";

loadMessages(ruMessages, 'ru-RU');


const ModalEditAvatar = ({closeModal}) => {
    // const [loading, setLoading] = useState(false);
    // const [alert, setAlert] = useState(null);

    // const handleError = e => {
    //     if (e.response) {
    //         const errorText = e.response.data.errors ?
    //             Object.values(e.response.data.errors) :
    //             `${e.response.status} ${e.response.statusText}`;
    //
    //         setAlert({
    //             title: `Ошибка!`,
    //             text: errorText,
    //             autoclose: 7.5,
    //             onOk: () => setAlert(null)
    //         });
    //     }
    // };
    //
    // const onSubmit = async file => {
    //     setLoading(true);
    //
    //     console.log(file);
    //
    //     // await Request({
    //     //     url: '/api/registration/cancel_deletion',
    //     //     method: 'POST'
    //     // }, () => {
    //     //     setIsAnswer(false);
    //     //     setDeleteConfirm(false);
    //     //     setLoading(false);
    //     // }, error => {
    //     //     setLoading(false);
    //     //     handleError(error);
    //     // });
    // };

    const onAdd = event => {
        const afterStateChange = () => {
            event.affectedFiles
                .filter(file => !file.validationErrors)
                .forEach(file => {
                    const reader = new FileReader();

                    reader.onloadend = (ev) => {
                        this.setState({
                            filePreviews: {
                                ...this.state.filePreviews,
                                [file.uid]: ev.target.result
                            }
                        });
                    };

                    reader.readAsDataURL(file.getRawFile());
                });
        };

        this.setState({
            files: event.newState,
            events: [
                ...this.state.events,
                `File selected: ${event.affectedFiles[0].name}`
            ]
        }, afterStateChange);
    };

    const onRemove = (event) => {
        const filePreviews = {
            ...this.state.filePreviews
        };

        event.affectedFiles.forEach(file => {
            delete filePreviews[file.uid];
        });

        this.setState({
            files: event.newState,
            events: [
                ...this.state.events,
                `File removed: ${event.affectedFiles[0].name}`
            ],
            filePreviews: filePreviews
        });
    };

    const onBeforeUpload = event => {
        console.log('headers', event.headers);
        console.log('additionalData', event.additionalData);
        // event.additionalData.description = 'File upload';
    };

    const onBeforeRemove = event => {
        console.log('headers', event.headers);
        console.log('additionalData', event.additionalData);
        // event.additionalData.description = 'File remove';
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
                                defaultFiles={[]}
                                withCredentials={false}
                                onBeforeUpload={onBeforeUpload}
                                onBeforeRemove={onBeforeRemove}
                                saveUrl="https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                                removeUrl="https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
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
            {alert && <Alert {...alert} />}
        </Modal>
    )
};

export default React.memo(ModalEditAvatar);