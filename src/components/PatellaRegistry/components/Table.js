import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Window } from '@progress/kendo-react-dialogs';
import formatDate from 'utils/formatDate';
import { getHeaders } from "utils/request";
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';

loadMessages(kendoMessages, 'ru-RU');

const categories = [
    { "status_id": 1, "StatusName": "Отклоненные" },
    { "status_id": 2, "StatusName": "В работе" },
    { "status_id": 3, "StatusName": "Выполненные" }
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const LinkCell = ({ dataItem }, profileType) => {
    const { certificate_document_id } = dataItem;
    return <td>
        {certificate_document_id &&
            <span className="pedigree-link" onClick={e => handleClick(e, certificate_document_id, profileType)} >Скачать файл</span>
        }
    </td>
};

const OptionsCell = ({ dataItem }, profileType) => {
    const { type_id, id } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            to={`${profileType === "kennel" ? '/kennel' : ''}/${route}/documents/${type_id === 1 ? "dysplasia" : "patella"}/view/${id}`}
            className="row-control__link">{item.text}</Link>
    }];

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const handleClick = async (e, id, profileType) => {
    e.preventDefault();
    let el = e.target;
    el.className = 'stamp-loading';
    el.innerText = 'Загрузка...';
    await fetch(`/api/requests/dog_health_check_request/${profileType === 'kennel' ? 'kennel' : ''}doghealthcheckdocument?id=${id}`, {
        method: 'GET',
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
    el.className = 'pedigree-link';
};

const Table = ({ documents, profileType }) => {
    const [windowVisible, setWindowVisible] = useState(false);
    const [gridClickedRow, setGridClickedRow] = useState({});
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

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.target.value.status_id !== null) {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'status_id', operator: 'eq', value: e.target.value.status_id }]
            }
            newDataState.skip = 0
        } else {
            newDataState.filter = {
                filters: []
            }
            newDataState.skip = 0
        }
        setGridData(newDataState);
    }

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    }

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                <div className={'club-documents-status__filters-wrap'}>
                    <strong>Фильтры: </strong>&nbsp;
                                <DropDownList
                        data={categories}
                        dataItemKey="status_id"
                        textField="StatusName"
                        defaultItem={{ status_id: null, StatusName: "Все" }}
                        onChange={handleDropDownChange}
                    />
                </div>
                {
                    rows && <Grid
                        data={process(rows, gridData)}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        onRowClick={handleGridRowClick}
                        style={{ height: "700px" }}>
                        <GridColumn field="date_create" title="Дата создания" width="140px" columnMenu={ColumnMenu} />
                        <GridColumn field="date_change" title="Дата последнего изменения статуса" width="275px" columnMenu={ColumnMenu} />
                        <GridColumn field="declarant_full_name" title="ФИО ответственного лица" width="210px" columnMenu={ColumnMenu} />
                        <GridColumn field="barcode" title="Трек-номер" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn field="certificate_document_id" title="Сертификат" width="130px" columnMenu={ColumnMenu} cell={(props) => LinkCell(props, profileType)} />
                        <GridColumn field="status_name" title="Статус" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn width="80px" cell={(props) => OptionsCell(props, profileType)} />
                    </Grid>
                }


                {windowVisible &&
                    <Window
                        title="Подробности"
                        onClose={() => setWindowVisible(false)}
                        height={500}>
                        <dl style={{ textAlign: "left" }}>
                            <dt><strong>Дата создания</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.date_create}</dd>
                            <dt><strong>Дата последнего изменения статуса</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.date_change}</dd>
                            <dt><strong>ФИО ответственного лица</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.declarant_full_name}</dd>
                            <dt><strong>Трек-номер</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.barcode}</dd>
                            <dt><strong>Сертификат</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>
                                {
                                    gridClickedRow.certificate_document_id &&
                                    <span className="pedigree-link" onClick={e => handleClick(e, gridClickedRow.certificate_document_id, profileType)} >Скачать файл</span>
                                }
                            </dd>
                            <dt><strong>Статус</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.status_name}</dd>
                        </dl>
                    </Window>
                }
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;