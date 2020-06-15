import {object, string} from "yup";

export const loginForm = {
    method: 'POST',
    action: '/',
    withLoading: true,
    initialValues: {
        mail: ''
    },
    fields: {
        mail: {
            name: 'mail',
            type: 'email',
            label: 'Войти, как клуб:',
            placeholder: 'Введите E-mail'
        }
    },
    validationSchema: object().shape({
        mail: string().email('Неверный формат E-mail').required('Укажите E-mail')
    })
};