import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import Table from "./components/Table";
import Modal from "components/Modal";
import RequestTable from "../RequestRegistry/components/Table";
import { Request } from "utils/request";
import Declarants from "./components/Declarants";
import "./index.scss";

const NurseryDocumentsStatus = ({ history, nurseryAlias, distinction }) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [documents, setDocuments] = useState(null);
    const [innerDocuments, setInnerDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);


    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/NurseryPedigreeRequest/headers_base_info' :
                '/api/requests/NurseryLitterRequest/headers_base_info'
        },
            data => {
                setDocuments(data);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    const rowClick = id => Request({
        url: distinction === 'pedigree' ?
            '/api/requests/NurseryPedigreeRequest/register_of_requests?id=' + id :
            '/api/requests/NurseryLitterRequest/register_of_requests?id=' + id
    },
        data => {
            setInnerDocuments(data);
        },
        error => {
            console.log(error.response);
            setInnerDocuments(null);
        });

    const up = s => s[0] && s[0].toUpperCase() + s.slice(1);
    const deleteRow = (id) => {
        if (window.confirm("Удалить черновик?")) {
            Request({ url: `/api/requests/Nursery${up(distinction)}Request`, data: id, method: 'DELETE' },
                () => {
                    setDocuments(documents.filter(x => x && x.id !== id));
                    window.alert('Заявка удалена')
                },
                e => {
                    window.alert('Отсутствует соединение с сервером');
                    console.log(e)
                }
            )
        }
    };

    return loading ?
        <Loading /> : !standardView ? <Card className="nursery-documents-status__popup">
        <button
            onClick={() => setStandardView(true)}
            className="nursery-documents-status__popup-close"
        >
        </button>
        <div className="nursery-documents-status__disclaimer">Для просмотра вложенных заявок - нажмите на строку таблицы, соответствующую пакету заявок, содержащему интересующую Вас запись</div>
        <Table
            documents={documents}
            distinction={distinction}
            rowClick={rowClick}
            deleteRow={deleteRow}
            setShowModal={setShowModal}
            fullScreen
        />
    </Card> :
        <Card className="nursery-documents-status">
            <div className="nursery-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === 'pedigree'
                    ? 'Оформление родословной'
                    : 'Заявление на регистрацию помета'}
            </div>
            <div className="nursery-documents-status__table">
                {documents && !!documents.length
                    ? <div className="nursery-documents-status__controls-wrap">
                    <div className="nursery-documents-status__controls">
                    {standardView &&
                        <button
                            className="nursery-documents-status__control nursery-documents-status__control--downloadIcon"
                            onClick={() => setExporting(true)}
                            disabled={exporting}
                        >
                            Скачать PDF
                        </button>
                    }
                    <button className="nursery-documents-status__control nursery-documents-status__control--tableIcon" onClick={() => setStandardView(false)}>
                        Открыть на всю ширину окна
                    </button>
                </div>
                        <div className="nursery-documents-status__disclaimer">Для просмотра вложенных заявок - нажмите на строку таблицы, соответствующую пакету заявок, содержащему интересующую Вас запись</div>
                        <Table 
                            documents={documents} 
                            distinction={distinction} 
                            rowClick={rowClick} 
                            deleteRow={deleteRow} 
                            setShowModal={setShowModal}
                            exporting={exporting}
                            setExporting={setExporting}
                        />
                    </div>
                    : <h2>Документов не найдено</h2>
                }
            </div>
            {innerDocuments &&
                <div className="nursery-documents-status__table">
                    {!!innerDocuments.length
                        ? <><h3>Вложенные заявки</h3>
                            <RequestTable
                                documents={innerDocuments}
                                distinction={distinction}
                                height="300px"
                            /></>
                        : <h2>Вложенных заявок не найдено</h2>
                    }
                </div>
            }
            <div className="nursery-documents-status__bottom">
                <p>{distinction === 'litter' ?
                    'В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются: акт вязки, акт обследования помета, копии свидетельств о происхождении производителей, копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно - оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.' :
                    'Метрика щенка не дает право на племенное использование собаки и подлежит обязательному обмену на свидетельство о происхождении (родословную) РКФ до достижения собакой возраста 15 месяцев.'
                }</p>
                <Link
                    to={`/kennel/${nurseryAlias}/documents/${distinction}/form`}
                    className="btn-add"
                    title="Добавить новую заявку"
                >+</Link>
            </div>
            {showModal && <Modal
                showModal={!!showModal}
                handleClose={() => setShowModal(false)}
                noBackdrop={true}
                hideCloseButton={true}
                className="status-table__modal"
            >
                <Declarants id={showModal} />
            </Modal>}
        </Card>
};

export default React.memo(NurseryDocumentsStatus);