import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, GridColumn, GridDetailRow } from "@progress/kendo-react-grid";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import messages from "./messages.json";
import "./index.scss";

loadMessages(messages, 'ru');


class DetailComponent extends GridDetailRow {
    render() {
        const { dataItem } = this.props;
        return (
            <div className="exhibitions-table__details">
                <h3>{dataItem.title}</h3>
                <p><span>Организатор:</span> {dataItem.organizer_name}</p>
                {dataItem.city_name && <p className="educational-page__address-subtitle">
                    <span>Адрес: </span>{`г. ${dataItem.city_name}${dataItem.location_address ? ', ' + dataItem.location_address : ''}`}
                </p>}
                {!!dataItem.contact_phones?.length && <p className="educational-page__address-subtitle"><span>Телефон: </span>{dataItem.contact_phones.join(', ')}</p>}
                {!!dataItem.contact_emails?.length && <p className="educational-page__address-subtitle"><span>E-mail: </span>{dataItem.contact_emails.join(', ')}</p>}

                <Link to={dataItem.url}>Подробнее...</Link>
            </div>
        );
    }
};


const EducationalsTable = ({ exhibitions, count, startElement, getNextExhibitions, needUpdate, exporting, setExporting }) => {
    const [skip, setSkip] = useState(startElement);
    const [take, setTake] = useState(50);
    const [dataItems, setDataItems] = useState([]);
    const gridPDFExport = useRef(null);

    useEffect(() => {
        if (needUpdate) {
            setSkip(0);
            setDataItems([]);
        }
    }, [needUpdate]);

    useEffect(() => {
        if (exporting) {
            //костыль, чтобы свернуть все раскрытые ряды таблицы
            if (dataItems.length) {
                setDataItems(dataItems.map(item => {
                    item.expanded = false;
                    return item;
                }));
            }

            gridPDFExport.current.save(exhibitions, () => setExporting(false));
        }
    }, [exporting]);

    const onExpand = e => {
        e.dataItem.expanded = !e.dataItem.expanded;

        if (e.value) {
            setDataItems([...dataItems.filter(item => item !== e.dataItem), e.dataItem]);
        } else {
            setDataItems(dataItems.filter(item => item !== e.dataItem));
        }
    };

    const onPageChange = e => {
        setSkip(e.page.skip);
        setTake(e.page.take);
        setDataItems([]);
        getNextExhibitions(e.page.skip + 1);
    };

    const grid =
        <Grid
            data={[...exhibitions]}
            detail={DetailComponent}
            expandField="expanded"
            onExpandChange={onExpand}
            skip={skip}
            take={take}
            total={count}
            scrollable="none"
            pageable={true}
            onPageChange={onPageChange}
        >
            <GridColumn field="date" title="Дата проведения" width="170px" />
            <GridColumn field="event_name" title="Название мероприятия" />
            <GridColumn field="type" title="Тип" />
            <GridColumn field="form" title="Форма" />
            <GridColumn field="lecturers" title="Лектор" />
        </Grid>;

    return (
        <div className="exhibitions-table">
            <LocalizationProvider language="ru">
                <IntlProvider locale="ru">
                    {grid}
                    <GridPDFExport
                        fileName="Список мероприятий"
                        ref={gridPDFExport}
                        scale={0.6}
                        margin="1cm"
                        paperSize="A4"
                    >
                        {grid}
                    </GridPDFExport>
                </IntlProvider>
            </LocalizationProvider>
        </div>
    )
};

export default React.memo(EducationalsTable);