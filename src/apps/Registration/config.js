import {object, string} from 'yup'
import {
    DEFAULT_PHONE_INPUT_MASK
} from 'appConfig'

export const registrationFormPhysicalPerson = {
    fields: {
        registration_type: {
            name: 'registration_type',
            type: 'hidden',
            defaultValue: 1
        },
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
            placeholder: '7 () ___ __ __',
            mask: DEFAULT_PHONE_INPUT_MASK,
        },
        submit_phone_code: {
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
        registration_type: {
            name: 'registration_type',
            type: 'hidden',
            defaultValue: 2
        },
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
            placeholder: '7 () ___ __ __',
            mask: DEFAULT_PHONE_INPUT_MASK,
        },
        submit_phone_code: {
            name: 'submit_phone_code',
            type: 'text',
            label: 'Проверочный код',
            placeholder: '******'
        }
    },
    validationSchema: object().shape({
        phone_number: string()
            .required('Поле не может быть пустым'),
        password: string()
            .required('Поле не может быть пустым')
    }),
};

