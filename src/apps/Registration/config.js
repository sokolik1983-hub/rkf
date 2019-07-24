import {object, string} from 'yup'
import {VALIDATE_EMAIL, VALIDATE_PHONE, validationTestAsync} from 'utils/validationRequest'
import {DEFAULT_PHONE_INPUT_PLACEHOLDER, DEFAULT_PHONE_INPUT_MASK} from 'appConfig'
// vars
export const defaultReduxKey = 'registration';
export const registrationSuccessPath = '/auth/registration/success';

// default .test() configs
const testPasswordLength = [
    'Длина пароля', 'Ваш пароль короче 8 символов',
    value => value && value.length > 7];
const testEmailAsync = [
    'Email тест', 'Данная почта уже существует',
    value => value ? validationTestAsync({url: VALIDATE_EMAIL, name: 'email', value}) : void 0
];
const testPhoneAsync = [
    '', 'Данный номер телефона уже существует',
    value => value ? validationTestAsync({url: VALIDATE_PHONE, name: 'phone_number', value}) : void 0
];


const commonValidations = {
    email: string()
        .required('Поле не может быть пустым')
        .email('Неверный формат электронного адреса'),
        //.test(...testEmailAsync),
    phone_number: string()
        .required('Поле не может быть пустым'),
        //.test(...testPhoneAsync),
    password: string()
        .required('Поле не может быть пустым')
        .test(...testPasswordLength)
};

const commonFields = {
    email: {
        name: 'email',
        type: 'text',
        label: 'E-mail',
        placeholder: 'Введите вашу личную почту',
    },
    phone_number: {
        name: 'phone_number',
        type: 'text',
        label: 'Телефон',
        placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
        mask: DEFAULT_PHONE_INPUT_MASK,
        fieldType: 'masked'
    },
    password: {
        name: 'password',
        type: 'password',
        label: 'Пароль',
        placeholder: 'Минимум 8 символов'
    },
    submit_phone_code: {
        name: 'submit_phone_code',
        type: 'text',
        label: 'Проверочный код',
        placeholder: '******'
    },
};


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
        ...commonFields
    },
    validationSchema: object().shape({
        first_name: string()
            .required('Поле не может быть пустым'),
        second_name: string()
            .required('Поле не может быть пустым'),
        ...commonValidations,
    }),
};
export const registrationFormLegalEntity = {
    formAction:'/api/Registration',
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
        ...commonFields
    },
    validationSchema: object().shape({
        company_name: string()
            .required('Поле не может быть пустым'),
        company_type: string()
            .required('Поле не может быть пустым'),
        ...commonValidations,
    }),
};

