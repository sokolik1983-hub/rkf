import {object, string} from "yup";

export const DAY_URL = '/api/exhibition/Shedule/day';
export const DAY_ITEM_URL = '/api/exhibition/Shedule/item';


export const defaultReduxKey = 'exhibition_schedule';

export const scheduleDayForm = {
    formAction:DAY_URL,
    fields: {
        date: {
            name: 'date',
            label: 'Выберите дату',
            placeholder: '01.01.1970',
            type: 'date'
        },
    },
    validationSchema: object().shape({
        date: string()
            .required('Укажите дату'),
    })
};
export const scheduleDayItemForm = {
    formAction: DAY_ITEM_URL,
    fields: {
        time_start: {
            name: 'time_start',
            label: 'Время начала',
            placeholder: '8:00',
            type: 'time'
        },
        time_end: {
            name: 'time_end',
            label: 'Время окончания',
            placeholder: '9:00',
            type: 'time'
        },
        name: {
            name: 'name',
            label: 'Название',
            placeholder: 'Название пункта'
        },
        full_name: {
            name: 'full_name',
            label: 'Unset',
            placeholder: 'Unset',
            defaultValue: 'unset'
        },
        location: {
            name: 'location',
            label: 'Unset',
            placeholder: 'Unset',
            defaultValue: 'unset'
        },
        description: {
            name: 'description',
            label: 'Unset',
            placeholder: 'Unset',
            defaultValue: 'unset'
        },
    },
    validationSchema: object().shape({
        time_start: string()
            .required('Укажите значение'),
        time_end: string()
            .required('Укажите значение'),
        name: string()
            .required('Укажите значение'),
    })
};