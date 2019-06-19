import {object, string} from 'yup'
import {DEFAULT_PHONE_INPUT_MASK, DEFAULT_PHONE_INPUT_PLACEHOLDER} from "appConfig";

export const redirectAfterLogin = '/';

export const loginFormConfig = {
    formAction: '/api/Authentication',
    fields: {
        phone_number: {
            name: 'phone_number',
            label: 'Телефон',
            fieldType: 'masked',
            type: 'text',
            placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
            mask: DEFAULT_PHONE_INPUT_MASK//['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        },
        password: {
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Введите ваш пароль'
        }
    },
    validationSchema: object().shape({
        phone_number: string()
            .required('Поле не может быть пустым'),
        password: string()
            .required('Поле не может быть пустым')
    }),
};