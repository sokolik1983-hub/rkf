import React, {useState} from 'react';
import {endpointCatalogue, endpointPutPaymentReceipt} from '../../config';
import {Request} from "../../../../utils/request";
import './styles.scss';


const ReportDetailsTable = ({reportHeader}) => {
    const [catalog, setCatalog] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [showButton, setShowButton] = useState(!!catalog);

    const onSubmit = () => {
        const catalogData = new FormData();
        catalogData.append('header_id', reportHeader.id);
        catalogData.append('file', catalog);

        Request({
            url: endpointCatalogue,
            method: 'PUT',
            data: catalogData,
            isMultipart: true
        }, data => {
            setShowButton(false);
            alert('Каталог выставки успешно отправлен.');
        }, error => {
            alert('Каталог выставки не был отправлен.')
        });

        if(invoice) {
            const invoiceData = new FormData();
            invoiceData.append('header_id', reportHeader.id);
            invoiceData.append('file', invoice);

            Request({
                url: endpointPutPaymentReceipt,
                method: 'PUT',
                data: invoiceData,
                isMultipart: true
            }, data => {
                setShowButton(false);
                alert('Квитанция об оплате успешно отправлена.');
            }, error => {
                alert('Квитанция об оплате не была отправлена.');
            });
        }
    };

    return (
        <>
            <h4>Прикрепление документов</h4>
            <div className="report-documents">
                <div className="report-documents__document">
                    <label className="report-documents__document-label">Каталог выставки</label>
                    {!reportHeader.doc_catalog_accept ?
                        <input type="file" accept=".pdf" onChange={(e) => {
                            setCatalog(e.target.files[0]);
                            setShowButton(true);
                        }}/> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
                <div className="report-documents__document">
                    <label className="report-documents__document-label">
                        Квитанция об оплате взноса за обработку результатов выставки
                    </label>
                    {!reportHeader.doc_payment_accept ?
                        <input type="file" accept=".pdf" onChange={(e) => setInvoice(e.target.files[0])}/> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
            </div>
            {showButton && <button onClick={onSubmit}>Отправить</button>}
        </>
    );
};

export default ReportDetailsTable;