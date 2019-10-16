import { object, string } from 'yup'
import { DEFAULT_EMAIL_INPUT_PLACEHOLDER } from "appConfig";


export const defaultReduxKey = 'authentication';

export const redirectAfterLogin = '/';

export const loginFormConfig = {
    formAction: '/api/Authentication',
    fields: {
        // phone_number: {
        //     name: 'phone_number',
        //     label: 'Телефон',
        //     fieldType: 'masked',
        //     type: 'text',
        //     placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
        //     mask: DEFAULT_PHONE_INPUT_MASK//['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        // },
        email: {
            name: 'email',
            label: 'Email',
            type: 'text',
            placeholder: DEFAULT_EMAIL_INPUT_PLACEHOLDER,
        },
        password: {
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Введите ваш пароль'
        }
    },
    validationSchema: object().shape({
        email: string()
            .email('Неверный Email')
            .required('Поле не может быть пустым'),
        password: string()
            .required('Поле не может быть пустым')
    }),
};