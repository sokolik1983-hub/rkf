export const firstStepForm = {
    fields: {
        exhibition_name: {
            name: 'exhibition_name',
            label: 'Название выставки',
            placeholder: 'Всероссийская выставка собак «Летний кубок — 2019»'
        },
        exhibition_description: {
            name: 'exhibition_description',
            label: 'Описание выставки',
            fieldType: 'textarea',
            placeholder: 'Расскажите участникам и гостям, что их ожидает на выставке. Также укажите ссылки на необходимые \n' +
                'документы: ветеринарные правила и другие... '
        },
        dignity_types: {
            name: 'dignity_types',
            label: 'Титул',
            type: 'select',
            placeholder: 'Чемп',
            fieldType: 'reactSelect',
            options: [
                {
                    label: 'Чемпион',
                    value: 'Чемпион',
                },
                {
                    label: 'Не Чемпион',
                    value: 'Не Чемпион',
                },
            ]
        },
        rank_type: {
            name: 'rank_type',
            label: 'Ранг выставки',
            placeholder: 'CACIB'
        },
        exhibition_class: {
            name: 'exhibition_class',
            label: 'Класс',
            placeholder: 'Ветераны'
        },
        breed_types: {
            name: 'breed_types',
            label: 'Порода',
            placeholder: 'Лабрадор-ретривер'
        },
        exhibition_city: {
            name: 'exhibition_city',
            label: 'Город',
            placeholder: 'Москва'
        },
        exhibition_address: {
            name: 'exhibition_address',
            label: 'Адрес',
            placeholder: 'Адрес проведения выставки'
        },
    }
};