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