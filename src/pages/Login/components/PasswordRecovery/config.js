import {object, string} from "yup";


export const PassRecoveryForm = {
    method: 'POST',
    action: '/api/Registration/reset_password_by_mail',
    withLoading: true,
    initialValues: {
        mail: ''
    },
    fields: {
        mail: {
            name: 'mail',
            type: 'email',
            label: 'E-mail',
            placeholder: 'Введите Ваш E-mail'
        }
    },
    validationSchema: object().shape({
        mail: string().email('Неверный формат E-mail').required('Поле не может быть пустым')
    })
};