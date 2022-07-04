import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { Checkbox } from '@progress/kendo-react-inputs';
import { DropDownButton, ChipList } from '@progress/kendo-react-buttons';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import StickyFilters from "components/StickyFilters";
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import ShareCell from '../../ShareCell';
import moment from "moment";
import PdfPageTemplate from "../../../../../components/PdfPageTemplate";
import LightTooltip from "../../../../../components/LightTooltip";
import CopyCell from '../../../../Docs/components/CopyCell';
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import declension from "../../../../../utils/declension";
import CardMessage from "../../../../../components/CardMessage";
import { getHeaders } from "../../../../../utils/request";

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

const LinkCell = (props) => {
    const { dataItem } = props;
    return <td>
        {dataItem.pedigree_link &&
            <a className="pedigree-link" href={dataItem.pedigree_link} target="_blank" rel="noopener noreferrer">Ссылка</a>
        }
    </td>
};

const ArchiveCell = ({ dataItem }) => {
    const { status_id, archive_days_left, date_change } = dataItem;
    const countStatus = status_id === 1 || status_id === 3;
    const isArchive = status_id === 8;

    return isArchive ? <td>{date_change}</td> : (countStatus && archive_days_left > 0) ? <td>{`До архивации ${archive_days_left} ${declension(archive_days_left, ['день', 'дня', 'дней'])}`}</td> : (countStatus && archive_days_left < 1) ? <td>{`В очереди на архивацию`}</td> : <td></td>;
};

const handleExtract = async (e, request_id, setNeedUpdateTable) => {
    e.preventDefault();
    await fetch(`/api/requests/commonrequest/dearchive_request`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            "request_id": request_id,
            "request_type": 3,
        })
    })
        .then(data => alert('Заявка извлечена из архива'))
        .then(() => setNeedUpdateTable(true))
        .catch(error => console.log(error))
};

const OptionsCell = ({ dataItem }, setErrorReport, setNeedUpdateTable) => {
    const [open, setOpen] = useState(false);
    const { status_id, type_id, id, can_error_report, dearchiving_allowed } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        disabled: status_id === 8,
        render: ({ item }) => <Link
            className="club-documents-status__dropdown-link"
            to={`/kennel/${route}/documents/replace-pedigree/${type_id}/view/${id}`}>{item.text}</Link>
    }, {
        text: 'Ответить',
        disabled: status_id === 1 ? false : true,
        render: ({ item }) => <Link
            className="club-documents-status__dropdown-link"
            to={`/kennel/${route}/documents/replace-pedigree/${type_id}/edit/${id}`}>{item.text}</Link>
    }, {
        text: 'Сообщить об ошибке кинолога',
        disabled: (status_id === 3) || can_error_report ? false : true,
        render: ({ item }) => <span onClick={() => setErrorReport(id)}>{item.text}</span>
    },
    {
        text: 'Восстановить',
        disabled: dearchiving_allowed ? false : true,
        render: ({ item }) => <span className="row-control__link"
            onClick={e => handleExtract(e, id, setNeedUpdateTable)}>{item.text}</span>
    }].filter(o => !o.disabled);

    return <td>
        <DropDownButton icon={`k-icon k-i-arrow-chevron-${open ? `up` : `down`}`} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} items={options} />
    </td>
};

