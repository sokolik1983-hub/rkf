import React, { useState, useRef, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import ShareCell from '../../ShareCell';
import moment from "moment";
import PdfPageTemplate from "../../../../../components/PdfTemplatePage";
import LightTooltip from "../../../../../components/LightTooltip";

loadMessages(kendoMessages, 'ru-RU');

const categories = [
    { "status_id": 1, "StatusName": "- Отклоненные" },
    { "status_id": 2, "StatusName": "* В работе" },
    { "status_id": 3, "StatusName": "+ Выполненные" },
    { "status_id": 4, "StatusName": "? Не отправленные" },
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const DateCell = ({ dataItem }, field) => <td>{formatDate(dataItem[field])}</td>;

const Table = ({ documents, distinction, height, exporting, setExporting, fullScreen }) => {
    const gridPDFExport = useRef(null);
    const [success, setSuccess] = useState(false);
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

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(documents, () => setExporting(false));
        }
    }, [exporting]);

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const green = { backgroundColor: "#E9EDE9" };
        const red = { backgroundColor: "#FFD6D9" };
        const grey = { backgroundColor: "#D8FDE4" };
        const draft = { backgroundColor: "#D4DAED" };
        const trProps = { style: status === 1 ? red : status === 2 ? grey : status === 3 ? green : draft };
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

    const litterGrid = <Grid
            data={process(documents, gridData)}
            rowRender={rowRender}
            pageable
            sortable
            resizable
            {...gridData}
            onDataStateChange={handleGridDataChange}
            style={{ height: height ? height : "700px", maxWidth: `${fullScreen ? `1035px` : `843px`}`, margin: "0 auto" }}>
            <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
            <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '100px' : '100px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
            <GridColumn field="date_change" title="Изменение статуса" width={fullScreen ? '100px' : '90px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
            <GridColumn field={`${distinction}_request_id`} title="№ пакета" width={fullScreen ? '100px' : '50px'} columnMenu={ColumnMenu} />
            <GridColumn field="breeder_full_name" title="Заводчик" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} />
            <GridColumn field="nursery_name" title="Питомник" width={fullScreen ? '100px' : '90px'} columnMenu={ColumnMenu} />
            <GridColumn field="count_of_litter" title="Щенков" width={fullScreen ? '80px' : '50px'} columnMenu={ColumnMenu} />
            <GridColumn field="breed" title="Порода" width={fullScreen ? '120px' : '80px'} columnMenu={ColumnMenu} />
            <GridColumn field="stamp_code" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
            <GridColumn field="count_of_documents" title="Док-в" width={fullScreen ? '70px' : '50px'} columnMenu={ColumnMenu} />
            <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} />
        </Grid>;

    const breedGreed = <Grid
        data={process(documents, gridData)}
        rowRender={rowRender}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        style={{ height: height ? height : "700px", maxWidth: `${fullScreen ? `1035px` : `843px`}`, margin: "0 auto" }}>
        <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '100px' : '100px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field={`${distinction}_request_id`} title="№ пакета" width={fullScreen ? '100px' : '50px'} columnMenu={ColumnMenu} />
        <GridColumn field="owner_full_name" title="ФИО владельца" width={fullScreen ? '130px' : '110px'} columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" title="Заводчик" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" title="Кличка" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} />
        <GridColumn field="breed" title="Порода" width={fullScreen ? '120px' : '80px'} columnMenu={ColumnMenu} />
        <GridColumn field="stamp_number" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} />
        <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width={fullScreen ? '120px' : '89px'} columnMenu={ColumnMenu} cell={(props) => ShareCell(props, handleSuccess)} />
    </Grid>;

    return (
        <div className="App">
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale={'ru'}>
                    <p>
                        <strong>Фильтры: </strong>&nbsp;
                        <DropDownList
                            data={categories}
                            dataItemKey="status_id"
                            textField="StatusName"
                            defaultItem={{ status_id: null, StatusName: "Все" }}
                            onChange={handleDropDownChange}
                        />
                    </p>
                    {
                        documents && distinction === 'litter'
                            ? <>
                                {litterGrid}
                                <GridPDFExport
                                    fileName={`Реестр_помёт_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                                    ref={gridPDFExport}
                                    scale={0.3}
                                    margin="1cm"
                                    paperSize="A4"
                                    pageTemplate={PdfPageTemplate}
                                >
                                    {litterGrid}
                                </GridPDFExport>
                            </>
                            : <>
                                {breedGreed}
                                <GridPDFExport
                                    fileName={`Реестр_родословная_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                                    ref={gridPDFExport}
                                    scale={0.3}
                                    margin="1cm"
                                    paperSize="A4"
                                    pageTemplate={PdfPageTemplate}
                                >
                                    {breedGreed}
                                </GridPDFExport>
                            </>
                    }
                </IntlProvider>
            </LocalizationProvider>
            <NotificationGroup
                style={{
                    alignItems: 'flex-start',
                    flexWrap: 'wrap-reverse'
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
        </div>
    )
};

export default Table;