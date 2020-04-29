import {number, object, string} from "yup";
import {DEFAULT_PHONE_INPUT_MASK, DEFAULT_PHONE_INPUT_PLACEHOLDER} from "../../../../appConfig";


export const ResponsibleFormConfig = {
    action: '/api/clubs/Declarant',
    fields: {
        last_name: {
            name: 'last_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            type: 'text'
        },
        first_name: {
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            type: 'text'
        },
        second_name: {
            name: 'second_name',
            label: 'Отчество',
            placeholder: 'Отчество',
            type: 'text'
        },
        email: {
            name: 'email',
            label: 'Email',
            placeholder: 'Email',
            type: 'email'
        },
        phone: {
            name: 'phone',
            label: 'Телефон',
            placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
            type: 'tel',
            fieldType: 'masked',
            showMask: true,
            mask: DEFAULT_PHONE_INPUT_MASK
        },
        subscriber_mail: {
            name: 'subscriber_mail',
            label: 'Абонентский ящик',
            type: 'text'
        },
        index: {
            name: 'index',
            label: 'Индекс',
            placeholder: 'Индекс',
            type: 'text',
            maxLength: 6
        },
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Начните писать...',
            fieldType: 'reactSelect',
        },
        street: {
            name: 'street',
            label: 'Улица',
            placeholder: 'Улица',
            type: 'text'
        },
        house: {
            name: 'house',
            label: 'Дом',
            placeholder: 'Дом',
            type: 'text'
        },
        building: {
            name: 'building',
            label: 'Стр.',
            placeholder: 'Стр.',
            type: 'text'
        },
        flat: {
            name: 'flat',
            label: 'Кв.',
            placeholder: 'Кв.',
            type: 'text'
        },
        is_default: {
            name: 'is_default',
            label: 'Использовать по умолчанию при создании заявок',
            fieldType: 'customCheckbox'
        }
    },
    validationSchema: object().shape({
        last_name: string().required('Укажите фамилию'),
        first_name: string().required('Укажите имя'),
        second_name: string(),
        phone: string().required('Укажите телефон'),
        email: string().required('Укажите email').email('Неверный формат email'),
        subscriber_mail: string(),
        index: string().required('Укажите индекс').min(5, 'Введите минимум 5 цифр'),
        city_id: number().required('Укажите город').typeError('Укажите город'),
        street: string().required('Укажите улицу'),
        house: string().required('Укажите дом'),
        building: string(),
        flat: string()
    })
};