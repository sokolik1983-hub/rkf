import React, { useState, useRef, useEffect } from "react";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import PdfPageTemplate from "../../PdfPageTemplate";
import kendoMessages from "kendoMessages.json";
import moment from "moment";

import "./index.scss";


loadMessages(kendoMessages, 'ru-RU');

const Table = ({ documents, fullScreen }) => {
    const [exporting, setExporting] = useState(false);
    const [printData, setPrintData] = useState([]);
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: []
    });

    const optionsCell = (props) => {
        return <td>
            <input type="checkbox"
                   id="print"
                   className="custom-checkbox__input"
                   checked={!!printData.filter(item => item.barcode === props.barcode).length}
                   onChange={() => handleChange(props)}
            />
        </td>
    };

    const headerCell = () => {
        return <td>
            <input type="checkbox"
                   id="print"
                   className="custom-checkbox__input"
                   checked={printData.length === documents.length}
                   onChange={() =>  setPrintData(printData.length === documents.length ? [] : documents)}
            />
        </td>
    };

    const handleChange = (props) => {
        printData.includes(props) ?
            setPrintData(printData.filter(item => item.barcode !== props.barcode)) :
            setPrintData([props, ...printData]);
    }

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(process(printData, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const gridForExport = <Grid
        data={process(printData, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="document_short_name" title="Название Документа" />
        <GridColumn field="dog_breed_name" title="Порода" />
        <GridColumn field="dog_name" title="Кличка" />
        <GridColumn field="rkf_number" title="№ РКФ" />
        <GridColumn field="cert_number" title="Номер сертификата" />
        <GridColumn field="barcode" title="Трек номер" />
        <GridColumn field="rkf_creation_date" title="Дата сдачи в РКФ" />
        <GridColumn field="complition_date" title="Дата печати диплома" />
    </Grid>;

    const rowRender = (trElement) => {
        const trProps = { style: {backgroundColor: '#DCF1F4'}};
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    };

    return (
        <>
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale="ru">
                    {documents &&
                        <Grid
                            data={process(documents, gridData)}
                            rowRender={rowRender}
                            pageable
                            sortable
                            {...gridData}
                            onDataStateChange={handleGridDataChange}
                            style={{ height: '600px', width: 'auto', margin: '0 auto' }}>
                            <GridColumn width={'60px'} title="Опции"
                                cell={props => optionsCell(props.dataItem)}
                                headerCell={() => headerCell()}/>
                            <GridColumn field="document_short_name"
                                title="Название документа (титул)"
                                width={fullScreen ? '120px' : '100px'} />
                            <GridColumn field="dog_breed_name"
                                title="Порода"
                                width={'150'} />
                            <GridColumn field="dog_name"
                                title="Кличка"
                                width={fullScreen ? '260px' : '150px'} />
                            <GridColumn field="rkf_number"
                                title="№ РКФ"
                                width={'80px'} />
                            <GridColumn field="cert_number"
                                title="Номер сертификата (пателла, дисплазия, рабочий племенной)"
                                width={fullScreen ? '140px' : '100px'} />
                            <GridColumn field="barcode"
                                title="Трек номер"
                                width={fullScreen ? '130px' : '100px'} />
                            <GridColumn field="rkf_creation_date"
                                title="Дата сдачи в РКФ"
                                width={fullScreen ? '100px' : '80px'} />
                            <GridColumn field="complition_date"
                                title="Дата печати диплома"
                                width={fullScreen ? '100px' : '80px'} />
                        </Grid>
                    }
                    <GridPDFExport
                        fileName={`Реестр от ${moment(new Date()).format(`DD_MM_YYYY`)}`}
                        ref={gridPDFExport}
                        scale={0.5}
                        margin="1cm"
                        paperSize={['297mm', '210mm']}
                        pageTemplate={() => <PdfPageTemplate
                            title={"РЕЕСТР"}
                        />}
                    >
                        {gridForExport}
                    </GridPDFExport>
                </IntlProvider>
                <div className="modal-save">
                    <button className="modal-save__button"
                            onClick={() => setExporting(true)}
                            disabled={exporting}
                    >
                        Печать
                    </button>
                </div>
            </LocalizationProvider>
        </>
    )
};

export default Table;
