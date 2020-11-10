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
                <p><span>Адрес проведения:</span> {dataItem.address || 'Не указано'}</p>
                <p>{dataItem.content}</p>
                <p><span>Породы:</span> {dataItem.breed_string}</p>
                <p><span>Судьи:</span> {dataItem.judges}</p>
                <Link to={dataItem.url}>Подробнее...</Link>
            </div>
        );
    }
};


const ExhibitionsTable = ({ exhibitions, count, startElement, getNextExhibitions, needUpdate, exporting, setExporting }) => {
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

    const LinkCell = ({ dataItem }) => {
        const { reports_links, report_status_message } = dataItem;

        return <td>
            {reports_links && reports_links.length
                ? reports_links.map(l => <a target="_blank" rel="noopener noreferrer" className="exhibitions-table__report-link" href={l.link}>{l.report_type_name}</a>)
                : <span>{report_status_message ? report_status_message : 'выставка ещё не проведена'}</span>
            }
        </td>;
    }

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
            <GridColumn field="date" title="Дата" width="170px" />
            <GridColumn field="club_rank_string" title="Клуб/Ранг" />
            {/* <GridColumn field="club_string" title="Клуб" />
            <GridColumn field="rank_string" title="Ранг" width="130px" /> */}
            <GridColumn field="report_string" cell={LinkCell} title="Отчёт" width="170px" />
        </Grid>;

    return (
        <div className="exhibitions-table">
            <LocalizationProvider language="ru">
                <IntlProvider locale="ru">
                    {grid}
                    <GridPDFExport
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

export default React.memo(ExhibitionsTable);