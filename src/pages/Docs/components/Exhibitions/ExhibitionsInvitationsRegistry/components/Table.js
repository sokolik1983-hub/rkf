import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from "@progress/kendo-data-query";
import { Grid, GridColumn, GridColumnMenuFilter } from "@progress/kendo-react-grid";
import { DropDownButton, ChipList } from '@progress/kendo-react-buttons';
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from "kendoMessages.json";
import moment from "moment";
import PdfPageTemplate from "../../../../../../components/PdfPageTemplate";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import "./index.scss";


loadMessages(kendoMessages, 'ru-RU');

const categories = [
    {
        text: 'Отклоненные',
        value: '3',
    },
    {
        text: 'В работе',
        value: '1',
    },
    {
        text: 'Выполненные',
        value: '2',
    },
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const OptionsCell = ({ dataItem }, userType) => {
    const [open, setOpen] = useState(false);
    const { exhibition_id } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            to={`/${userType}/${route}/documents/exhibitions/invite?exhibitionId=${exhibition_id}`}
            className="row-control__link">{item.text}</Link>
    }];

    return <td>
        <DropDownButton icon={`k-icon k-i-arrow-chevron-${open ? `up` : `down`}`} onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)} items={options}
        />
    </td>
};

const Table = ({
                   documents,
                   fullScreen,
                   exporting,
                   setExporting,
                   userType,
               }) => {
    const [success, setSuccess] = useState(false);
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: []
    });

    useEffect(() => {
        setBarcodeFilter();
    }, []);

    const setBarcodeFilter = () => {
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

    //TODO: доделать кнопульки, для этого нужны минимум три заявки с разными статусами
    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.value === "1") {
            newDataState.filter = {
                logic: 'or',
                filters: [{ field: 'invite_status', operator: 'eq', value: "1" },
                { field: 'invite_status', operator: 'eq', value: "1" }]
            }
            newDataState.skip = 0
        } else if (e.value === "2") {
            newDataState.filter = {
                logic: 'or',
                filters: [{ field: 'invite_status', operator: 'eq', value: "2" },
                { field: 'invite_status', operator: 'eq', value: "2" }]
            }
            newDataState.skip = 0
        } else if (e.value === "3") {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'invite_status', operator: 'eq', value: e.value[0] }]
            }
            newDataState.skip = 0
        }  else {
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

        <GridColumn field="options" title="Опции" />
        <GridColumn field="date_create" title="Дата получения запроса" />
        <GridColumn field="exhibition_name" title="Название выставки" />
        <GridColumn field="start_date" title="Дата начала выставки" />
        <GridColumn field="end_date" title="Дата окончания выставки" />
        { userType === 'nbc' &&
        <GridColumn field="club_name" title="Название клуба"/> }
        <GridColumn field="city" title="Место проведения" />
        { userType !== 'nbc' &&
        <GridColumn field="nbc_breed" title="Порода НКП"/> }
        { userType !== 'nbc' &&
        <GridColumn field="nbc_status_name" title="Статус согласования с НКП"/> }
        { userType !== 'nbc' &&
        <GridColumn field="judge_status_name" title="Статус приглашения судьи"/> }
        <GridColumn field="invite_status_name" title="Статус" />
    </Grid>;

    const rowRender = (trElement, props) => {
        const status = props.dataItem.invite_status;
        const done = { backgroundColor: "rgba(23, 162, 184, 0.15)" };
        const rejected = { backgroundColor: "rgba(220, 53, 69, 0.15)" };
        const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };
        const trProps = { style: status === 1 ? in_work : status === 2 ? done : rejected };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    };

    return (
        <>
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale="ru">
                    <div className="user-documents-status__filters-wrap">
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

                        <GridColumn field="options" title="Опции" width={fullScreen ? '62px' : '62px'} cell={props => OptionsCell(props, userType)} />
                        <GridColumn field="date_create" title="Дата получения запроса" width={fullScreen ? 'auto' : '160px'} columnMenu={ColumnMenu} />
                        <GridColumn field="exhibition_name" title="Название выставки" width={fullScreen ? 'auto' : '196px'} columnMenu={ColumnMenu} />
                        <GridColumn field="start_date" title="Дата начала выставки" width={fullScreen ? 'auto' : '150px'} columnMenu={ColumnMenu} />
                        <GridColumn field="end_date" title="Дата окончания выставки" width={fullScreen ? 'auto' : '168px'} columnMenu={ColumnMenu} />
                        { userType === 'nbc' &&
                        <GridColumn field="club_name" title="Название клуба" width={ fullScreen ? 'auto' : '168px' }
                                    columnMenu={ ColumnMenu }/> }
                        <GridColumn field="city" title="Место проведения" width={fullScreen ? 'auto' : '129px'} columnMenu={ColumnMenu} />
                        { userType !== 'nbc' &&
                        <GridColumn field="nbc_breed" title="Порода НКП" width={ fullScreen ? 'auto' : '189px' }
                                    columnMenu={ ColumnMenu }/> }
                        { userType !== 'nbc' &&
                        <GridColumn field="nbc_status_name" title="Статус согласования с НКП"
                                    width={ fullScreen ? 'auto' : '174px' } columnMenu={ ColumnMenu }/> }
                        { userType !== 'nbc' &&
                        <GridColumn field="judge_status_name" title="Статус приглашения судьи"
                                    width={ fullScreen ? 'auto' : '172px' } columnMenu={ ColumnMenu }/> }
                        <GridColumn field="invite_status_name" title="Статус" width={fullScreen ? 'auto' : '120px'} columnMenu={ColumnMenu} />
                    </Grid>}

                    <GridPDFExport
                        fileName={`Проведение_выставки_${moment(new Date()).format(`DD.MM.YYYY`)}`}
                        ref={gridPDFExport}
                        scale={0.5}
                        margin="1cm"
                        paperSize={["297mm", "210mm"]}
                        pageTemplate={() => <PdfPageTemplate
                            title="ЗАЯВКА НА ПРОВЕДЕНИЕ ВЫСТАВКИ"
                        />}
                    >
                        {gridForExport}
                    </GridPDFExport>
                </IntlProvider>
            </LocalizationProvider>
            <NotificationGroup
                style={{
                    position: 'fixed',
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