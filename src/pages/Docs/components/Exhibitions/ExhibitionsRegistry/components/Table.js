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
import { Request } from "utils/request";
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
    },
    {
        text: 'Отмененные',
        value: '6',
    }
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const handleCancel = (e, id) => {
    e.preventDefault();
    if (window.confirm('Отменить выставку?')) {
        Request({
            url: `/api/requests/exhibition_request/clubexhibitionrequest/cancel_by_user`,
            method: 'POST',
            data: id
        }, data => {
            window.location.reload();
        }, error => {
            alert(`Ошибка: ${error?.message}`);
        });
    }
}

const RankCell = ({ dataItem }) => {
    const { format_name, rank_name, national_breed_club_name } = dataItem;
    let fieldValue = format_name === "Монопородная" ? national_breed_club_name : rank_name;

    return <td>{fieldValue}</td>
};

const ApprovedRankCell = ({ dataItem }) => {
    const { approved_rank_name, status_id } = dataItem;
    let fieldValue = status_id === 3 ? approved_rank_name : '';

    return <td>{fieldValue}</td>
};

const OptionsCell = ({ dataItem }) => {
    const { status_id, id, is_approved } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            to={`/${route}/documents/exhibitions/application/form/view/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Ответить',
        disabled: status_id === 1 ? false : true,
        render: ({ item }) => <Link
            to={`/${route}/documents/exhibitions/application/form/edit/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Редактировать',
        disabled: status_id === 2 && !is_approved ? false : true,
        render: ({ item }) => <Link
            to={`/${route}/documents/exhibitions/application/form/change/${id}`}
            className="row-control__link">{item.text}</Link>
    },
    {
        text: 'Отменить',
        disabled: status_id === 2 && !is_approved ? false : true,
        render: ({ item }) => <Link
            to={`/${route}/documents/exhibitions/application/form/cancel/${id}`}
            onClick={e => handleCancel(e, id)}
            className="row-control__link">{item.text}</Link>
    }].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const Table = ({ documents, profileType, fullScreen, exporting, setExporting }) => {
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

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.value === "3" || e.value === "6") {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'status_id', operator: 'eq', value: e.value[0] }]
            }
            newDataState.skip = 0
        } else if (e.value === "1") {
            newDataState.filter = {
                logic: 'or',
                filters: [{ field: 'status_id', operator: 'eq', value: "1" },
                { field: 'status_id', operator: 'eq', value: "5" }]
            }
            newDataState.skip = 0
        } else if (e.value === "2") {
            newDataState.filter = {
                logic: 'or',
                filters: [{ field: 'status_id', operator: 'eq', value: "2" },
                { field: 'status_id', operator: 'eq', value: "7" }]
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
        <GridColumn field="date_create" title="Дата создания" />
        <GridColumn field="date_change" title="Дата последнего изменения статуса" />
        <GridColumn field="barcode" title="Трек-номер" />
        <GridColumn field="date_begin" title="Дата начала проведения выставки" />
        <GridColumn field="date_end" title="Дата окончания проведения выставки" />
        <GridColumn field="format_name" title="Формат мероприятия" />
        <GridColumn field="rank_name" title="Ранг заявленный / НКП" cell={props => RankCell(props)} />
        <GridColumn field="approved_rank_name" title="Ранг утвержденный выставки" cell={props => ApprovedRankCell(props)} />
        <GridColumn field="city_name" title="Место проведения выставки" />
    </Grid>;

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const done = { backgroundColor: "rgba(23, 162, 184, 0.15)" };
        const rejected = { backgroundColor: "rgba(220, 53, 69, 0.15)" };
        const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };
        const not_sent = { backgroundColor: "rgba(255, 193, 7, 0.15)" };
        const trProps = { style: status === 1 || status === 5 ? rejected : status === 2 || status === 7 ? in_work : status === 3 ? done : not_sent };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    };

    const StatusCell = (props) => {
        return (
            <LightTooltip title={props.dataItem.status_name} enterDelay={200} leaveDelay={200}>
                <td>
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
                        <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
                        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} />
                        <GridColumn field="date_change" title="Дата последнего изменения статуса" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} />
                        <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                        <GridColumn field="date_begin" title="Дата начала проведения выставки" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} />
                        <GridColumn field="date_end" title="Дата окончания проведения выставки" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} />
                        <GridColumn field="format_name" title="Формат мероприятия" width={fullScreen ? 'auto' : '135px'} columnMenu={ColumnMenu} />
                        <GridColumn field="rank_name" title="Ранг заявленный / НКП" width={fullScreen ? 'auto' : '150px'} cell={props => RankCell(props)} columnMenu={ColumnMenu} />
                        <GridColumn field="approved_rank_name" title="Ранг утвержденный выставки" width={fullScreen ? 'auto' : '116px'} cell={props => ApprovedRankCell(props)} columnMenu={ColumnMenu} />
                        <GridColumn field="city_name" title="Место проведения выставки" width={fullScreen ? 'auto' : '136px'} columnMenu={ColumnMenu} />
                        <GridColumn width={fullScreen ? '100px' : '70px'} cell={props => OptionsCell(props, profileType)} />
                    </Grid>}
                    <GridPDFExport
                        fileName={`Проведение_выставки_${moment(new Date()).format(`DD_MM_YYYY`)}`}
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