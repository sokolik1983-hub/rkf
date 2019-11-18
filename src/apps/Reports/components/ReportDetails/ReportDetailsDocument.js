import React, {useEffect, useState} from 'react';
import {endpointCatalogue, endpointPaymentReceipt} from '../../config';
import {Request, getHeaders} from "../../../../utils/request";
import './styles.scss';


const ReportDetailsTable = ({reportHeader, getHeader}) => {
    const [catalog, setCatalog] = useState(null);
    const [catalogUrl, setCatalogUrl] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceUrl, setInvoiceUrl] = useState(null);
    const [showButton, setShowButton] = useState(!!catalog);

    const getDocumentUrl = async (endpoint) => {
        const response = await fetch(`${endpoint}?id=${reportHeader.id}`, {
            headers: getHeaders()
        });

        if(response.status === 200) {
            const blob = await response.blob();
            const blobUrl = await URL.createObjectURL(blob);

            return blobUrl;
        } else return null;
    };

    useEffect( () => {
        if(!reportHeader.doc_catalog_accept) {
             (async () => {
                 const url = await getDocumentUrl(endpointCatalogue);

                 setCatalogUrl(url);
             })();
        }

        if(!reportHeader.doc_payment_accept) {
             (async () => {
                 const url = await getDocumentUrl(endpointPaymentReceipt);

                 setInvoiceUrl(url);
             })();
        }
    }, []);

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
            alert('Каталог выставки успешно отправлен.');
            getHeader();
        }, error => {
            alert('Каталог выставки не был отправлен.')
        });

        if(invoice) {
            const invoiceData = new FormData();
            invoiceData.append('header_id', reportHeader.id);
            invoiceData.append('file', invoice);

            Request({
                url: endpointPaymentReceipt,
                method: 'PUT',
                data: invoiceData,
                isMultipart: true
            }, data => {
                alert('Квитанция об оплате успешно отправлена.');
                getHeader();
            }, error => {
                alert('Квитанция об оплате не была отправлена.');
            });
        }
    };

    return (
        <>
            {reportHeader.doc_catalog_comment &&
                <h4 style={{maxWidth: '33%', color: 'red'}}>
                    Каталог выставки был отклонён с комментарием: {reportHeader.doc_catalog_comment}
                </h4>
            }
            {reportHeader.doc_payment_comment &&
                <h4 style={{maxWidth: '33%', color: 'red'}}>
                    Квитанция об оплате была отклонена с комментарием: {reportHeader.doc_payment_comment}
                </h4>
            }
            <h4>Прикрепление документов</h4>
            <div className="report-documents">
                <div className="report-documents__document">
                    <label className="report-documents__document-label">Каталог выставки</label>
                    {!reportHeader.doc_catalog_accept ?
                        <>
                            {catalogUrl && <a href={catalogUrl} target="_blank">Каталог выставки</a>}
                            <input type="file" accept=".pdf" style={{display: 'block', marginTop: '8px'}} onChange={(e) => {
                                setCatalog(e.target.files[0]);
                                setShowButton(true);
                            }}/>
                        </> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
                <div className="report-documents__document">
                    <label className="report-documents__document-label">
                        Квитанция об оплате взноса за обработку результатов выставки
                    </label>
                    {!reportHeader.doc_payment_accept ?
                        <>
                            {invoiceUrl && <a href={invoiceUrl} target="_blank">Квитанция об оплате взноса за обработку результатов выставки</a>}
                            <input type="file" accept=".pdf" style={{display: 'block', marginTop: '8px'}} onChange={(e) => {
                                setInvoice(e.target.files[0]);
                                if(catalogUrl) setShowButton(true);
                            }}/>
                        </> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
            </div>
            {showButton && <button onClick={onSubmit}>Отправить</button>}
        </>
    );
};

export default ReportDetailsTable;