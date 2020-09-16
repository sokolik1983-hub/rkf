import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Grid, GridColumn, GridDetailRow } from "@progress/kendo-react-grid";
import {IntlProvider, LocalizationProvider, loadMessages} from "@progress/kendo-react-intl";
import messages from "./messages.json";
import "./index.scss";


loadMessages(messages, 'ru');


class DetailComponent extends GridDetailRow {
    render() {
        const {dataItem} = this.props;
        return (
            <div className="exhibitions-table__details">
                <h3>{dataItem.title}</h3>
                <p><span>Адрес проведения:</span> {dataItem.address || 'Не указано'}</p>
                <p>{dataItem.content}</p>
                <p><span>Породы:</span> {dataItem.breed_string}</p>
                <p><span>Судьи:</span> {dataItem.judges}</p>
                <Link to={dataItem.url}>Подробнее</Link>
            </div>
        );
    }
};


const ExhibitionsTable = ({exhibitions, count, startElement, getNextExhibitions}) => {
    const [expanded, setExpanded] = useState({class: 'expanded'});
    const [skip, setSkip] = useState(startElement);
    const [take, setTake] = useState(10);

    const onExpand = e => {
        e.dataItem.expanded = !e.dataItem.expanded;
        setExpanded({class: 'expanded'}); //Костыль для говнокендо, придуманный рукожопыми разработчиками кендо. Что бы их говнокомпонент разворачивался, нужно запустить рендер компонента.
    };

    const onPageChange = e => {
        setSkip(e.page.skip);
        setTake(e.page.take);
        getNextExhibitions(e.page.skip + 1);
    };

    return (
        <div className="exhibitions-table">
            <LocalizationProvider language="ru">
                <IntlProvider locale="ru">
                    <Grid
                        data={[...exhibitions]}
                        detail={DetailComponent}
                        expandField={expanded.class}
                        onExpandChange={onExpand}
                        skip={skip}
                        take={take}
                        total={count}
                        pageable={true}
                        onPageChange={onPageChange}
                    >
                        <GridColumn field="date" title="Дата" />
                        <GridColumn field="club_string" title="Клуб" />
                        <GridColumn field="rank_string" title="Ранг" />
                    </Grid>
                </IntlProvider>
            </LocalizationProvider>
        </div>
    )
};

export default React.memo(ExhibitionsTable);