import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownButton, ChipList } from '@progress/kendo-react-buttons';
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

const OptionsCell = ({ dataItem }, setErrorReport) => {
    const { status_id, id } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            to={`/kennel/${route}/documents/responsible/checkmembership/form/view/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Ответить',
        disabled: status_id !== 1,
        render: ({ item }) => <Link
            to={`/kennel/${route}/documents/responsible/checkmembership/form/edit/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Сообщить об ошибке кинолога',
        disabled: status_id === 3 ? false : true,
        render: ({ item }) => <span className="row-control__link" onClick={() => setErrorReport(id)}>{item.text}</span>
    }
].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const Table = ({ documents, fullScreen, exporting, setExporting, setErrorReport }) => {
    const [success, setSuccess] = useState(false);
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

    useEffect(() => {
        handleDropDown()
    }, []);

    const handleDropDown = () => {
        const document_id = window.location.href.split('=')[1];
        let newDataState = { ...gridData }
        if (document_id) {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'barcode', operator: 'eq', value: document_id }]
            }
            newDataState.skip = 0
        }
        setGridData(newDataState);
    };

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
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="date_change" title="Дата последнего изменения статуса" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
        <GridColumn field="federation_name" title="Федерация" columnMenu={ColumnMenu} />
        <GridColumn field="mating_whelping_book_document_year" title="Год" width={fullScreen ? 'auto' : '258px'} columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
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
                        style={{ height: "700px", maxWidth: `${fullScreen ? 'auto' : '703px'}`, margin: '0 auto' }}>
                        <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
                        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                        <GridColumn field="date_change" title="Дата последнего изменения статуса" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
                        <GridColumn field="federation_name" title="Федерация" width={fullScreen ? 'auto' : '120px'} columnMenu={ColumnMenu} />
                        <GridColumn field="mating_whelping_book_document_year" title="Год" width={fullScreen ? 'auto' : '120px'} columnMenu={ColumnMenu} />
                        <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                        <GridColumn width={fullScreen ? '100px' : '70px'} cell={props => OptionsCell(props, setErrorReport)} />
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