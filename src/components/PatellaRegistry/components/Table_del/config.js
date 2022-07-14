import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import { Link } from "react-router-dom";
import { getHeaders } from "utils/request";
import CustomCheckbox from "components/Form/CustomCheckbox";
import moment from "moment";

const fillProp = ({property,label}) => ({property,header:{label}})
// const formatCountTime = (str) => {
//     const dateArray = str.split('.');
//     const i = dateArray.length - 2;
//     const timeArray = dateArray[i].split(':');
//     const days = +dateArray[0];
//     const hours = +timeArray[0];
//     const minutes = +timeArray[1];

//     return `${days ? days + 'д. ': ''}${hours ? hours + 'ч. ' : ''}${minutes ? minutes + 'м.' : ''}`;
// }

export const getTableColumns = (sortingColumns, sortable, alias, profileType, setState) => {
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
           property: "certificate_document_id",
           label: "Сертификат"
       },
       {
           property: "status_name",
           label: "Статус"
       },
    ].map(col => fillProp(col));

    const handleClick = async (e, id) => {
        e.preventDefault();
        let el = e.target;
        el.className = 'stamp-loading';
        el.innerText = 'Загрузка...';
        await fetch(`/api/requests/dog_health_check_request/${profileType === 'kennel' ? 'kennel' : ''}doghealthcheckdocument?id=${id}`, {
            headers: getHeaders()
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob),
                    a = document.createElement('a');
                a.href = url;
                a.download = `Сертификат ${id}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
        el.innerText = 'Скачать файл';
        el.className = '';
    };

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

        if (col.property === 'express') {
            col.cell.formatters.push((value,{rowData}) => <CustomCheckbox disabled checked={rowData.express} />)
        }

        if (col.property === 'certificate_document_id') {
            col.cell.formatters = [id => id && <a href="/" onClick={e => handleClick(e, id)}>Скачать файл</a>] || 'отсутствует';
        }

        return col;
    });

    cols.push({
        cell: {
            formatters: [
                (value, { rowData }) => {
                    return (
                        <RowControl>
                            <ul className="row-control__list">
                                <li className="row-control__item">
                                    <Link
                                        to={`${profileType === "kennel" ? '/kennel' : ''}/${alias}/documents/${rowData.type_id === 1 ? "dysplasia" : "patella"}/view/${rowData.id}`}
                                        className="row-control__link"
                                    >
                                        Подробнее
                                    </Link>
                                </li>
                                {rowData.status_id === 1 &&
                                    <li className="row-control__item">
                                        <Link
                                            to={`${profileType === "kennel" ? '/kennel' : ''}/${alias}/documents/${rowData.type_id === 1 ? "dysplasia" : "patella"}/edit/${rowData.id}`}
                                            className="row-control__link"
                                        >
                                            Ответить
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </RowControl>
                    )
                }
            ]
        }
    });

    return cols;
};
