import React, { useState, useEffect } from "react";
import Modal from "components/Modal";
import Loading from "components/Loading";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import FormInput from "components/kendo/Form/FormInput";
import FormTextArea from "components/kendo/Form/FormTextArea";
import { emailRequiredValidator, phoneRequiredValidator, requiredValidator } from "components/kendo/Form/validators";
import { Request } from "utils/request";
import './styles.scss';

const SignUpForm = ({ title, id, closeModal }) => {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        id: id,
        first_name: '',
        last_name: '',
        second_name: '',
        phone_number: '',
        email: '',
        comments: '',
    });

    useEffect(() => {
        Request({
            url: '/api/educations/education/profile_info'
        }, data => {
            setValues({ ...values, ...data });
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        })
    }, []);


    const handleSubmit = data => {
        Request({
            url: '/api/educations/education/sign_up',
            method: 'POST',
            data: JSON.stringify(data)
        }, data => {
            closeModal();
            alert('Запись оформлена!');
            setLoading(false);
        }, error => {
            alert(`Ошибка: ${error.response.data.errors
                ? Object.values(error.response.data.errors)
                : `${error.response.status} ${error.response.statusText}`}`);
            console.log(error.response);
            closeModal();
        })
    };

    return (
        <div className="educational-sign-up">
            <h2 className="educational-sign-up__title">{title}</h2>
            <h3>Убедитесь в правильности заполнения ФИО</h3>
            {
                loading
                    ? <Loading inline={true} />
                    : <Form
                        className="educational-sign-up__form"
                        onSubmit={handleSubmit}
                        initialValues={values}
                        render={formRenderProps =>
                            <FormElement>
                                <div className="educational-sign-up__form-row">
                                    <Field
                                        id="last_name"
                                        name="last_name"
                                        label="Фамилия"
                                        component={FormInput}
                                        validator={requiredValidator}
                                    />
                                    <Field
                                        id="first_name"
                                        name="first_name"
                                        label="Имя"
                                        component={FormInput}
                                        validator={requiredValidator}
                                    />
                                    <Field
                                        id="second_name"
                                        name="second_name"
                                        label="Отчество (при наличии)"
                                        component={FormInput}
                                    />
                                </div>
                                <div className="educational-sign-up__form-row">
                                    <Field
                                        id="phone_number"
                                        name="phone_number"
                                        label="Телефон"
                                        component={FormInput}
                                        validator={phoneRequiredValidator}
                                    />
                                    <Field
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        component={FormInput}
                                        validator={emailRequiredValidator}
                                    />
                                </div>
                                <Field
                                    id="comments"
                                    name="comments"
                                    label="Комментарий"
                                    maxLength={500}
                                    component={FormTextArea}
                                />
                                <div className="educational-sign-up__form-controls">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    //disabled={!formRenderProps.modified || !formRenderProps.valid}
                                    >Записаться
                    </button>
                                </div>
                            </FormElement>
                        }
                    />
            }

        </div>
    )
};

const SignUpModal = ({ showModal, setShowModal, title, id }) => (
    <Modal showModal={showModal} handleClose={() => setShowModal(false)} className="educational-page__modal" headerName={"Запись на мероприятие"}>
        <SignUpForm title={title} id={id} closeModal={() => setShowModal(false)} />
    </Modal>
);

export default SignUpModal;