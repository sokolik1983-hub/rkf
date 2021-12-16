import React, {useCallback, useEffect, useState} from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';
import CopyCell from '../../../CopyCell';
import PdfLinkCell from "../PdfLinkCell";

import "./index.scss";

loadMessages(kendoMessages, 'ru-RU');


const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};


const Table = ({ documents, height,  fullScreen, puppiesCount}) => {
    const [success, setSuccess] = useState(false);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: []
    });

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const rowRender = (trElement, props) => {

        const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };

        const trProps = { style:  in_work };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    };

    return (
        <div className="App">
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale={'ru'}>
                    <div className={`chip-list__wrap _registry-wrap ${fullScreen ? `_full-registry-wrap` : ``}`}>

                    </div>
                    {
                        documents &&
                            <>
                                <Grid
                                    data={process(documents, gridData)}
                                    rowRender={rowRender}
                                    pageable
                                    sortable
                                    resizable
                                    {...gridData}
                                    onDataStateChange={handleGridDataChange}
                                    style={{ height: height ? height : "700px", width: "auto", margin: "0 auto" }}>

                                    <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '90px' : '80px'}
                                                columnMenu={ColumnMenu} />


                                    <GridColumn field="barcode" title="Номер метрики щенка"
                                                width={'110px'} columnMenu={ColumnMenu}
                                                 />

                                    <GridColumn field="request_barcode" title="Трек-номер заявки на регистрацию помета"
                                                width={'120px'} columnMenu={ColumnMenu}
                                                cell={(props) =>  CopyCell(props, handleSuccess)} />

                                    <GridColumn field="dog_name" title="Кличка" width={'70px'}
                                                columnMenu={ColumnMenu} />

                                    <GridColumn field="stamp" title="Клеймо"
                                                width={'60px'} columnMenu={ColumnMenu} />


                                    <GridColumn width={'60px'}
                                                field="pedigree_link" title="Ссылка на эл. копию документа"
                                                columnMenu={ColumnMenu}
                                                // cell={renderPdfLink}
                                                cell={(props) => PdfLinkCell(props)}
                                    />
                                </Grid>

                            </>
                    }
                </IntlProvider>
            </LocalizationProvider>

        </div>
    )
};

export default Table;