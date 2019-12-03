import React, { useState } from 'react';
import Tabs, { TabContent } from "components/CommonTabs";
import Modal from 'components/Modal';
import {
    Form,
    SubmitButton,
    FormGroup,
    FormField
} from 'components/Form';
import { object, string } from 'yup';
import {
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_PHONE_INPUT_MASK
} from "appConfig";
import './styles.scss';


const Feedback = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    }
    const onModalClose = () => {
        if (showModal && window.confirm('Действительно закрыть окно?')) setShowModal(false);
    }
    const feedbackFormConfig = {
        action: '/api/Feedback',
        onSuccess: (data) => {
            if (data) {
                alert('Ваше сообщение отправлено');
                setShowModal(false);
            } else {
                alert('Произошла ошибка, попробуйте позже');
            }
        },
        fields: {
            full_name: {
                name: 'full_name',
                label: 'ФИО',
                type: 'text',
                placeholder: "Введите ваше имя",
                noTouch: true
            },
            phone_number: {
                name: 'phone_number',
                label: 'Телефон',
                fieldType: 'masked',
                type: 'text',
                placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
                mask: DEFAULT_PHONE_INPUT_MASK,
                noTouch: true
            },
            mail: {
                name: 'mail',
                label: 'Email',
                type: 'text',
                placeholder: DEFAULT_EMAIL_INPUT_PLACEHOLDER,
                noTouch: true
            },
            description: {
                name: 'description',
                label: 'Сообщение',
                type: 'text',
                fieldType: 'textarea',
                placeholder: "Введите ваше сообщение",
                noTouch: true
            }
        },
        validationSchema: object().shape({
            full_name: string()
                .required('Поле не может быть пустым'),
            phone_number: string()
                .length(15, 'Номер телефона должен содержать 11 цифр')
                .required('Поле не может быть пустым'),
            mail: string()
                .required('Поле не может быть пустым')
                .email('Неверный формат электронного адреса'),
            description: string()
                .required('Поле не может быть пустым'),
        }),
    };
    const { fields } = feedbackFormConfig;
    const d = new Date();
    return (<React.Fragment>
        <a className="feedback-link" onClick={handleClick} href="/">Обратная связь</a>

        <Modal showModal={showModal} handleClose={onModalClose} noBackdrop={true}>
            <div className="feedback-tabs">
                <Tabs>
                    <TabContent tabContent="Сообщить об ошибке">
                        <Form
                            {...feedbackFormConfig}
                            initialValues={{
                                type: 1,
                                title: "Новое обращение от " + d.toLocaleDateString() + " " + d.toLocaleTimeString()
                            }}
                        >
                            <FormGroup>
                                <FormField
                                    {...fields.full_name}
                                />
                                <FormField
                                    {...fields.phone_number}
                                />
                                <FormField
                                    {...fields.mail}
                                />
                                <FormField
                                    {...fields.description}
                                />
                            </FormGroup>
                            <SubmitButton className="btn-primary btn-lg">Отправить</SubmitButton>
                        </Form>
                    </TabContent>
                    <TabContent tabContent="Предложение по работе портала">
                        <Form
                            {...feedbackFormConfig}
                            initialValues={{ type: 2 }}
                        >
                            <FormGroup>
                                <FormField
                                    {...fields.full_name}
                                />
                                <FormField
                                    {...fields.phone_number}
                                />
                                <FormField
                                    {...fields.mail}
                                />
                                <FormField
                                    {...fields.description}
                                />
                            </FormGroup>
                            <SubmitButton className="btn-primary btn-lg">Отправить</SubmitButton>
                        </Form>
                    </TabContent>
                </Tabs>
            </div>
        </Modal>
    </React.Fragment>);
}

export default Feedback;