import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DropDownButton } from '@progress/kendo-react-buttons';
import formatDate from 'utils/formatDate';
import { getHeaders } from "utils/request";
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';
import moment from "moment";

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

const DateCell = ({ dataItem }, field) => <td>{formatDate(dataItem[field])}</td>;

const LinkCell = ({ dataItem }) => {
    const { certificate_document_id } = dataItem;
    return <td>
        {certificate_document_id &&
            <span className="pedigree-link" onClick={e => handleClick(e, certificate_document_id)} >Скачать файл</span>
        }
    </td>
};

const OptionsCell = ({ dataItem }) => {
    const { type_id, status_id, id } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            to={`/user/${route}/documents/${type_id === 1 ? "dysplasia" : "patella"}/view/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Ответить',
        disabled: status_id === 1 ? false : true,
        render: ({ item }) => <Link
            to={`/user/${route}/documents/${type_id === 1 ? "dysplasia" : "patella"}/edit/${id}`}
            className="row-control__link">{item.text}</Link>
    }].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const handleClick = async (e, id) => {
    e.preventDefault();
    let el = e.target;
    el.className = 'stamp-loading';
    el.innerText = 'Загрузка...';
    await fetch(`/api/requests/dog_health_check_request/doghealthcheckdocument?id=${id}`, {
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

const Table = ({ documents, profileType, fullScreen, exporting, setExporting, distinction }) => {
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

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

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(documents, () => setExporting(false));
        }
    }, [exporting]);

    const gridForExport = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        style={{ height: "700px" }}>
        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '170px' : '140px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="date_change" title="Дата последнего изменения статуса" width={fullScreen ? '320px' : '275px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
        <GridColumn field="declarant_full_name" title="ФИО ответственного лица" width={fullScreen ? '235px' : '210px'} columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '170px' : '130px'} columnMenu={ColumnMenu} />
        <GridColumn field="certificate_document_id" title="Сертификат" width="130px" columnMenu={ColumnMenu} cell={props => LinkCell(props, profileType)} />
        <GridColumn field="status_name" title="Статус" width="130px" columnMenu={ColumnMenu} />
    </Grid>;

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                <div className={'user-documents-status__filters-wrap'}>
                    <strong>Фильтры: </strong>&nbsp;
                    <DropDownList
                        data={categories}
                        dataItemKey="status_id"
                        textField="StatusName"
                        defaultItem={{ status_id: null, StatusName: "Все" }}
                        onChange={handleDropDownChange}
                    />
                </div>
                {documents && <Grid
                    data={process(documents, gridData)}
                    pageable
                    sortable
                    resizable
                    {...gridData}
                    onDataStateChange={handleGridDataChange}
                    style={{ height: "700px", maxWidth: `${fullScreen ? `740px` : `680px`}`, margin: '0 auto' }}>
                    <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '110px' : '90px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                    <GridColumn field="date_change" title="Дата последнего изменения статуса" width={fullScreen ? '110px' : '90px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
                    <GridColumn field="declarant_full_name" title="ФИО ответственного лица" width={fullScreen ? '110px' : '100px'} columnMenu={ColumnMenu} />
                    <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} />
                    <GridColumn field="certificate_document_id" title="Сертификат" width="100px" columnMenu={ColumnMenu} cell={props => LinkCell(props, profileType)} />
                    <GridColumn field="status_name" title="Статус" width="100px" columnMenu={ColumnMenu} />
                    <GridColumn width="70px" cell={props => OptionsCell(props, profileType)} />
                </Grid>}
                <GridPDFExport
                    fileName={distinction === "dysplasia" ? `Сертификат_дисплазия_${moment(new Date()).format(`DD_MM_YYYY`)}` : `Сертификат_пателла_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                    ref={gridPDFExport}
                    scale={0.3}
                    margin="1cm"
                    paperSize="A4"
                >
                    {gridForExport}
                </GridPDFExport>

            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;