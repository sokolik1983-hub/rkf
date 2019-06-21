import {object, string} from 'yup'

import {
    DEFAULT_PHONE_INPUT_PLACEHOLDER
} from 'appConfig'

export const defaultReduxKey = 'registration';

export const registrationSuccessPath = '/auth/registration/success';

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
            placeholder: 'Введите вашу личную почту',
            fieldType: 'customEmail'
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
            placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
            fieldType: 'customPhone'
        },
        submit_phone_code: {
            name: 'submit_phone_code',
            type: 'text',
            label: 'Проверочный код',
            placeholder: '* * * * * *'
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
            .test('', 'Ваш пароль короче 8 символов',
                value => value && value.length > 8
            ),
    }),
};
export const registrationFormLegalEntity = {
    fields: {
        registration_type: {
            name: 'registration_type',
            type: 'hidden',
            defaultValue: 3
        },
        company_name: {
            name: 'company_name',
            type: 'text',
            label: 'Наименование ИП',
            placeholder: 'Полное наименование'
        },
        company_type: {
            name: 'company_type',
            type: 'select',
            label: 'Статус',
            placeholder: 'Региональный или федеральный',
            fieldType: 'reactSelect',
            options: [
                {label: "Федеральный", value: 1},
                {label: "Региональный", value: 2}
            ]
        },
        email: {
            name: 'email',
            type: 'text',
            label: 'E-mail',
            placeholder: 'Введите вашу личную почту',
            fieldType: 'customEmail'
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
            placeholder: '7 (   ) ___ __ __',
            fieldType: 'customPhone',
        },
        submit_phone_code: {
            name: 'submit_phone_code',
            type: 'text',
            label: 'Проверочный код',
            placeholder: '******'
        }
    },
    validationSchema: object().shape({
        company_name: string()
            .required('Поле не может быть пустым'),
        company_type: string()
            .required('Поле не может быть пустым'),
        email: string()
            .required('Поле не может быть пустым')
            .email('Неверный формат электронного адреса'),
        phone_number: string()
            .required('Поле не может быть пустым'),
        password: string()
            .required('Поле не может быть пустым')
            .test('', 'Ваш пароль короче 8 символов',
                value => value && value.length > 7
            ),
    }),
};

