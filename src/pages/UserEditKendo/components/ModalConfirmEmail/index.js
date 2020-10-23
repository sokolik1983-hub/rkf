import React, {useState} from "react";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
import FormInput from "../FormInput";
import {codeValidator} from "../../validators";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ModalConfirmEmail = ({email, closeModal, updateInfo}) => {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [alert, setAlert] = useState(null);

    const handleError = e => {
        if (e.response) {
            const errorText = e.response.data.errors ?
                Object.values(e.response.data.errors) :
                `${e.response.status} ${e.response.statusText}`;

            setAlert({
                title: `Ошибка!`,
                text: errorText,
                autoclose: 7.5,
                onOk: () => setAlert(null)
            });
        }
    };

    const handleSubmit = async data => {
        setLoading(true);

        await Request({
            url: '/api/registration/activate_changed_user_mail',
            method: 'PUT',
            data: JSON.stringify(data.code)
        }, () => {
            setIsSuccess(true);
            setLoading(false);
        }, error => {
            handleError(error);

            if(error.response && error.response.data.errors && error.response.data.errors.code) {
                setError(error.response.data.errors.code);
            }

            setLoading(false);
        });
    };

    return (
        <Modal className="confirm-email-modal" showModal={true} handleClose={() => null}>
            <div className="confirm-email-modal__content">
                <h3 className="confirm-email-modal__title">Изменение логина</h3>
                {loading ?
                    <Loading centered={false}/> :
                    !isSuccess ?
                        <>
                            <p className="confirm-email-modal__describe">
                                На E-mail <b>{email}</b><br/>
                                был выслан код подтверждения.<br/>
                                Введите его в поле ниже и нажмите "Подтвердить".<br/>
                                Если Вы передумали - нажмите кнопку "Отмена"<br/>
                                и не реагируйте на письмо.<br/>
                                Код будет действителен в течение 12 часов.
                            </p>
                            <p className="confirm-email-modal__describe">Код подтверждения:</p>
                            <Form
                                onSubmit={handleSubmit}
                                render={formRenderProps =>
                                    <FormElement>
                                        <Field
                                            id="code"
                                            name="code"
                                            component={FormInput}
                                            validator={codeValidator}
                                        />
                                        <div className="k-form-buttons">
                                            <button
                                                className="btn btn-light"
                                                type="button"
                                                onClick={closeModal}
                                            >
                                                Отменить
                                            </button>
                                            <Button
                                                primary={true}
                                                type="submit"
                                                disabled={!formRenderProps.allowSubmit}
                                            >
                                                Применить
                                            </Button>
                                        </div>
                                    </FormElement>
                                }
                            />
                        </> :
                        <>
                            <img src="/static/images/edit/dog-left.svg"  className="confirm-email-modal__img" alt="собака"/>
                            <p className="confirm-email-modal__describe">Ваш логин успешно изменён.</p>
                            <div className="confirm-email-modal__buttons k-form-buttons">
                                <Button
                                    primary={true}
                                    type="button"
                                    onClick={() => {
                                        updateInfo();
                                        closeModal();
                                    }}
                                >Закрыть</Button>
                            </div>
                        </>
                }
            </div>
            {alert && <Alert {...alert} />}
        </Modal>
    )
};

export default React.memo(ModalConfirmEmail);