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
    const FeedbackFormConfig = {
        action: '/test/',
        onSuccess: () => { alert('hi') },
        fields: {
            name: {
                name: 'name',
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
            email: {
                name: 'email',
                label: 'Email',
                type: 'text',
                placeholder: DEFAULT_EMAIL_INPUT_PLACEHOLDER,
                noTouch: true
            },
            message: {
                name: 'message',
                label: 'Сообщение',
                type: 'text',
                fieldType: 'textarea',
                placeholder: "Введите ваше сообщение",
                noTouch: true
            }
        },
        validationSchema: object().shape({
            name: string()
                .required('Поле не может быть пустым'),
            phone_number: string()
                .length(15, 'Номер телефона должен содержать 11 цифр')
                .required('Поле не может быть пустым'),
            email: string()
                .required('Поле не может быть пустым')
                .email('Неверный формат электронного адреса'),
            message: string()
                .required('Поле не может быть пустым'),
        }),
    };
    const { fields } = FeedbackFormConfig;

    return (<React.Fragment>
        <a className="feedback-link" onClick={handleClick} href="/">Обратная связь</a>

        <Modal showModal={showModal} handleClose={onModalClose} noBackdrop={true}>
            <div className="feedback-tabs">
                <Tabs>
                    <TabContent tabContent="Сообщить об ошибке">
                        <Form
                            {...FeedbackFormConfig}
                        >
                            <FormGroup>
                                <FormField
                                    {...fields.name}
                                />
                                <FormField
                                    {...fields.phone_number}
                                />
                                <FormField
                                    {...fields.email}
                                />
                                <FormField
                                    {...fields.message}
                                />
                            </FormGroup>
                            <SubmitButton className="btn-primary btn-lg">Отправить</SubmitButton>
                        </Form>
                    </TabContent>
                    <TabContent tabContent="Предложение по работе портала">
                        <Form
                            {...FeedbackFormConfig}
                        >
                            <FormGroup>
                                <FormField
                                    {...fields.name}
                                />
                                <FormField
                                    {...fields.phone_number}
                                />
                                <FormField
                                    {...fields.email}
                                />
                                <FormField
                                    {...fields.message}
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