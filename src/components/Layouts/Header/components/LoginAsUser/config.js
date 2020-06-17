import {object, string} from "yup";

export const loginForm = {
    method: 'POST',
    action: '/api/administration/authentication/login',
    withLoading: true,
    initialValues: {
        mail: ''
    },
    fields: {
        mail: {
            name: 'mail',
            type: 'email',
            label: 'Введите E-mail:',
            placeholder: 'Введите E-mail'
        }
    },
    validationSchema: object().shape({
        mail: string().email('Неверный формат E-mail').required('Укажите E-mail')
    })
};