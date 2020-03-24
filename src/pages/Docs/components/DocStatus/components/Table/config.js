import * as sort from "sortabular";
import * as search from "searchtabular";
import {formatDateWithTime, formatPrice} from "../../../../../../utils";


export const getTableColumns = (sortingColumns, sortable) => {
    let cols = [
        {
            property: 'registration_date',
            header: {
                label: 'Дата регистрации'
            },
            footer: () => 'Итого:'
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
            },
            footer: rows => rows.reduce((a,b) => a + b.documents_count, 0)
        },
        {
            property: 'cost',
            header: {
                label: 'Стоимость'
            },
            footer: rows => formatPrice(rows.reduce((a,b) => a + b.cost, 0))
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

        col.cell = {
            formatters: [
                (data, extra) => (search.highlightCell(data, extra))
            ]
        };

        if (col.property === 'registration_date') {
            col.cell.resolve = date => date && formatDateWithTime(date);
        } else if (col.property === 'cost') {
            col.cell.resolve = cost => formatPrice(cost)
        }

        return col;
    });

    return cols;
};