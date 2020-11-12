// import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
// import RowControl from "../RowControl";
// import { Link } from "react-router-dom";
import moment from "moment";

const fillProp = ({property,label}) => ({property,header:{label}})

export const getTableColumns = (sortingColumns, sortable, distinction, nurseryAlias, setState) => {
    let cols = (distinction === "pedigree" ?
    [
       {
           property: "date_create",
           label: "Дата создания"
       },
       {
           property: `${distinction}_request_id`,
           label: "№ пакета"
       },
       {
           property: "owner_full_name",
           label: "ФИО владельца"
       },
       {
           property: "breeder_full_name",
           label: "Заводчик"
       },
       {
           property: "dog_name",
           label: "Кличка"
       },
       {
           property: "breed",
           label: "Порода"
       },
       {
           property: "stamp_number",
           label: "Клеймо"
       },
       {
           property: "barcode",
           label: "Трек-номер"
       },
       {
           property: "status_name",
           label: "Статус"
       },
       {
           property: "pedigree_link",
           label: "Ссылка на эл. копию документа"
       },
    ] :
    [
       {
           property: "date_create",
           label: "Дата создания"
       },
       {
           property: "date_change",
           label: "Изменение статуса"
       },
       {
           property: `${distinction}_request_id`,
           label: "№ пакета"
       },
       {
           property: "breeder_full_name",
           label: "Заводчик"
       },
       {
           property: "nursery_name",
           label: "Питомник"
       },
       {
           property: "count_of_litter",
           label: "Щенков"
       },
       {
           property: "breed",
           label: "Порода"
       },
       {
           property: "stamp_code",
           label: "Клеймо"
       },
       {
           property: "count_of_documents",
           label: "Док-в"
       },
       {
           property: "barcode",
           label: "Трек-номер"
       },
       {
           property: "status_name",
           label: "Статус"
       },
    ]).map(col => fillProp(col));

    cols.map(col => {
        if(['date_create', 'date_change', 'status_name', 'breeder_full_name', 'owner_full_name'].includes(col.property)) {
            col.header.formatters = [
                sort.header({
                    sortable,
                    getSortingColumns: () => sortingColumns,
                    strategy: sort.strategies.byProperty
                })
            ];
        }

        col.cell = {
            formatters: [
                (data, extra) => data ? (search.highlightCell(data, extra)) : ''
            ]
        };

        if (['date_create', 'date_change'].includes(col.property)) {
            col.cell.resolve = date => date && moment(date).format('DD.MM.YYYY');
        }

        if (['barcode', 'count_of_documents', 'count_of_litter'].includes(col.property)) {
            col.cell.props = {
                style: {
                    textAlign: 'center'
                }
            }
        }

        return col;
    });

    /*cols.push({
        cell: {
            formatters: [
                (value, { rowData }) => {
                    return (
                        <RowControl>
                            <ul className="row-control__list">
                                <li className="row-control__item">
                                    <Link
                                        to={`/kennel/${nurseryAlias}/documents/${distinction}/${rowData.id}`}
                                        className="row-control__link"
                                    >
                                        Подробнее
                                    </Link>
                                </li>
                                {rowData.status_id === 1 &&
                                    <li className="row-control__item">
                                        <Link
                                            to={`/kennel/${nurseryAlias}/documents/${distinction}/${rowData.id}/edit`}
                                            className="row-control__link"
                                        >
                                            Ответить
                                        </Link>
                                    </li>
                                }
                                <li className="row-control__item">
                                    <Link
                                        to={`/kennel/${nurseryAlias}/documents/${distinction}/${rowData.id}/print`}
                                        className="row-control__link"
                                    >
                                        Печать
                                    </Link>
                                </li>
                            </ul>
                        </RowControl>
                    )
                }
            ]
        }
    });*/

    return cols;
};
