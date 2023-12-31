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

const isDefaultCell = ({ dataItem }) => <td>{dataItem.is_default ? 'Да' : 'Нет'}</td>;
const subscriberCell = ({ dataItem }) => <td>{dataItem.subscriber_mail ? dataItem.subscriber_mail : 'Не указан'}</td>;

const OptionsCell = ({ dataItem }, setDefaultPerson, deletePerson) => {
    const { id } = dataItem;
    const { route } = useParams();
    const options = [
        {
            text: 'Сделать по умолчанию',
            render: ({ item }) => <span onClick={() => setDefaultPerson(id)}>{item.text}</span>
        },
        {
            text: 'Редактировать',
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/responsible/${id}/edit`}>{item.text}</Link>
        },
        {
            text: 'Удалить',
            render: ({ item }) => <span onClick={() => deletePerson(id)}>{item.text}</span>
        }
    ];

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const Table = ({ documents, setDefaultPerson, deletePerson }) => {
    const [rows, setRows] = useState(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
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

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale="ru">
                {
                    rows && <Grid
                        data={process(rows, gridData)}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        style={{ height: "700px" }}>
                        <GridColumn field="full_name" title="ФИО" width="230px" columnMenu={ColumnMenu} />
                        <GridColumn field="phone" title="Телефон" width="127px" columnMenu={ColumnMenu} />
                        <GridColumn field="email" title="Email" width="180px" columnMenu={ColumnMenu} />
                        <GridColumn field="subscriber_mail" title="Абонентский ящик" width="170px" columnMenu={ColumnMenu} cell={subscriberCell} />
                        <GridColumn field="address" title="Адрес" width="200px" columnMenu={ColumnMenu} />
                        <GridColumn field="is_default" title="По умолчанию" width="140px" columnMenu={ColumnMenu} cell={isDefaultCell} />
                        <GridColumn width="70px" cell={(props) => OptionsCell(props, setDefaultPerson, deletePerson)} />
                    </Grid>
                }
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;