import {object, string} from 'yup'

export const registrationFormPhysicalPerson = {
    fields: {
        first_name: {
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            placeholder: 'Иван'
        },
        second_name: {
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            placeholder: 'Иванов'
        },
        email: {
            name: 'email',
            type: 'text',
            label: 'E-mail',
            placeholder: 'Введите вашу личную почту'
        },
        password: {
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Минимум 8 символов'
        },
        phone_number: {
            name: 'phone_number',
            type: 'text',
            label: 'Телефон',
            placeholder: '7 () ___ __ __'
        },
        submit_phone_code:{
            name: 'submit_phone_code',
            type: 'text',
            label: 'Проверочный код',
            placeholder: '******'
        }
    },
    validationSchema: object().shape({
        first_name: string()
            .required('Поле не может быть пустым'),
        second_name: string()
            .required('Поле не может быть пустым'),
        email: string()
            .required('Поле не может быть пустым')
            .email('Неверный формат электронного адреса'),
        phone_number: string()
            .required('Поле не может быть пустым'),
        password: string()
            .required('Поле не может быть пустым')
    }),
};
export const registrationFormLegalEntity = {
    fields: {
        company_name: {
            name: 'company_name',
            type: 'text',
            label: 'Наименование ИП',
            placeholder: 'Полное наименование'
        },
        company_type: {
            name: 'company_type',
            type: 'text',
            label: 'Статус',
            placeholder: 'Региональный или федеральный'
        },
        email: {
            name: 'email',
            type: 'text',
            label: 'E-mail',
            placeholder: 'Введите вашу личную почту'
        },
        password: {
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Минимум 8 символов'
        },
        phone_number: {
            name: 'phone_number',
            type: 'text',
            label: 'Телефон',
            placeholder: '7 () ___ __ __'
        },
    },
    validationSchema: object().shape({
        phone_number: string()
            .required('Поле не может быть пустым'),
        password: string()
            .required('Поле не может быть пустым')
    }),
};