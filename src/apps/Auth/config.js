import {object, string} from 'yup'
import {
    DEFAULT_PHONE_INPUT_MASK
} from 'appConfig'


export const redirectAfterLogin = '/';

export const loginFormConfig = {
    formAction: '/api/Authentication',
    fields: {
        phone_number: {
            name: 'phone_number',
            type: 'text',
            label: 'Телефон',
            placeholder: '7 (   ) ___ __ __',
            fieldType: 'customPhone'
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