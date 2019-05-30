export const SCHEDULE_URL = '/api/client/exhibition/';
export const DAY_URL = '/api/client/exhibition/day';
export const DAY_ITEM_URL = '/api/client/exhibition/day_item';


export const defaultReduxKey = 'exhibition_schedule';

export const scheduleDayForm = {
    fields: {
        date: {
            name: 'date',
            label: 'Выбирите день',
            placeholder: '01.01.1970',
            type:'date'
        },
    },
    validationSchema:{}
};
export const scheduleDayItemForm = {
    fields: {
        start: {
            name: 'start',
            label: 'Время начала',
            placeholder: '8:00',
            type:'time'
        },
        end: {
            name: 'end',
            label: 'Время окончания',
            placeholder: '9:00',
            type:'time'
        },
        title: {
            name: 'title',
            label: 'Название',
            placeholder: 'Название пункта'
        },
    },
    validationSchema:{}
};