import {object, string} from "yup";


export const loginFormConfig = {
    action: '/api/Authentication',
    fields: {
        email: {
            name: 'email',
            label: 'E-mail',
            type: 'text',
            placeholder: 'Введите ваш E-mail'
        },
        password: {
            name: 'password',
            label: 'Пароль',
            placeholder: 'Введите ваш пароль'
        }
    },
    validationSchema: object().shape({
        email: string().required('Поле не может быть пустым'),
        password: string().required('Поле не может быть пустым')
    })
};