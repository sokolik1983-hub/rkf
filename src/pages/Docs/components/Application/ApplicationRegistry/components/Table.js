import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownButton, ChipList } from '@progress/kendo-react-buttons';
import { getHeaders } from "utils/request";
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';
import moment from "moment";
import PdfPageTemplate from "../../../../../../components/PdfPageTemplate";
import LightTooltip from "../../../../../../components/LightTooltip";
import CopyCell from '../../../../../Docs/components/CopyCell';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import "./index.scss";

loadMessages(kendoMessages, 'ru-RU');

const categories = [
    {
        text: 'Отклоненные',
        value: '1',
    },
    {
        text: 'В работе',
        value: '2',
    },
    {
        text: 'Выполненные',
        value: '3',
    }
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const DateCell = ({ dataItem }, field) => {

    return (dataItem[field] === null ? <td></td> : <td>{moment(dataItem[field]).format('DD.MM.YY')}</td>);
};

const ExpressCell = ({ dataItem }, field) => {
    const fieldLabel = dataItem[field] ? 'Срочная' : 'Не срочная';

    return (
        <td>{fieldLabel}</td>
    );
};

const LinkCell = ({ dataItem }) => {
    const { created_document_id } = dataItem;
    return <td>
        {created_document_id &&
            <span className="create-document-link" onClick={e => handleClick(e, created_document_id)} >Скачать файл</span>
        }
    </td>
};

const OptionsCell = ({ dataItem }) => {
    const { status_id, id } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            to={`/${route}/documents/application/view/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Ответить',
        disabled: status_id !== 1,
        render: ({ item }) => <Link
            to={`/${route}/documents/application/edit/${id}`}
            className="row-control__link">{item.text}</Link>
    }].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const handleClick = async (e, id) => {
    e.preventDefault();
    let el = e.target;
    el.className = 'stamp-loading';
    el.innerText = 'Загрузка...';
    await fetch(`/api/requests/get_rkf_document/getrkfdocumentrequestdocument?id=${id}`, {
        method: 'GET',
        headers: getHeaders()
    })
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob),
                a = document.createElement('a');
            a.href = url;
            a.download = `Документ ${id}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    el.innerText = 'Скачать файл';
    el.className = 'create-document-link';
};

const Table = ({ documents, profileType, fullScreen, exporting, setExporting }) => {
    const [success, setSuccess] = useState(false);
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.value === "1" || e.value === "2" || e.value === "3") {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'status_id', operator: 'eq', value: e.value[0] }]
            }
            newDataState.skip = 0
        } else {
            newDataState.filter = {
                filters: []
            }
            newDataState.skip = 0
        }
        setGridData(newDataState);
    };

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(process(documents, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const gridForExport = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="status_name" title="Статус" />
        <GridColumn field="express" title="Срочность" cell={props => ExpressCell(props, 'express')} columnMenu={ColumnMenu} />
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="date_change" title="Дата последнего изменения статуса" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
        <GridColumn field="declarant_full_name" title="ФИО ответственного лица" columnMenu={ColumnMenu} />
        <GridColumn field="pedigree_number" title="Номер родословной" columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" title="Кличка" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
        <GridColumn field="created_document_id" title="Документ" columnMenu={ColumnMenu} cell={props => LinkCell(props, profileType)} />
        <GridColumn field="production_department_date" title="Дата передачи в производственный департамент" columnMenu={ColumnMenu} cell={props => DateCell(props, 'production_department_date')} />
    </Grid>;

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const done = { backgroundColor: "rgba(23, 162, 184, 0.15)" };
        const rejected = { backgroundColor: "rgba(220, 53, 69, 0.15)" };
        const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };
        const not_sent = { backgroundColor: "rgba(255, 193, 7, 0.15)" };
        const trProps = { style: status === 1 ? rejected : status === 2 ? in_work : status === 3 ? done : not_sent };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    };

    const StatusCell = (props) => {
        return (
            <LightTooltip title={props.dataItem.status_name} enterDelay={200} leaveDelay={200}>
                <td title={props.dataItem.status_name}>
                    {props.dataItem.status_value}
                </td>
            </LightTooltip>
        );
    };

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    return (
        <>
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale={'ru'}>
                    <div className={'user-documents-status__filters-wrap'}>
                        <div className="chip-list__wrap">
                            <ChipList
                                selection="single"
                                defaultData={categories}
                                onChange={handleDropDownChange}
                            />
                        </div>
                    </div>
                    {documents && <Grid
                        data={process(documents, gridData)}
                        rowRender={rowRender}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        style={{ height: "700px", width: "auto", margin: '0 auto' }}>
                        <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
                        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                        <GridColumn field="date_change" title="Дата последнего изменения статуса" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
                        <GridColumn field="declarant_full_name" title="ФИО ответственного лица" width={fullScreen ? 'auto' : '233px'} columnMenu={ColumnMenu} />
                        <GridColumn field="pedigree_number" title="Номер родословной" width={fullScreen ? '100px' : '100px'} columnMenu={ColumnMenu} />
                        <GridColumn field="dog_name" title="Кличка" width={fullScreen ? 'auto' : '233px'} columnMenu={ColumnMenu} />
                        <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                        <GridColumn field="created_document_id" title="Документ" width="100px" columnMenu={ColumnMenu} cell={props => LinkCell(props, profileType)} />
                        <GridColumn width={fullScreen ? '100px' : '70px'} cell={props => OptionsCell(props, profileType)} />
                    </Grid>}
                    <GridPDFExport
                        fileName={`Получение_документов_РКФ_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                        ref={gridPDFExport}
                        scale={0.5}
                        margin="1cm"
                        paperSize={["297mm", "210mm"]}
                        pageTemplate={() => <PdfPageTemplate
                            title="ЗАЯВКА НА ПОЛУЧЕНИЕ ДОКУМЕНТОВ РКФ"
                        />}
                    >
                        {gridForExport}
                    </GridPDFExport>

                </IntlProvider>
            </LocalizationProvider>
            <NotificationGroup
                style={{
                    position: 'absolute',
                    right: '1vh',
                    top: '80vh',
                }}
            >
                <Fade enter={true} exit={true}>
                    {success.status && <Notification
                        type={{ style: 'success', icon: true }}
                        closable={true}
                        onClose={() => setSuccess(false)}
                    >
                        <span>{success.message ? success.message : 'Информация сохранена!'}</span>
                    </Notification>}
                </Fade>
            </NotificationGroup>
        </>
    )
};

export default Table;