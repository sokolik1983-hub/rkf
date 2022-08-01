export const sortItems = [
    {
        /*
            типы сортировок:
            1 - по умолчанию
            2 - по алфавиту (по алфавиту от а до я)
            3 - по алф  наоборот
            4 - подтверждённые
            5 - по популярности
        */
        pageName: 'specialists',
        items: [
            {
                id: 0,
                title: 'По умолчанию',
                header: 'Сортировка',
                sortType: 1,
            },
            {
                id: 1,
                title: 'По алфавиту',
                header: 'По алфавиту',
                sortType: [2, 3],
            },
            {
                id: 2,
                title: 'Подтвержденные',
                header: 'По активности',
                sortType: 4,
            },
            {
                id: 3,
                title: 'По популярности',
                header: 'По популярности',
                sortType: 5,
            },
        ]
    },
    {
        /*
            типы сортировок:
            1 - по умолчанию
            2 - по популярности
            3 - завершенные
        */
        pageName: 'exhibitions',
        items: [
            {
                id: 0,
                title: 'По умолчанию',
                header: 'Сортировка',
                sortType: 1,
            },
            {
                id: 1,
                title: 'По популярности',
                header: 'По популярности',
                sortType: 2,
            },
            {
                id: 2,
                title: 'Завершенные',
                header: 'Завершенные',
                sortType: 3,
            },
        ]
    },
    {
        /*
            типы сортировок:
            1 - по умолчанию
            2 - по популярности
            3 - по активности
        */
        pageName: 'organizations',
        items: [
            {
                id: 0,
                title: 'По умолчанию',
                header: 'Сортировка',
                sortType: 1,
            },
            {
                id: 1,
                title: 'По популярности',
                header: 'По популярности',
                sortType: 2,
            },
            {
                id: 2,
                title: 'По активности',
                header: 'По активности',
                sortType: 3,
            },
        ]
    },
    {
        /*
            типы сортировок:
            1 - по умолчанию
            2 - по популярности
            3 - по количеству вложений
        */
        pageName: 'publications',
        items: [
            {
                id: 0,
                title: 'По умолчанию',
                header: 'Сортировка',
                sortType: 1,
            },
            {
                id: 1,
                title: 'По популярности',
                header: 'По популярности',
                sortType: 2,
            },
            {
                id: 2,
                title: 'По количеству вложений',
                header: 'По количеству вложений',
                sortType: 3,
            },
        ]
    }
];