const Table = ({ documents, reqTypes, checkedTypes, checkType, isOpenFilters, setErrorReport, exporting, setExporting, fullScreen, setNeedUpdateTable }) => {
    const gridPDFExport = useRef(null);
    const [success, setSuccess] = useState(false);
    const [isArchive, setIsArchive] = useState(false);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: []
    });

    let filteredDocuments = isArchive ? documents : documents?.filter(doc => doc.status_id !== 8);

    useEffect(() => {
        setSelectedDocument();
    }, []);

    const setSelectedDocument = () => {
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
                logic: 'or',
                filters: [{ field: 'status_id', operator: 'eq', value: e.value[0] },
                { field: 'prev_status_id', operator: 'eq', value: e.value[0] }]
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

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(process(filteredDocuments, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const gridForExport = <Grid
        data={process(filteredDocuments, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="status_name" title="Статус" />
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} />
        <GridColumn field="id" title="№ заявки" columnMenu={ColumnMenu} />
        <GridColumn field="owner_name" title="ФИО владельца" columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" title="Кличка" columnMenu={ColumnMenu} />
        <GridColumn field="breed_name" title="Порода" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_code" title="Чип/Клеймо" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
        <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" columnMenu={ColumnMenu} cell={LinkCell} />
        <GridColumn field="date_archive" title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
    </Grid>;

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const isArchive = props.dataItem.status_id === 8;
        const done = { backgroundColor: "rgba(23, 162, 184, 0.15)" };
        const rejected = { backgroundColor: "rgba(220, 53, 69, 0.15)" };
        const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };
        const not_sent = { backgroundColor: "rgba(255, 193, 7, 0.15)" };
        const archive = { backgroundColor: "rgb(210, 215, 218)" };
        const trProps = { style: isArchive ? archive : status === 1 ? rejected : status === 2 ? in_work : status === 3 ? done : not_sent };
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
    const TextCell = ({ dataItem }, field) => <td style={{ textAlign: 'left' }}>{dataItem[field]}</td>;

    return (<>
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale="ru">
                <StickyFilters>
                    <div className="club-documents-status__chips" style={{ marginTop: '10px' }}>
                        <div className="chip-list__wrap">
                            <ChipList
                                selection="single"
                                defaultData={categories}
                                onChange={handleDropDownChange}
                            />
                            <CustomCheckbox
                                id="is_archive"
                                label="Архивные заявки"
                                checked={isArchive}
                                onChange={() => setIsArchive(!isArchive)}
                            />
                        </div>
                    </div>
                    <div className={`club-documents-status__filters${isOpenFilters ? ' _open' : ''}`}>
                        <div className="club-documents-status__checkbox-wrap">
                            {!!reqTypes.length && reqTypes.map(({ id, name }) =>
                                <Checkbox
                                    key={id}
                                    id={`custom-checkbox-reqtypes-${id}`}
                                    label={name}
                                    onChange={() => checkType(id)}
                                    checked={checkedTypes.includes(id)}
                                />
                            )}
                        </div>
                    </div>
                </StickyFilters>
                {filteredDocuments && <>
                    <CardMessage>
                        <h3>Уважаемые пользователи!</h3>
                        <p>Заявки в статусах "Выполнено" и "Отклонено", если в течение 60 дней с ними не производилось никаких действий, будут перенесены в архив и станут недоступны для просмотра вложений, редактирования и повторной отправки! Заявки в статусе "Не отправлена" будут безвозвратно удалены по прошествии 60 дней с момента их создания!</p>
                    </CardMessage>
                    <Grid
                        data={process(filteredDocuments, gridData)}
                        rowRender={rowRender}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        style={{ height: "700px", width: "auto", margin: "0 auto" }}>
                        <GridColumn width={fullScreen ? '100px' : '70px'} title="Опции" cell={props => OptionsCell(props, setErrorReport, setNeedUpdateTable)} />
                        <GridColumn field="status_value" cell={StatusCell} title="Статус" width={fullScreen ? '62px' : '61px'} />
                        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '130px' : '130px'} columnMenu={ColumnMenu} />
                        <GridColumn field="id" title="№ заявки" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
                        <GridColumn field="owner_name" title="ФИО владельца" width={fullScreen ? 'auto' : '139px'} columnMenu={ColumnMenu} />
                        <GridColumn field="dog_name" title="Кличка" width={fullScreen ? 'auto' : '140px'} columnMenu={ColumnMenu} />
                        <GridColumn field="breed_name" title="Порода" width={fullScreen ? 'auto' : '140px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'breed_name')} />
                        <GridColumn field="stamp_code" title="Чип/Клеймо" width={fullScreen ? '110px' : '95px'} columnMenu={ColumnMenu} />
                        <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                        <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width={fullScreen ? '125px' : '75px'} columnMenu={ColumnMenu} cell={(props) => ShareCell(props, handleSuccess)} />
                        <GridColumn field="date_archive" width={fullScreen ? '130px' : '98px'} title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
                    </Grid></>}
                <GridPDFExport
                    fileName={`Реестр_замены_родословной_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                    ref={gridPDFExport}
                    scale={0.4}
                    margin="1cm"
                    paperSize={["297mm", "210mm"]}
                    pageTemplate={() => <PdfPageTemplate
                        title="ЗАМЕНА РОДОСЛОВНОЙ"
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