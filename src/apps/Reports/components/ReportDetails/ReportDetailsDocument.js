import React, { useEffect, useState } from 'react';
import { endpointCatalogue, endpointPaymentReceipt, endpointExtraDoc } from '../../config';
import { Request, getHeaders } from "../../../../utils/request";
import './styles.scss';


const ReportDetailsTable = ({ reportHeader, getHeader }) => {
    const [catalog, setCatalog] = useState(null);
    const [catalogUrl, setCatalogUrl] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceUrl, setInvoiceUrl] = useState(null);
    const [extraDocs, setExtraDocs] = useState(null);
    const [showButton, setShowButton] = useState(!!catalog);

    const getDocumentUrl = async (endpoint) => {
        const response = await fetch(`${endpoint}?id=${reportHeader.id}`, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            const blob = await response.blob();
            const blobUrl = await URL.createObjectURL(blob);

            return blobUrl;
        } else return null;
    };

    const getExtraDocumentUrl = async (id) => {
        const response = await fetch(`${endpointExtraDoc}?id=${id}`, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            const blob = await response.blob();
            const blobUrl = await URL.createObjectURL(blob);

            return blobUrl;
        } else return null;
    };

    const addExtraDoc = () => {
        setExtraDocs([
            ...extraDocs,
            {
                id: Math.random().toString(10).substr(2, 9),
                name: null
            }
        ])
    }
    const updateExtraDoc = (id, file) => {
        const filteredDocs = extraDocs.filter(d => d.id !== id);
        setExtraDocs([
            ...filteredDocs,
            {
                id: id,
                name: file
            }
        ])
    }

    useEffect(() => {
        if (!reportHeader.doc_catalog_accept) {
            (async () => {
                const url = await getDocumentUrl(endpointCatalogue);

                setCatalogUrl(url);
            })();
        }

        if (!reportHeader.doc_payment_accept) {
            (async () => {
                const url = await getDocumentUrl(endpointPaymentReceipt);

                setInvoiceUrl(url);
            })();
        }

        if (!reportHeader.doc_additional_accept) {
            Request({
                url: `${endpointExtraDoc}/list_info?id=${reportHeader.id}`,
                method: 'GET',
                isMultipart: true
            }, data => {
                Promise.all(data.map(async d => {
                    const url = await getExtraDocumentUrl(d.id);
                    return { id: d.id, name: url }
                })).then(data => setExtraDocs(data));
            }, error => {
                alert('Ошибка при получении дополнительных документов')
            });
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

        if (invoice) {
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

        if (extraDocs.length) {
            extraDocs.forEach(d => {
                if (typeof (d.name) === 'object') {
                    const data = new FormData();
                    data.append('header_id', reportHeader.id);
                    data.append('file', d.name);
                    Request({
                        url: endpointExtraDoc,
                        method: 'POST',
                        data: data,
                        isMultipart: true
                    },
                        data => { },
                        error => {
                            alert('Произошла ошибка при отправке дополнительного документа');
                        });
                }
            })
        }
    };

    return (
        <>
            {reportHeader.doc_catalog_comment &&
                <h4 style={{ maxWidth: '33%', color: 'red' }}>
                    Каталог выставки был отклонён с комментарием: {reportHeader.doc_catalog_comment}
                </h4>
            }
            {reportHeader.doc_payment_comment &&
                <h4 style={{ maxWidth: '33%', color: 'red' }}>
                    Квитанция об оплате была отклонена с комментарием: {reportHeader.doc_payment_comment}
                </h4>
            }
            {reportHeader.doc_additional_comment &&
                <h4 style={{ maxWidth: '33%', color: 'red' }}>
                    Дополнительные документы были отклонены с комментарием: {reportHeader.doc_additional_comment}
                </h4>
            }
            <h4>Прикрепление документов</h4>
            <div className="report-documents">
                <div className="report-documents__document">
                    <label className="report-documents__document-label">Каталог выставки</label>
                    {!reportHeader.doc_catalog_accept ?
                        <>
                            {catalogUrl && <a className="ReportDocumentLink" href={catalogUrl} download="Каталог выставки" rel="noopener noreferrer">Прикрепленный документ</a>}
                            <input type="file" accept=".pdf" style={{ display: 'block', marginTop: '8px' }} onChange={(e) => {
                                setCatalog(e.target.files[0]);
                                setShowButton(true);
                            }} />
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
                            {invoiceUrl && <a className="ReportDocumentLink" href={invoiceUrl} download="Квитанция об оплате взноса за обработку результатов выставки" rel="noopener noreferrer">Прикрепленный документ</a>}
                            <input type="file" accept=".pdf" style={{ display: 'block', marginTop: '8px' }} onChange={(e) => {
                                setInvoice(e.target.files[0]);
                                if (catalogUrl) setShowButton(true);
                            }} />
                        </> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
            </div>
            <h4>Дополнительные документы</h4>
            <div className="report-extra-documents">
                {
                    extraDocs
                        ? extraDocs.map(d => {
                            return <div className="report-extra-documents__document" key={d.id}>
                                <label className="report-extra-documents__document-label">Дополнительный документ</label>
                                {!reportHeader.doc_catalog_accept
                                    ? typeof (d.name) !== 'object'
                                        ? <a className="ReportDocumentLink" href={d.name} download="Дополнительный документ" rel="noopener noreferrer">Прикрепленный документ</a>
                                        : <>
                                            {d.name && <a className="ReportDocumentLink" href={d.name} download="Дополнительный документ" rel="noopener noreferrer">Прикрепленный документ</a>}
                                            <input type="file" accept=".pdf" style={{ display: 'block', marginTop: '8px' }} onChange={(e) => {
                                                updateExtraDoc(d.id, e.target.files[0]);
                                            }} />
                                        </>
                                    : <p>Эти документы уже были принят</p>
                                }
                            </div>
                        })
                        : null
                }
                <button onClick={addExtraDoc}>+ Добавить документ</button>
            </div>
            {showButton && <button onClick={onSubmit}>Отправить</button>}
        </>
    );
};

export default ReportDetailsTable;