import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownButton } from '@progress/kendo-react-buttons';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';

loadMessages(kendoMessages, 'ru-RU');

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const OptionsCell = ({ dataItem }, distinction, deleteRow, setShowModal) => {
    const { id, status_id } = dataItem;
    const { route } = useParams();
    const options = [
        {
            text: 'Подробнее',
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}`}>{item.text}</Link>
        },
        {
            text: 'Вложенные заявки',
            disabled: distinction === 'pedigree' ? false : true,
            render: ({ item }) => <span onClick={() => setShowModal(id)}>{item.text}</span>
        },
        {
            text: 'Редактировать',
            disabled: status_id === 4 ? false : true,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/form`}>{item.text}</Link>
        },
        {
            text: 'Ответить',
            disabled: status_id === 1 ? false : true,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/edit`}>{item.text}</Link>
        },
        {
            text: 'Печать',
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/print`}>{item.text}</Link>
        },
        {
            text: 'Удалить черновик',
            disabled: status_id === 4 ? false : true,
            render: ({ item }) => <span onClick={() => deleteRow(id)}>{item.text}</span>
        }
    ].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const Table = ({ documents, distinction, rowClick, deleteRow, setShowModal }) => {
    const [rows, setRows] = useState(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 20,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

    useEffect(() => {
        setRows(documents.map(d => {
            return {
                ...d,
                date_create: formatDate(d.date_create),
                date_change: formatDate(d.date_change)
            }
        }))
    }, [documents]);

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    const handleGridRowClick = ({ dataItem }) => {
        rowClick(dataItem.id);
    }

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                {
                    rows && <Grid
                        data={process(rows, gridData)}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        onRowClick={handleGridRowClick}
                        className="club-documents-status__pointer"
                        style={{ height: "700px" }}>
                        <GridColumn field="date_create" title="Дата регистрации" width="160px" columnMenu={ColumnMenu} />
                        <GridColumn field="federation_name" title="Федерация" width="120px" columnMenu={ColumnMenu} />
                        <GridColumn field="status_name" title="Статус" width="100px" columnMenu={ColumnMenu} />
                        <GridColumn field="count" title="Всего заявок в пакете" width="185px" columnMenu={ColumnMenu} />
                        <GridColumn field="count_done" title="Изготовлено" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn field="count_in_work" title="В работе" width="100px" columnMenu={ColumnMenu} />
                        <GridColumn field="id" title="Номер документа" width="160px" columnMenu={ColumnMenu} />
                        <GridColumn field="name" title="ФИО заявителя" width="160px" columnMenu={ColumnMenu} />
                        <GridColumn width="60px" cell={(props) => OptionsCell(props, distinction, deleteRow, setShowModal)} />
                    </Grid>
                }
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;