import {object, string} from "yup";
import {
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_PHONE_INPUT_MASK
} from "../../appConfig";

export const reasons = [
    {
        type: 0,
        name: 'Проблемы по работе RKF.ONLINE'
    },
    {
        type: 1,
        name: 'Моего клуба нет в списке'
    },
    {
        type: 2,
        name: 'Не приходит сообщение с данными для входа'
    },
    {
        type: 3,
        name: 'У моего клуба неверно указаны данные'
    },
    {
        type: 4,
        name: 'Предложения по работе RKF.ONLINE'
    }
];

export const feedbackFormConfig = {
    action: '/api/Feedback',
    fields: {
        reason: {
            name: 'reason',
            label: 'Причина обращения',
            placeholder: 'Выберите причину',
            fieldType: 'reactSelect',
            type: 'select',
            options: reasons.map(reason => ({label: reason.name, value: reason.type}))
        },
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
        reason: string()
            .required('Поле не может быть пустым'),
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