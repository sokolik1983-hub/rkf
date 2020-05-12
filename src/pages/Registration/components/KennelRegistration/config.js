import {object, string} from "yup";


export const kennelForm = {
    method: 'POST',
    action: '/',
    withLoading: true,
    initialValues: {
        registration_number: ''
    },
    fields: {
        registration_number: {
            name: 'registration_number',
            type: 'text',
            placeholder: 'Номер свидетельства о регистрации',
            maxLength: 15
        }
    },
    validationSchema: object().shape({
        registration_number: string()
            .required('Поле не может быть пустым')
            .min(15, 'Номер не может быть меньше 15 символов')
    })
};

export const emailForm = {
    method: 'POST',
    action: '/',
    withLoading: true,
    initialValues: {
        email: ''
    },
    fields: {
        email: {
            name: 'email',
            type: 'email',
            label: 'Код активации будет отправлен на почту:',
            placeholder: 'Введите Ваш E-mail'
        }
    },
    validationSchema: object().shape({
        email: string().email('Неверный формат E-mail').required('Поле не может быть пустым')
    })
};