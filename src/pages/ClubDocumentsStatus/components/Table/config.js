import * as sort from "sortabular";


export const getTableColumns = (sortingColumns, sortable) => {
    let cols = [
        {
            property: 'registration_date',
            header: {
                label: 'Дата регистрации'
            }
        },
        {
            property: 'federation',
            header: {
                label: 'Федерация'
            }
        },
        {
            property: 'status',
            header: {
                label: 'Статус'
            }
        },
        {
            property: 'document_number',
            header: {
                label: 'Номер документа'
            }
        },
        {
            property: 'declarant_name',
            header: {
                label: 'ФИО заявителя'
            }
        },
        {
            property: 'documents_count',
            header: {
                label: 'Количество документов'
            }
        },
        {
            property: 'cost',
            header: {
                label: 'Стоимость'
            }
        }
    ];

    cols.map(col => {
        col.header.formatters = [
            sort.header({
                sortable,
                getSortingColumns: () => sortingColumns,
                strategy: sort.strategies.byProperty
            })
        ];

        if (col.property === 'registration_date') {
            col.cell = {
                resolve: date => date && new Date(date).toLocaleDateString('ru-RU')
            }
        }

        return col;
    });

    return cols;
};