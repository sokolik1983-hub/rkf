import {object, string} from 'yup'
import {
    DEFAULT_PHONE_INPUT_MASK
}from 'appConfig'

export const loginForm = {
    fields: {
        phone_number: {
            mask: DEFAULT_PHONE_INPUT_MASK,
            name: 'phone_number',
            type: 'text',
            label: 'Телефон',
            placeholder: '8 () ___ __ __',

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