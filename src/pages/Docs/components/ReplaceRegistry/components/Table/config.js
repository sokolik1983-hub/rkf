import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import { Link } from "react-router-dom";
import moment from "moment";

const fillProp = ({property,label}) => ({property,header:{label}})

export const getTableColumns = (sortingColumns, sortable, distinction, clubAlias, setState) => {
    let cols = [
       {
           property: "date_create",
           label: "Дата создания"
       },
       {
           property: "date_change",
           label: "Дата последнего изменения статуса"
       },
       {
           property: "declarant_full_name",
           label: "ФИО ответственного лица"
       },
       {
           property: "barcode",
           label: "Трек-номер"
       },
       {
           property: "pedigree_link",
           label: "Ссылка на эл. копию документа"
       },
       {
           property: "status_name",
           label: "Статус"
       },
       {
           property: "express",
           label: "Срочное изготовление"
       },
       {
           property: "type_name",
           label: "Тип"
       }
    ].map(col => fillProp(col));

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
                (data, extra) => data ? (search.highlightCell(data, extra)) : ''
            ]
        };

        if (['date_create', 'date_change'].includes(col.property)) {
            col.cell.resolve = date => date && moment(date).format('DD.MM.YYYY');
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
                                        to={`/${clubAlias}/documents/${distinction}/${rowData.id}`}
                                        className="row-control__link"
                                    >
                                        Подробнее
                                    </Link>
                                </li>
                                {rowData.status_id === 1 &&
                                    <li className="row-control__item">
                                        <Link
                                            to={`/${clubAlias}/documents/${distinction}/${rowData.id}/edit`}
                                            className="row-control__link"
                                        >
                                            Ответить
                                        </Link>
                                    </li>
                                }
                                <li className="row-control__item">
                                    <Link
                                        to={`/${clubAlias}/documents/${distinction}/${rowData.id}/print`}
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
