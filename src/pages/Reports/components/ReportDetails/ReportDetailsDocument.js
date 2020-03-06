import React, { useEffect, useState } from 'react';
import { endpointCatalogue, endpointPaymentReceipt, endpointExtraDoc } from '../../config';
import { Request, getHeaders } from "utils/request";
import ls from 'local-storage';
import './styles.scss';


const ReportDetailsTable = ({ reportHeader, getHeader }) => {
    const [catalog, setCatalog] = useState(null);
    const [catalogUrl, setCatalogUrl] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceUrl, setInvoiceUrl] = useState(null);
    const [extraDocs, setExtraDocs] = useState(null);
    const [showButton, setShowButton] = useState(!!catalog);
    const [sendDisabled, setSendDisable] = useState(false);

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
        extraDocs && setExtraDocs([
            ...extraDocs,
            {
                id: Math.random().toString(10).substr(2, 9),
                name: null
            }
        ])
    }

    const deleteExtraDoc = (id) => {
        setExtraDocs([
            ...extraDocs.filter(d => d.id !== id)
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
                console.log(error);
            });
        }
    }, []);

    const submitCatalog = () => {
        const catalogData = new FormData();
        catalogData.append('header_id', reportHeader.id);
        catalogData.append('file', catalog);
        Request({
            url: endpointCatalogue,
            method: 'PUT',
            data: catalogData,
            isMultipart: true
        }, data => {
            submitInvoice();
        }, error => {
            setSendDisable(false);
            console.log(error);
            alert('Каталог мероприятия не был отправлен.')
        });
    };

    const submitInvoice = () => {
        const invoiceData = new FormData();
        invoiceData.append('header_id', reportHeader.id);
        invoiceData.append('file', invoice);
        Request({
            url: endpointPaymentReceipt,
            method: 'PUT',
            data: invoiceData,
            isMultipart: true
        }, data => {
            if (extraDocs && extraDocs.length && extraDocs[0].name) {
                submitExtraDocs();
            } else {
                setSendDisable(false);
                alert('Документы отправлены успешно!');
                getHeader();
            }
            setShowButton(false);
        }, error => {
            setSendDisable(false);
            console.log(error);
            alert('Квитанция об оплате не была отправлена.');
        });
    };

    const submitExtraDocs = async () => {
        let count = 0;
        const handleSubmit = async (document) => {
            ++count;
            if (document.name && typeof (document.name) === 'object') {
                const data = new FormData();
                data.append('header_id', reportHeader.id);
                data.append('file', document.name);
                await Request({
                    url: endpointExtraDoc,
                    method: 'POST',
                    data: data,
                    isMultipart: true
                }, () => {
                    if (count === extraDocs.length) {
                        setSendDisable(false);
                        alert('Документы отправлены успешно!');
                        setShowButton(false);
                        getHeader();
                    }
                }, error => {
                    setSendDisable(false);
                    console.log(error);
                    alert('Произошла ошибка при отправке дополнительного документа');
                });
            } else {
                if (count === extraDocs.length) {
                    setSendDisable(false);
                    alert('Документы отправлены успешно!'); // No extraDocs were attached
                    getHeader();
                }
            }
        };
        for (let document of extraDocs) await handleSubmit(document);
    };

    const onSubmit = () => {
        setSendDisable(true);
        if (catalog) {
            submitCatalog();
        } else {
            invoice
                ? submitInvoice()
                : extraDocs.length && extraDocs[0].name && submitExtraDocs();
        }
        // Clear local storage
        ls.remove(`judge_load_report_${reportHeader.id}`);
        ls.remove(`final_report_${reportHeader.id}`);
        ls.remove(`main_ring_statement_${reportHeader.id}`);
    };

    return (
        <>
            {reportHeader.doc_catalog_comment &&
                <h4 style={{ paddingBottom: '20px' }}>
                    Каталог мероприятия был отклонён с комментарием: <br />
                    <span style={{ color: 'red' }}>{reportHeader.doc_catalog_comment}</span>
                </h4>
            }
            {reportHeader.doc_payment_comment &&
                <h4 style={{ paddingBottom: '20px' }}>
                    Квитанция об оплате была отклонена с комментарием: <br />
                    <span style={{ color: 'red' }}>{reportHeader.doc_payment_comment}</span>
                </h4>
            }
            {reportHeader.doc_additional_comment &&
                <h4 style={{ paddingBottom: '20px' }}>
                    Дополнительные документы были отклонены с комментарием: <br />
                    <span style={{ color: 'red' }}>{reportHeader.doc_additional_comment}</span>
                </h4>
            }
            <h4>Прикрепление документов</h4>
            <div className="report-documents">
                <div className="report-documents__document">
                    <label className="report-documents__document-label">Каталог мероприятия</label>
                    {!reportHeader.doc_catalog_accept ?
                        <>
                            {catalogUrl && <a className="ReportDocumentLink" href={catalogUrl} download="Каталог мероприятия" rel="noopener noreferrer">Прикрепленный документ</a>}
                            <input type="file" accept=".pdf" disabled={reportHeader.doc_catalog_is_sent} style={{ display: 'block', marginTop: '8px' }} onChange={(e) => {
                                setCatalog(e.target.files[0]);
                                if (!reportHeader.doc_catalog_is_sent && (invoice || reportHeader.doc_payment_is_sent)) setShowButton(true);
                            }} />
                        </> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
                <div className="report-documents__document">
                    <label className="report-documents__document-label">
                        Квитанция об оплате взноса за обработку результатов мероприятия
                    </label>
                    {!reportHeader.doc_payment_accept ?
                        <>
                            {invoiceUrl && <a className="ReportDocumentLink" href={invoiceUrl} download="Квитанция об оплате взноса за обработку результатов мероприятия" rel="noopener noreferrer">Прикрепленный документ</a>}
                            <input type="file" accept=".pdf" disabled={reportHeader.doc_payment_is_sent} style={{ display: 'block', marginTop: '8px' }} onChange={(e) => {
                                setInvoice(e.target.files[0]);
                                if (!reportHeader.doc_payment_is_sent && (catalog || reportHeader.doc_catalog_is_sent)) setShowButton(true);
                            }} />
                        </> :
                        <p>Этот документ уже был принят</p>
                    }
                </div>
            </div>
            <h4>Дополнительные документы</h4>
            <div className="report-extra-documents">
                {
                    !reportHeader.doc_additional_accept
                        ? <>
                            {extraDocs
                                ? extraDocs.map(d => {
                                    return <div className="report-extra-documents__document" key={d.id}>
                                        <label className="report-extra-documents__document-label">
                                            Дополнительный документ {
                                                d.name === null
                                                    ? <span onClick={() => deleteExtraDoc(d.id)} className="report-extra-documents__document-del">- удалить</span>
                                                    : null
                                            }
                                        </label>
                                        {
                                            typeof (d.name) !== 'object'
                                                ? <a className="ReportDocumentLink" href={d.name} download="Дополнительный документ" rel="noopener noreferrer">Прикрепленный документ</a>
                                                : <>
                                                    {d.name && <a className="ReportDocumentLink" href={d.name} download="Дополнительный документ" rel="noopener noreferrer">Прикрепленный документ</a>}
                                                    <input type="file" disabled={reportHeader.doc_additional_is_sent} accept=".pdf" style={{ display: 'block', marginTop: '8px' }} onChange={(e) => {
                                                        updateExtraDoc(d.id, e.target.files[0]);
                                                        if (reportHeader.doc_catalog_is_sent && reportHeader.doc_payment_is_sent) setShowButton(true);
                                                    }} />
                                                </>
                                        }
                                    </div>
                                })
                                : null
                            }
                            <button onClick={addExtraDoc}>+ Добавить документ</button>
                        </>
                        : <p>Дополнительные документы уже были приняты</p>
                }
            </div>
            {showButton && <button onClick={onSubmit} disabled={sendDisabled}>Отправить</button>}
        </>
    );
};

export default ReportDetailsTable;